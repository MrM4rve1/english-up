import type {Word} from './content.ts';
import type {Profile,Level} from './storage.ts';

/** O(n) merge for large imported dictionaries. Keeps earlier, reviewed cards over raw imports. */
export function mergeUniqueWords(groups:readonly (readonly Word[])[]):Word[]{
 const seen=new Set<string>();const merged:Word[]=[];
 for(const group of groups)for(const word of group){
  const key=normalizeEnglish(word.en);
  if(!key||seen.has(key))continue;
  seen.add(key);merged.push(word);
 }
 return merged;
}

export type VocabMode='cards'|'choice'|'typing'|'listening'|'order'|'sentence'|'context';
export type VocabScope={level:Level|'Все';topic:string};

export function normalizeEnglish(input:string):string{
 return input.normalize('NFKC').replace(/[\u2018\u2019]/g,"'").trim().toLocaleLowerCase('en-US')
  .replace(/\s+/g,' ').replace(/[.!?]+$/g,'').trim();
}
export function acceptableAnswer(input:string,expected:string):boolean{
 const norm=normalizeEnglish(input);
 const value=normalizeEnglish(expected);
 if(!norm||!value)return false;
 return norm===value;
}
export function getVocabulary(words:Word[],scope:VocabScope):Word[]{
 return words.filter(w=>(scope.level==='Все'||w.level===scope.level)&&(scope.topic==='Все'||w.topic===scope.topic));
}
export function getSession(allWords:Word[],profile:Profile,scope:VocabScope,now:number,today:string){
 const scoped=getVocabulary(allWords,scope);
 const introduced=Object.values(profile.reviews).filter(r=>r.first&&localDateKey(r.first)===today).length;
 const due=scoped.filter(w=>profile.reviews[w.id]&&profile.reviews[w.id].due<=now)
  .sort((a,b)=>profile.reviews[a.id].due-profile.reviews[b.id].due);
 const remaining=Math.max(0,profile.dailyWords-introduced);
 const fresh=scoped.filter(w=>!profile.reviews[w.id]).slice(0,remaining);
 return {due,fresh,session:[...due,...fresh],introduced,remaining};
}
export function localDateKey(timestamp:number){
 const d=new Date(timestamp);
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function score(text:string){let h=2166136261;for(const c of text){h=Math.imul(h^c.charCodeAt(0),16777619);}return h>>>0;}
export function choiceOptions(word:Word,allWords:Word[]):string[]{
 const candidates=allWords.filter(w=>w.id!==word.id&&w.ru!==word.ru);
 const candidateOrder=[
  ...candidates.filter(w=>w.level===word.level&&w.topic===word.topic),
  ...candidates.filter(w=>w.level===word.level&&w.topic!==word.topic),
  ...candidates.filter(w=>w.level!==word.level)
 ];
 const seen=new Set<string>([word.ru]);
 const unique=candidateOrder.filter(w=>{if(seen.has(w.ru))return false;seen.add(w.ru);return true;});
 const distractors=unique.slice(0,Math.max(3,Math.min(10,unique.length))).sort((a,b)=>score(word.id+a.id)-score(word.id+b.id)).slice(0,3).map(w=>w.ru);
 const opts=[word.ru,...distractors];
 return opts.sort((a,b)=>score(word.id+'|'+a)-score(word.id+'|'+b));
}
export function sentenceTokens(sentence:string,seed:string):string[]{
 const words=sentence.trim().split(/\s+/).filter(Boolean);
 if(words.length<2)return words;
 const keyed=words.map((token,i)=>({token,i,key:score(seed+'-token-'+i)}))
  .sort((a,b)=>a.key-b.key).map(x=>x.token);
 if(keyed.join(' ')===words.join(' '))keyed.reverse();
 return keyed;
}
export function contextPrompt(word:Word):{masked:string;answer:string}|null{
 if(!word.example||!word.en)return null;
 const escape=(text:string)=>text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const pattern=new RegExp(`(^|[^a-zA-Z])(${escape(word.en)})(?=$|[^a-zA-Z])`,'i');
 if(!pattern.test(word.example))return null;
 return {masked:word.example.replace(pattern,(_m,leading:string)=>leading+'______'),answer:word.en};
}
export function csvEscape(value:string){return /[",\n\r;]/.test(value)?'"'+value.replace(/"/g,'""')+'"':value;}
export const CSV_FIELDS=['en','ru','level','topic','example','translation'] as const;
export function vocabularyToCsv(words:Word[]):string{
 const rows=[CSV_FIELDS.join(';'),...words.map(w=>CSV_FIELDS.map(k=>csvEscape(w[k])).join(';'))];
 return '\ufeff'+rows.join('\r\n');
}
function parseRows(text:string,delimiter:string):string[][]{
 const rows:string[][]=[];let row:string[]=[],value='',quoted=false;
 const clean=text.replace(/^\ufeff/,'');
 for(let i=0;i<clean.length;i++){
  const c=clean[i];
  if(c==='"'&&quoted&&clean[i+1]==='"'){value+='"';i++;}
  else if(c==='"'&&!value){quoted=true;}
  else if(c==='"'&&quoted){quoted=false;}
  else if(c===delimiter&&!quoted){row.push(value);value='';}
  else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&clean[i+1]==='\n')i++;row.push(value);if(row.some(x=>x.trim()))rows.push(row);row=[];value='';}
  else value+=c;
 }
 if(quoted)throw new Error('Незакрытая кавычка в CSV.');
 row.push(value);if(row.some(x=>x.trim()))rows.push(row);
 return rows;
}
export function parseVocabularyCsv(csv:string,existing:Word[]):{added:Word[];skipped:number}{
 if(csv.length>1_500_000)throw new Error('CSV слишком большой (максимум 1,5 МБ).');
 const first=csv.replace(/^\ufeff/,'').split(/\r?\n/,1)[0];
 const rows=parseRows(csv,first.includes(';')?';':',');
 if(!rows.length)throw new Error('Пустой CSV.');
 const columns=rows[0].map(x=>x.trim().toLowerCase());
 const enIndex=columns.indexOf('en'),ruIndex=columns.indexOf('ru');
 if(enIndex<0||ruIndex<0)throw new Error('Нужны колонки en и ru (пример: en;ru;level;topic;example;translation).');
 const find=(row:string[],key:string,defaultValue='')=>{const index=columns.indexOf(key);return index>=0?(row[index]||'').trim():defaultValue;};
 const known=new Set(existing.map(w=>normalizeEnglish(w.en)));
 const added:Word[]=[];let skipped=0;
 for(const row of rows.slice(1)){
  const en=(row[enIndex]||'').trim(),ru=(row[ruIndex]||'').trim();
  if(!en||!ru||en.length>90||ru.length>160||/[<>]/.test(en)){skipped++;continue;}
  const normalized=normalizeEnglish(en);
  if(known.has(normalized)){skipped++;continue;}
  const level=find(row,'level','A2');
  if(!['A1','A2','B1','B2'].includes(level)){skipped++;continue;}
  const topic=find(row,'topic','Мои слова').slice(0,60)||'Мои слова';
  const example=find(row,'example').slice(0,350);
  const translation=find(row,'translation').slice(0,350);
  added.push({id:'custom:'+normalized,en,ru,level:level as Level,topic,example,translation});
  known.add(normalized);
  if(added.length>2000)throw new Error('Можно импортировать не более 2000 слов за один раз.');
 }
 return {added,skipped};
}

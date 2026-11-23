import type {Word} from './content.ts';

/** English Up 10.0 — optional third-party bilingual dictionary adapter.
 * Source: tema4p/english-vocabulary, content/vocabulary/Oxford_5000_English_Vocabulary_RU.txt
 * License: CC BY-NC 4.0. Attribution and conditions are detailed in THIRD_PARTY_VOCABULARY.md.
 * Learner must explicitly download/import; the project does not redistribute that source file.
 */
export const PUBLIC_VOCAB_URL='https://raw.githubusercontent.com/tema4p/english-vocabulary/main/content/vocabulary/Oxford_5000_English_Vocabulary_RU.txt';
export const PUBLIC_VOCAB_LICENSE='CC BY-NC 4.0';

function normalize(value:string){return value.normalize('NFKC').toLocaleLowerCase('en-US').trim().replace(/\s+/g,' ');}
const validEnglish=/^[a-zA-Z][a-zA-Z\s'’.-]{0,69}$/;
/** Frequency bands are a UI grouping only, not certified CEFR levels. */
export function approximateLevel(index:number):Word['level']{
 return index<750?'A1':index<1950?'A2':index<3450?'B1':'B2';
}
export type PublicImportResult={words:Word[];skipped:number;duplicates:number;reviewRequired:number};
export function parsePublicVocabulary(text:string,existing:Word[],max=5500):PublicImportResult{
 if(text.length>1_500_000)throw new Error('Слишком большой словарь (максимум 1,5 МБ).');
 const known=new Set(existing.map(w=>normalize(w.en)));
 const added:Word[]=[];let skipped=0,duplicates=0,reviewRequired=0;
 const rows=text.replace(/^\uFEFF/,'').split(/\r?\n/);
 for(let index=0;index<rows.length;index++){
  const line=rows[index].trim();if(!line)continue;
  const delimiter=line.indexOf(' - ');
  if(delimiter<=0){skipped++;continue;}
  const en=line.slice(0,delimiter).trim();
  const ru=line.slice(delimiter+3).trim();
  if(!validEnglish.test(en)||ru.length<2||ru.length>160||!/[а-яё]/i.test(ru)||/[<>]/.test(ru)||ru==='—'){
   skipped++;continue;
  }
  const normalized=normalize(en);
  if(known.has(normalized)){duplicates++;continue;}
  if(added.length>=max)break;
  // Source translations are not independently proofread; examples are intentionally omitted.
  if(ru.includes(',')||ru.includes(';'))reviewRequired++;
  added.push({id:`public-v10:${normalized}`,en,ru,level:approximateLevel(index),topic:'Большая база · частотный список',example:'',translation:'',source:'external'});
  known.add(normalized);
 }
 return {words:added,skipped,duplicates,reviewRequired};
}
export function countVocabulary(existing:Word[],additional:Word[]):number{
 return new Set([...existing,...additional].map(w=>normalize(w.en))).size;
}

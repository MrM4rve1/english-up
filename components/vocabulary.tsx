'use client';
import {useMemo,useRef,useState} from 'react';
import {Bookmark,Check,CheckCircle2,ChevronRight,Download,FileUp,Headphones,Plus,RotateCcw,Search,Volume2} from 'lucide-react';
import {words,Word} from '../lib/content';
import {dayKey,Profile,Level} from '../lib/storage';
import {sayEnglish} from './grammar';
import {acceptableAnswer,choiceOptions,contextPrompt,getSession,getVocabulary,parseVocabularyCsv,sentenceTokens,localDateKey,VocabMode,vocabularyToCsv,mergeUniqueWords} from '../lib/vocab-tools';
import {parsePublicVocabulary,PUBLIC_VOCAB_URL,countVocabulary} from '../lib/public-vocabulary';
import {usIpa} from '../lib/us-ipa';

type Props={profile:Profile;onChange:(patch:Partial<Profile>)=>void;onGrade:(word:Word,grade:0|1|2|3)=>void};
const modes:{id:VocabMode;label:string;description:string}[]=[
 {id:'cards',label:'Карточки',description:'Сначала вспомни перевод, затем переверни карточку'},
 {id:'choice',label:'Выбор',description:'Выбери правильный перевод'},
 {id:'typing',label:'Написание',description:'Вспомни слово по русскому переводу'},
 {id:'listening',label:'На слух',description:'Прослушай слово и напиши его'},
 {id:'order',label:'Собери фразу',description:'Расставь слова предложения в правильном порядке'},
 {id:'sentence',label:'Переведи фразу',description:'Переведи пример целиком на английский'},
 {id:'context',label:'В контексте',description:'Вставь изучаемое слово в предложение'},
];
export function Vocabulary({profile,onChange,onGrade}:Props){
 const [mode,setMode]=useState<VocabMode>('cards');
 const [level,setLevel]=useState<Level|'Все'>(profile.level);
 const [topic,setTopic]=useState('Все');
 const [now,setNow]=useState(()=>Date.now());
 const [specific,setSpecific]=useState<string|null>(null);
 const [flipped,setFlipped]=useState(false);
 const [answer,setAnswer]=useState('');
 const [selected,setSelected]=useState<string|null>(null);
 const [checked,setChecked]=useState(false);
 const [order,setOrder]=useState<number[]>([]);
 const [search,setSearch]=useState('');
 const [savedOnly,setSavedOnly]=useState(false);
 const [notice,setNotice]=useState('');
 const [externalLoading,setExternalLoading]=useState(false);
 const [externalNotice,setExternalNotice]=useState('');
 const [pageSize,setPageSize]=useState(80);
 const [showAdd,setShowAdd]=useState(false);
 const [ownEn,setOwnEn]=useState('');const [ownRu,setOwnRu]=useState('');
 const [ownExample,setOwnExample]=useState('');const [ownTranslation,setOwnTranslation]=useState('');
 const fileRef=useRef<HTMLInputElement>(null);
 const externalRef=useRef<HTMLInputElement>(null);
 const externalController=useRef<AbortController|null>(null);
 const allWords=useMemo(()=>mergeUniqueWords([words,profile.customWords,profile.externalWords]),[profile.customWords,profile.externalWords]);
 const topics=useMemo(()=>['Все',...new Set(allWords.filter(w=>level==='Все'||w.level===level).map(w=>w.topic))].sort((a,b)=>a==='Все'?-1:b==='Все'?1:a.localeCompare(b,'ru')),[allWords,level]);
 const scope={level,topic};
 const data=useMemo(()=>getSession(allWords,profile,{level,topic},now,dayKey()),[allWords,profile.reviews,profile.dailyWords,level,topic,now]);
 const active=data.session.find(w=>w.id===specific)||allWords.find(w=>w.id===specific)||data.session[0];
 const options=useMemo(()=>active?choiceOptions(active,allWords):[],[active?.id,allWords]);
 const tokenOptions=useMemo(()=>active?.example?sentenceTokens(active.example,active.id):[],[active?.id]);
 const cloze=active?contextPrompt(active):null;
 const result=mode==='choice'?selected===active?.ru:
  mode==='order'?acceptableAnswer(order.map(i=>tokenOptions[i]).join(' '),active?.example||''):
  mode==='sentence'?acceptableAnswer(answer,active?.example||''):
  mode==='context'?acceptableAnswer(answer,active?.en||''):
  acceptableAnswer(answer,active?.en||'');
 const filtered=useMemo(()=>getVocabulary(allWords,scope).filter(w=>(w.en.toLowerCase().includes(search.toLowerCase())||w.ru.toLowerCase().includes(search.toLowerCase()))&&(!savedOnly||profile.savedWords.includes(w.id))),[allWords,level,topic,search,savedOnly,profile.savedWords]);
 const visibleWords=filtered.slice(0,pageSize);
 const introduced=Object.values(profile.reviews).filter(r=>r.first&&localDateKey(r.first)===dayKey()).length;
 const dueTotal=allWords.filter(w=>profile.reviews[w.id]&&profile.reviews[w.id].due<=now).length;
 const dictionary=allWords.filter(w=>profile.savedWords.includes(w.id)||w.id.startsWith('custom:'));
 function resetQuestion(){setFlipped(false);setAnswer('');setSelected(null);setChecked(false);setOrder([]);}
 function switchMode(next:VocabMode){setMode(next);resetQuestion();}
 function studySpecific(id:string){setSpecific(id);resetQuestion();window.scrollTo?.({top:0,behavior:'smooth'});}
 function grade(g:0|1|2|3){if(!active)return;onGrade(active,g);setSpecific(null);resetQuestion();setNow(Date.now());}
 function importPublicText(text:string){
  const existing=[...words,...profile.customWords];
  const imported=parsePublicVocabulary(text,existing);
  if(imported.words.length<1000)throw new Error('В источнике слишком мало подходящих записей. Проверь, что выбран полный словарь на 5 312 строк.');
  onChange({externalWords:imported.words});
  setExternalNotice(`Подключено ${imported.words.length.toLocaleString('ru-RU')} дополнительных слов. В сумме: ${countVocabulary(existing,imported.words).toLocaleString('ru-RU')}. Без примеров из источника: тренируй перевод, написание и произношение.`);
  setSpecific(null);resetQuestion();setNow(Date.now());setPageSize(80);
 }
 async function loadPublicVocabulary(){
  setExternalLoading(true);setExternalNotice('');
  const controller=new AbortController();externalController.current=controller;const timeout=setTimeout(()=>controller.abort(),12000);
  try{
   const response=await fetch(PUBLIC_VOCAB_URL,{signal:controller.signal,cache:'no-store'});
   if(!response.ok)throw new Error(`Ошибка загрузки ${response.status}`);
   const text=await response.text();
   // Give React a frame to paint the status before parsing and updating several thousand cards.
   await new Promise<void>(resolve=>setTimeout(resolve,0));
   importPublicText(text);
  }catch(error){setExternalNotice('Автозагрузка недоступна или слишком медленна. Сайт продолжает работать. Скачай TXT по ссылке ниже и используй «Импорт TXT». '+(error instanceof Error?error.message:''));}
  finally{clearTimeout(timeout);if(externalController.current===controller)externalController.current=null;setExternalLoading(false);}
 }
 async function importPublicFile(file:File|undefined){if(!file)return;try{importPublicText(await file.text());}catch(error){setExternalNotice(error instanceof Error?error.message:'Не удалось прочитать файл.');}finally{if(externalRef.current)externalRef.current.value='';}}
 function toggleSave(word:Word){onChange({savedWords:profile.savedWords.includes(word.id)?profile.savedWords.filter(id=>id!==word.id):[...profile.savedWords,word.id]});}
 function markAnswer(){if(!checked)setChecked(true);}
 function saveCsv(){if(!dictionary.length)return;const file=new Blob([vocabularyToCsv(dictionary)],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(file);const link=document.createElement('a');link.href=url;link.download='english-up-dictionary.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice(`Экспортировано ${dictionary.length} слов.`);}
 async function importCsv(file:File|undefined){if(!file)return;try{
  const text=await file.text();const parsed=parseVocabularyCsv(text,allWords);
  if(!parsed.added.length){setNotice(`Новых слов нет. Пропущено: ${parsed.skipped}.`);return;}
  onChange({customWords:[...profile.customWords,...parsed.added]});setNotice(`Добавлено ${parsed.added.length} слов. Пропущено ${parsed.skipped}.`);
 }catch(e){setNotice(e instanceof Error?e.message:'Ошибка при чтении CSV.');}
 finally{if(fileRef.current)fileRef.current.value='';}}
 function addOwnWord(){
  const en=ownEn.trim(),ru=ownRu.trim(),normalized=en.toLowerCase();
  if(!en||!ru){setNotice('Заполни слово и перевод.');return;}
  if(en.length>90||ru.length>160){setNotice('Слово или перевод слишком длинные.');return;}
  if(allWords.some(w=>w.en.trim().toLowerCase()===normalized)){setNotice('Такое слово уже есть в словаре.');return;}
  const card:Word={id:'custom:'+normalized,en,ru,level:level==='Все'?profile.level:level,topic:'Мои слова',example:ownExample.trim().slice(0,350),translation:ownTranslation.trim().slice(0,350)};
  onChange({customWords:[...profile.customWords,card]});setOwnEn('');setOwnRu('');setOwnExample('');setOwnTranslation('');setShowAdd(false);setNotice('Слово добавлено. Его можно найти в разделе «Мои слова».');
 }
 const activeIpa=active?active.ipa||usIpa(active.en):null;
 const readyToCheck=mode==='choice'?selected!==null:mode==='order'?order.length===tokenOptions.length:!!answer.trim();
 const exampleAvailable=!!active?.example;
 const unavailable=active&&((['sentence','order'].includes(mode)&&(!exampleAvailable||mode==='order'&&tokenOptions.length<2))||(mode==='context'&&!cloze));
 return <div className="space-y-6">
  <div><span className="tag">ЛЕКСИКА · УМНЫЕ ПОВТОРЕНИЯ</span><h1 className="text-3xl md:text-4xl font-extrabold mt-3">Словарь и тренировки</h1><p className="muted mt-2 max-w-3xl">Словарь с примерами, устойчивыми выражениями для жизни и работы, американской фонетической подсказкой и интервальными повторениями. Выбирай уровень и тему, изучай новые слова по дневной цели.</p></div>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{[
   [allWords.length,'Слов и выражений'],
   [Object.keys(profile.reviews).length,'Начато изучение'],
   [dueTotal,'На повторение'],
   [Math.min(introduced,profile.dailyWords)+' / '+profile.dailyWords,'Новых за день']
  ].map(([value,title])=><div key={title} className="panel p-4"><p className="text-2xl font-black">{value}</p><p className="muted text-xs mt-2">{title}</p></div>)}</div>
  <section className="panel p-5 md:p-6 space-y-4">
   <h2 className="font-extrabold text-lg">Выбери уровень и тему</h2>
   <div className="flex gap-2 flex-wrap">{(['Все','A1','A2','B1','B2'] as const).map(l=><button key={l} onClick={()=>{setLevel(l);setTopic('Все');setSpecific(null);resetQuestion();}} className={level===l?'btn text-sm':'btn-soft text-sm'}>{l}</button>)}</div>
   <label className="block"><span className="text-sm font-semibold block mb-2">Тематика</span><select value={topic} className="field w-full max-w-md" onChange={e=>{setTopic(e.target.value);setSpecific(null);resetQuestion();}}>{topics.map(t=><option key={t}>{t}</option>)}</select></label>
   <p className="muted text-sm">В выбранной подборке: {getVocabulary(allWords,scope).length} · повторений сейчас: {data.due.length} · новых доступно: {data.fresh.length}. Повторения имеют приоритет над новыми словами.</p>
  </section>
  <section className="panel p-5 md:p-6 space-y-4">
   <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-extrabold text-lg">Большая база: дополнительно около 5 000 слов</h2><p className="muted mt-1 text-sm max-w-2xl">Лицензированный открытый частотный список с русскими переводами. Загрузить его можно только по твоему желанию; файл сохраняется локально в этом браузере, аккаунт не нужен.</p></div><span className="tag">{profile.externalWords.length?'Подключено '+profile.externalWords.length.toLocaleString('ru-RU'):'Не подключено'}</span></div>
   <div className="flex flex-wrap gap-2"><button className="btn" disabled={externalLoading} onClick={()=>void loadPublicVocabulary()}>{externalLoading?'Загружаю (до 12 секунд)…':'Подключить большую базу'}</button>{externalLoading&&<button className="btn-soft" onClick={()=>externalController.current?.abort()}>Отменить загрузку</button>}<button className="btn-soft" onClick={()=>externalRef.current?.click()}><FileUp size={16}/> Импорт TXT</button><a className="btn-soft" href={PUBLIC_VOCAB_URL} target="_blank" rel="noopener noreferrer">Скачать TXT вручную</a><input type="file" ref={externalRef} className="hidden" accept=".txt,text/plain" onChange={e=>void importPublicFile(e.target.files?.[0])}/>{profile.externalWords.length>0&&<button className="btn-soft" onClick={()=>{if(window.confirm('Удалить только дополнительный публичный словарь? Твои оценки изученных слов останутся в прогрессе.')){onChange({externalWords:[]});setSpecific(null);resetQuestion();setExternalNotice('Дополнительный словарь отключён. Личный прогресс не удалён.');}}}>Отключить базу</button>}</div>
   <p className="muted text-xs leading-5">Источник: <a href="https://github.com/tema4p/english-vocabulary" target="_blank" rel="noopener noreferrer" className="underline">tema4p / english-vocabulary</a>, лицензия CC BY-NC 4.0 (только некоммерческое использование). Переводы получены из стороннего списка и могут быть неточными; распределение по A1–B2 приблизительное. У дополнительных карточек нет вымышленных примеров — доступна практика слова и произношения.</p>
   {externalLoading&&<p role="status" className="text-sm text-indigo-700 dark:text-indigo-200">Запрашиваю внешний словарь. Если источник не ответит за 12 секунд, появится предложение импортировать TXT вручную. Остальные уроки доступны.</p>}{externalNotice&&<p role="status" className="rounded-xl p-3 bg-indigo-50 dark:bg-slate-700 text-sm">{externalNotice}</p>}
  </section>
  <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-5 items-start">
   <section className="panel p-5 md:p-7 space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-extrabold text-xl">Тренировка</h2><span className="tag">{specific?'Выбранное слово':data.due.length+' повторить · '+data.fresh.length+' новых'}</span></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{modes.map(item=><button key={item.id} className={mode===item.id?'btn text-xs':'btn-soft text-xs'} onClick={()=>switchMode(item.id)} aria-pressed={mode===item.id}>{item.label}</button>)}</div>
    <p className="muted text-sm">{modes.find(x=>x.id===mode)?.description}</p>
    {active?<>
     {unavailable?<div className="rounded-2xl border border-amber-200 dark:border-amber-800 p-6 space-y-4"><p className="font-bold">Для этого слова пока нет подходящего примера.</p><p className="muted text-sm">Переключись на карточку, ввод или аудирование — в этих режимах слово доступно.</p><button className="btn" onClick={()=>switchMode('cards')}>Перейти к карточке</button></div>:<>
     {mode==='cards'&&<><button className="w-full min-h-[240px] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white text-center flex flex-col items-center justify-center" onClick={()=>setFlipped(!flipped)}><span className="text-indigo-100 text-xs uppercase font-bold tracking-wider">{flipped?'ПЕРЕВОД И ПРИМЕР':'НАЖМИ, ЧТОБЫ УВИДЕТЬ ПЕРЕВОД'}</span><span className="text-3xl md:text-4xl font-black mt-5 break-words">{flipped?active.ru:active.en}</span><span className="text-sm text-indigo-50 mt-5 max-w-md">{flipped?(active.translation||'Перевод примера не указан'):(active.example||'Пример для этого слова пока не добавлен')}</span></button>{activeIpa&&<p className="text-center muted text-sm">Американское произношение (прибл.): /{activeIpa}/</p>}{active.pos&&<p className="muted text-xs text-center">{active.pos}</p>}{active.tip&&<p className="muted text-sm text-center">Подсказка: {active.tip}</p>}<button className="btn-soft w-full" onClick={()=>sayEnglish(active.en)}><Volume2 size={17}/> Слушать слово</button>{flipped?<><p className="muted text-sm text-center">Насколько легко было вспомнить?</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{(['Снова','Трудно','Хорошо','Легко'] as const).map((label,i)=><button key={label} className="btn-soft text-sm" onClick={()=>grade(i as 0|1|2|3)}>{label}</button>)}</div></>:<p className="muted text-xs text-center">Оценка станет доступна после переворота карточки.</p>}</>}
     {mode==='choice'&&<><div className="bg-indigo-50 dark:bg-slate-700 rounded-2xl text-center p-6"><p className="muted text-sm">Выбери перевод</p><p className="font-black text-3xl mt-3">{active.en}</p><button className="btn-soft mt-3" onClick={()=>sayEnglish(active.en)}><Volume2 size={16}/> Слушать</button></div><div className="grid gap-2">{options.map((opt,i)=><button key={i} disabled={checked} className={`study-option ${checked&&opt===active.ru?'correct':checked&&selected===opt?'wrong':''}`} onClick={()=>{setSelected(opt);setChecked(true);}}>{opt}</button>)}</div></>}
     {mode==='typing'&&<div className="rounded-2xl bg-indigo-50 dark:bg-slate-700 p-6 text-center"><p className="muted text-sm">Напиши английское слово</p><h3 className="text-2xl font-black mt-2">{active.ru}</h3></div>}
     {mode==='listening'&&<div className="rounded-2xl bg-indigo-50 dark:bg-slate-700 p-8 text-center space-y-3"><Headphones className="mx-auto text-indigo-500" size={36}/><p className="muted text-sm">Слушай и запиши слово. Текст не показываем до проверки.</p><button className="btn" onClick={()=>sayEnglish(active.en,0.84)}><Volume2 size={18}/> Прослушать ещё раз</button></div>}
     {mode==='context'&&cloze&&<div className="rounded-2xl bg-indigo-50 dark:bg-slate-700 p-6"><p className="muted text-sm mb-3">Заполни пропуск</p><p className="text-xl font-bold">{cloze.masked}</p><p className="muted text-sm mt-3">{active.translation}</p></div>}
     {mode==='sentence'&&<div className="rounded-2xl bg-indigo-50 dark:bg-slate-700 p-6"><p className="muted text-sm mb-3">Переведи пример на английский</p><p className="text-xl font-bold">{active.translation}</p><p className="muted text-xs mt-3">Проверяется одна заданная формулировка; правильные перефразирования могут быть не распознаны.</p></div>}
     {mode==='order'&&<div className="space-y-4"><p className="font-bold">Собери предложение: <span className="muted">{active.translation}</span></p><div className="min-h-14 rounded-xl p-3 border border-indigo-200 dark:border-slate-600 flex flex-wrap gap-2">{order.length?order.map((i,index)=><button key={i} disabled={checked} className="a1-token-selected" onClick={()=>setOrder(old=>old.filter((_,n)=>n!==index))}>{tokenOptions[i]}</button>):<p className="muted text-sm">Выбирай слова по порядку ниже</p>}</div><div className="flex flex-wrap gap-2">{tokenOptions.map((token,i)=><button key={i} disabled={checked||order.includes(i)} className="a1-token" onClick={()=>setOrder(old=>[...old,i])}>{token}</button>)}</div><button className="btn-soft" disabled={checked||!order.length} onClick={()=>setOrder([])}><RotateCcw size={15}/> Очистить</button></div>}
     {mode!=='cards'&&mode!=='choice'&&mode!=='order'&&<form className="space-y-3" onSubmit={e=>{e.preventDefault();if(readyToCheck)markAnswer();}}><input className="field w-full" autoComplete="off" aria-label="Напиши свой ответ на английском" value={answer} onChange={e=>setAnswer(e.target.value)} disabled={checked} placeholder={mode==='sentence'?'Напиши предложение целиком':'Ответ на английском'}/><button className="btn w-full" disabled={!readyToCheck||checked}>Проверить</button></form>}
     {mode==='order'&&!checked&&<button className="btn w-full" disabled={!readyToCheck} onClick={markAnswer}>Проверить порядок слов</button>}
     {mode!=='cards'&&checked&&<div className={`rounded-xl p-4 ${result?'bg-emerald-50 dark:bg-emerald-950/40':'bg-rose-50 dark:bg-rose-950/40'}`} role="status"><p className="font-extrabold">{result?'✓ Верно!':'✗ Не совпадает с образцом.'}</p><p className="mt-2 font-semibold">Ответ: {mode==='order'||mode==='sentence'?active.example:mode==='choice'?active.ru:active.en}</p>{active.example&&<p className="mt-2 text-sm">{active.example} — {active.translation}</p>}<p className="text-sm mt-2">{result?'Засчитываем повторение.':'Повтори карточку и попробуй ещё раз, когда слово вернётся на повторение.'}</p><button className="btn mt-4 w-full" onClick={()=>grade(result?2:0)}>Следующее слово <ChevronRight size={17}/></button></div>}
     </>}
     <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-3"><span className="text-sm"><span className="tag">{active.level}</span><span className="muted ml-2">{active.topic}</span>{activeIpa&&<span className="muted ml-2 text-xs">/{activeIpa}/</span>}</span><button className="text-indigo-600 dark:text-indigo-300 font-bold text-sm inline-flex items-center gap-1" onClick={()=>toggleSave(active)}><Bookmark size={17} fill={profile.savedWords.includes(active.id)?'currentColor':'none'}/>{profile.savedWords.includes(active.id)?'В словаре':'Сохранить'}</button></div>
    </>:<div className="text-center py-12"><CheckCircle2 className="mx-auto text-emerald-500" size={48}/><h3 className="font-extrabold text-xl mt-4">На сегодня готово!</h3><p className="muted mt-2">В этой подборке больше нет доступных слов. Попробуй другую тему или повтори завтра.</p><button className="btn-soft mt-5" onClick={()=>setNow(Date.now())}><RotateCcw size={16}/> Обновить</button></div>}
   </section>
   <section className="panel p-5 md:p-6 space-y-4">
    <h2 className="text-xl font-extrabold">Личный словарь</h2>
    <p className="muted text-sm">Слова из учебной базы и добавленные тобой. В избранных: {profile.savedWords.length}, своих: {profile.customWords.length}.</p>
    <div className="flex gap-2 flex-wrap"><button className="btn-soft text-sm" onClick={()=>setShowAdd(!showAdd)}><Plus size={16}/> Добавить слово</button><button className="btn-soft text-sm" onClick={()=>fileRef.current?.click()}><FileUp size={16}/> Импорт CSV</button><button className="btn-soft text-sm" disabled={!dictionary.length} onClick={saveCsv}><Download size={16}/> Экспорт CSV</button><input ref={fileRef} className="hidden" type="file" accept=".csv,text/csv,text/plain" onChange={e=>void importCsv(e.target.files?.[0])}/></div>
    {showAdd&&<div className="border border-slate-200 dark:border-slate-600 rounded-xl p-4 space-y-3"><h3 className="font-bold">Новое слово или выражение</h3><input className="field w-full" value={ownEn} onChange={e=>setOwnEn(e.target.value)} placeholder="English *"/><input className="field w-full" value={ownRu} onChange={e=>setOwnRu(e.target.value)} placeholder="Перевод *"/><input className="field w-full" value={ownExample} onChange={e=>setOwnExample(e.target.value)} placeholder="Пример на английском (необязательно)"/><input className="field w-full" value={ownTranslation} onChange={e=>setOwnTranslation(e.target.value)} placeholder="Перевод примера (необязательно)"/><button className="btn w-full" onClick={addOwnWord}><Plus size={16}/> Добавить</button></div>}
    {notice&&<p role="status" className="rounded-xl bg-indigo-50 dark:bg-slate-700 p-3 text-sm">{notice}</p>}
    <div className="flex gap-2"><label className="relative flex-1"><Search size={17} className="absolute top-3 left-3 text-slate-400"/><input className="field pl-9 w-full" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Найти…" aria-label="Поиск слова"/></label></div>
    <label className="inline-flex gap-2 items-center text-sm font-semibold"><input type="checkbox" checked={savedOnly} onChange={e=>setSavedOnly(e.target.checked)}/> Только избранные</label>
    <p className="muted text-xs">Показано {filtered.length} слов. Нажми на слово для индивидуальной тренировки.</p>
    <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[460px] overflow-auto">{filtered.length?visibleWords.map(w=><div className="flex gap-2 items-center py-3" key={w.id}><button onClick={()=>sayEnglish(w.en)} className="text-indigo-600 dark:text-indigo-300 p-2" aria-label={'Произнести '+w.en}><Volume2 size={16}/></button><button onClick={()=>studySpecific(w.id)} className="flex-1 min-w-0 text-left"><span className="font-bold block break-words">{active?.id===w.id&&mode!=='cards'&&!checked?'Слово скрыто до проверки':w.en}</span><span className="muted text-xs mt-1 block">{active?.id===w.id&&mode!=='cards'&&!checked?'Сейчас в тренировке':w.ru+' · '+w.level}</span></button><button title="Сохранить слово" className="p-2 text-indigo-500" aria-label={'Сохранить '+w.en} onClick={()=>toggleSave(w)}><Bookmark size={17} fill={profile.savedWords.includes(w.id)?'currentColor':'none'}/></button>{profile.reviews[w.id]&&<Check size={16} className="text-emerald-500"/>}</div>):<p className="muted text-sm py-8">Слова не найдены.</p>}</div>{filtered.length>pageSize&&<button className="btn-soft w-full" onClick={()=>setPageSize(n=>n+80)}>Показать ещё 80 · осталось {filtered.length-pageSize}</button>}
   </section>
  </div>
 </div>;
}

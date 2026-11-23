'use client';
import {useEffect,useState} from 'react';
import type {Level} from '../lib/storage';
import {ArrowLeft,ArrowRight,CheckCircle2,RotateCcw,Volume2} from 'lucide-react';
import {assess,assessmentRate,b2ExamItems,placementItems,type AssessmentItem,type AssessmentKind,type AssessmentResult} from '../lib/assessments';

const kindLabels:Record<AssessmentKind,string>={grammar:'Грамматика',vocabulary:'Словарь',reading:'Чтение',listening:'Аудирование'};
type Mode='placement'|'b2';
export function AssessmentCenter({results,onResult,onOpenDialogue,onChooseLevel}:{results:Record<string,AssessmentResult>;onResult:(x:AssessmentResult)=>void;onOpenDialogue:()=>void;onChooseLevel:(l:Level)=>void}){
 const [mode,setMode]=useState<Mode>('placement');
 const [active,setActive]=useState(false);
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [revealed,setRevealed]=useState(false);
 const [transcript,setTranscript]=useState(false);
 const [usedTranscript,setUsedTranscript]=useState(false);
 const [audioError,setAudioError]=useState('');
 const items=mode==='placement'?placementItems:b2ExamItems;
 const done=active&&index===items.length;
 const current=items[index];
 const existing=results[mode];
 useEffect(()=>()=>{if(typeof window!=='undefined'&&'speechSynthesis' in window)window.speechSynthesis.cancel();},[]);
 function start(nextMode:Mode){setMode(nextMode);setActive(true);setIndex(0);setAnswers({});setRevealed(false);setTranscript(false);setUsedTranscript(false);setAudioError('');}
 function playAudio(question:AssessmentItem){
  if(!question.audio)return;
  if(!('speechSynthesis' in window)){setAudioError('Браузер не поддерживает озвучивание. Можно открыть транскрипцию, но тогда результат аудирования будет помечен как непроверенный.');return;}
  try{window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(question.audio);utterance.lang='en-US';utterance.rate=.87;const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='en-us');if(voice)utterance.voice=voice;utterance.onerror=()=>setAudioError('Озвучивание не получилось. Попробуй открыть транскрипцию.');window.speechSynthesis.speak(utterance);}catch{setAudioError('Озвучивание недоступно. Можно открыть транскрипцию.');}
 }
 function choose(choice:number){if(revealed)return;setAnswers(p=>({...p,[current.id]:choice}));setRevealed(true);}
 function next(){if(index+1===items.length){const result=assess(mode,items,answers,usedTranscript);onResult(result);setIndex(items.length);}else{setIndex(p=>p+1);setRevealed(false);setTranscript(false);setAudioError('');}}
 function back(){setActive(false);setRevealed(false);setTranscript(false);setAudioError('');if('speechSynthesis' in window)window.speechSynthesis.cancel();}
 function ResultView({r}:{r:AssessmentResult}){return <div className="space-y-4">
  <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-indigo-50 dark:bg-[#283755] p-4"><p className="text-3xl font-black">{assessmentRate({correct:r.correct,total:r.total})}%</p><p className="muted text-sm">Общий результат: {r.correct} из {r.total}</p></div><div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4"><p className="text-3xl font-black">{r.id==='placement'?r.estimatedLevel:'B2'}</p><p className="muted text-sm">{r.id==='placement'?'Предварительный уровень':'Уровень заданий, не подтверждение владения B2'}</p></div></div>
  <div className="grid sm:grid-cols-2 gap-3">{Object.entries(r.byKind).map(([key,score])=><div key={key} className="level-panel p-4"><b>{kindLabels[key as AssessmentKind]}</b><span className="float-right font-black">{assessmentRate(score)}%</span><div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 mt-3"><div className="h-2 rounded-full bg-indigo-500" style={{width:`${assessmentRate(score)}%`}}/></div></div>)}</div>
  {r.id==='placement'&&r.estimatedLevel&&<button className="btn-soft" onClick={()=>onChooseLevel(r.estimatedLevel!)}>Выбрать {r.estimatedLevel} для занятий (можно изменить позже)</button>}
  {r.transcriptOpened&&<p className="text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100 p-3">Ты открывал транскрипцию: результат Listening измеряет понимание текста, а не чистое восприятие на слух.</p>}
  <p className="muted text-sm">Этот тест — только внутреннее учебное оценивание. Он не является официальным сертификатом CEFR, а результаты не подтверждают навыки письменной и устной речи.</p>
  {r.id==='b2'&&<div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-4"><p className="font-bold">Для полноценной оценки B2 нужна также устная речь и другие навыки.</p><p className="muted text-sm mt-1">Это пробная проверка отдельных навыков, а не сертификат.</p></div>}
 </div>;}
 return <div className="space-y-6">
  <div><span className="tag">ENGLISH UP · SELF-ASSESSMENT</span><h1 className="text-3xl md:text-4xl font-black mt-3">Проверь свой английский</h1><p className="muted mt-2">Диагностика A1–B2 и пробный B2. Проверка по реальным ответам, без искусственного присвоения сертификата.</p></div>
  <div className="grid md:grid-cols-2 gap-3">{(['placement','b2'] as Mode[]).map(m=><button key={m} onClick={()=>{setMode(m);setActive(false);}} className={`level-panel p-5 text-left ${mode===m?'ring-2 ring-indigo-400':''}`}><b className="text-lg">{m==='placement'?'Начальная диагностика A1–B2':'Пробный экзамен B2'}</b><p className="muted text-sm mt-2">{m==='placement'?'48 вопросов по уровням и навыкам':'24 вопроса: Grammar, Vocabulary, Reading, Listening'}</p><p className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-300">{results[m]?`Последний результат: ${results[m].correct}/${results[m].total}`:'Результат пока не сохранён'}</p></button>)}</div>
  {!active?<section className="panel p-6 space-y-4"><h2 className="font-black text-xl">{mode==='placement'?'Входное тестирование':'Пробный экзамен B2'}</h2><p className="muted">Отвечай без переводчика. В аудировании слушай английскую речь через браузер; если голос не работает, можно открыть транскрипцию с пометкой в отчёте. Повторное прохождение разрешено.</p>{existing&&<ResultView r={existing}/>}<button className="btn" onClick={()=>start(mode)}>{existing?'Пройти заново':'Начать тест'} <ArrowRight size={18}/></button></section>:done?<section className="panel p-6 space-y-5"><div className="flex items-center gap-2 text-emerald-600 font-bold"><CheckCircle2/> Тест завершён, результат сохранён</div>{existing&&<ResultView r={existing}/>}<div className="flex flex-wrap gap-2"><button className="btn" onClick={back}><ArrowLeft size={16}/> К выбору теста</button><button className="btn-soft" onClick={()=>start(mode)}><RotateCcw size={16}/> Повторить</button></div></section>:<section className="panel p-5 md:p-7 space-y-5">
    <div className="flex justify-between text-sm font-bold"><span>{kindLabels[current.kind]} · {current.level}</span><span>{index+1} / {items.length}</span></div>
    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full transition-all" style={{width:`${(index+1)/items.length*100}%`}}/></div>
    {current.passage&&<div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-5 leading-7 whitespace-pre-line">{current.passage}</div>}
    {current.audio&&<div className="rounded-xl border border-indigo-200 dark:border-indigo-900 p-4 space-y-2"><button className="btn-soft" onClick={()=>playAudio(current)}><Volume2 size={18}/> Прослушать диалог (US)</button><p className="muted text-xs">Браузерный голос, не профессиональная аудиозапись</p>{audioError&&<p className="text-amber-600 dark:text-amber-300 text-sm">{audioError}</p>}<button className="underline text-xs text-indigo-700 dark:text-indigo-300" onClick={()=>{setTranscript(p=>!p);setUsedTranscript(true);}}>{transcript?'Скрыть':'Открыть'} транскрипцию</button>{transcript&&<p className="text-sm leading-6">{current.audio}</p>}</div>}
    <h2 className="text-xl font-extrabold">{current.prompt}</h2>
    <div className="grid gap-3">{current.choices.map((choice,i)=><button disabled={revealed} key={`${current.id}-${i}`} onClick={()=>choose(i)} className={`study-option ${revealed&&i===current.answer?'correct':revealed&&answers[current.id]===i?'wrong':''}`}><span className="font-bold text-indigo-600 dark:text-indigo-300 mr-3">{String.fromCharCode(65+i)}.</span>{choice}</button>)}</div>
    {revealed&&<div aria-live="polite" className={`rounded-xl p-4 ${answers[current.id]===current.answer?'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100':'bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100'}`}><b>{answers[current.id]===current.answer?'Верно!':'Не совсем.'}</b> {current.explanation}<p className="mt-2 text-sm">Правильный ответ: <b>{current.choices[current.answer]}</b>.</p></div>}
    <div className="flex gap-2 justify-between"><button className="btn-soft" onClick={back}><ArrowLeft size={16}/> Выйти</button><button className="btn" disabled={!revealed} onClick={next}>{index===items.length-1?'Завершить тест':'Следующий вопрос'} <ArrowRight size={16}/></button></div>
   </section>}
  {mode==='b2'&&<section className="panel p-6 space-y-3"><h2 className="font-black text-xl">Разговорная практика после теста</h2><p className="muted text-sm">Для тренировки устной речи открой бесплатные диалоги. Сайт проверяет выбранные реплики, но не выдаёт профессиональную оценку произношения или официальный B2.</p><button className="btn-soft" onClick={onOpenDialogue}>Открыть тренировку диалогов <ArrowRight size={17}/></button></section>}
 </div>;
}

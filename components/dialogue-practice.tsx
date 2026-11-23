'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,CheckCircle2,Headphones,Mic,RotateCcw,Volume2} from 'lucide-react';
import {dialogues,dialoguePassed,dialogueScore,type Dialogue} from '../lib/dialogues';
import type {Level,SkillResult} from '../lib/storage';
import {sayEnglish} from './grammar';

type Launch={token:number;kind:'america'|'work';level:Level;title:string};
type Recognizer={lang:string;onresult:((e:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void)|null;onerror:((e:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;stop:()=>void};
type SpeechWindow=Window&{SpeechRecognition?:new()=>Recognizer;webkitSpeechRecognition?:new()=>Recognizer};
const levels:Level[]=['A1','A2','B1','B2'];
export function DialoguePractice({level,results,onComplete,launch}:{level:Level;results:Record<string,SkillResult>;onComplete:(id:string,score:number,total:number)=>void;launch:Launch|null}){
 const [kind,setKind]=useState<'all'|'america'|'work'>('all');
 const [selectedLevel,setSelectedLevel]=useState<Level|'all'>(level);
 const [current,setCurrent]=useState<Dialogue|null>(null);
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<number[]>([]);
 const [choice,setChoice]=useState<number|null>(null);
 const [finished,setFinished]=useState(false);
 const [spoken,setSpoken]=useState('');
 const [micError,setMicError]=useState('');
 const speech=useRef<Recognizer|null>(null);
 useEffect(()=>{
  if(!launch)return;
  const match=dialogues.find(d=>d.kind===launch.kind&&d.level===launch.level)||dialogues.find(d=>d.kind===launch.kind)||null;
  setKind(launch.kind);setSelectedLevel(launch.level);if(match)begin(match);
 },[launch?.token]);
 useEffect(()=>()=>{speech.current?.stop();if(typeof window!=='undefined'&&'speechSynthesis'in window)window.speechSynthesis.cancel();},[]);
 function begin(d:Dialogue){setCurrent(d);setIndex(0);setAnswers([]);setChoice(null);setFinished(false);setSpoken('');setMicError('');}
 function next(){if(!current||choice===null)return;
  const updated=[...answers,choice];setAnswers(updated);setChoice(null);setSpoken('');
  if(index+1===current.steps.length){setFinished(true);onComplete('dialogue:'+current.id,dialogueScore(current,updated),current.steps.length);}else setIndex(v=>v+1);
 }
 function speakChoice(){if(!current||choice===null)return;
  const Speech=(window as SpeechWindow).SpeechRecognition||(window as SpeechWindow).webkitSpeechRecognition;
  if(!Speech){setMicError('В этом браузере распознавание не поддерживается. Просто произнеси ответ вслух.');return;}
  try{const rec=new Speech();speech.current=rec;rec.lang='en-US';rec.onresult=e=>setSpoken(e.results[0]?.[0]?.transcript||'');rec.onerror=e=>setMicError('Не получилось распознать речь: '+e.error);rec.onend=()=>{};rec.start();setMicError('');}catch{setMicError('Микрофон недоступен. Проверь разрешение сайта в браузере.');}
 }
 const visible=dialogues.filter(d=>(kind==='all'||kind===d.kind)&&(selectedLevel==='all'||selectedLevel===d.level));
 const score=current?dialogueScore(current,answers):0;
 return <div className="space-y-6">
  <div><span className="tag">БЕСПЛАТНО · БЕЗ API</span><h1 className="text-3xl md:text-4xl font-extrabold mt-3">Диалоги и разговоры</h1><p className="muted mt-3 leading-7">Тренажёр с заранее подготовленными ситуациями: выбирай, что сказать, узнавай, почему ответ подходит, и произноси фразы вслух. <b>Это не ИИ</b> и не автоматическая оценка акцента.</p></div>
  {current?<>
   <button className="btn-soft" onClick={()=>{speech.current?.stop();setCurrent(null);}}><ArrowLeft size={16}/> Все диалоги</button>
   <section className="panel p-5 md:p-8 space-y-5">
    <div className="flex flex-wrap items-center gap-2"><span className="tag">{current.level}</span><span className="muted text-sm">{current.kind==='america'?'Жизнь в США':'Работа и поддержка'}</span></div>
    <h2 className="text-2xl font-black">{current.title}</h2><p className="muted">{current.goal}</p>
    {finished?<div className="space-y-4"><CheckCircle2 className="text-emerald-500" size={34}/><h3 className="text-xl font-extrabold">Диалог завершён</h3><p role="status" className="font-bold">{score} из {current.steps.length} правильных ответов с первой попытки.</p><p className="muted">{dialoguePassed(score,current.steps.length)?'Тренировка пройдена.':'Повтори сложные фразы и попробуй ещё раз.'} Это не оценка CEFR.</p><div className="flex flex-wrap gap-2"><button className="btn" onClick={()=>begin(current)}><RotateCcw size={17}/> Пройти заново</button><button className="btn-soft" onClick={()=>setCurrent(null)}>Другие диалоги</button></div></div>:
    <><div className="flex items-center justify-between"><b>Реплика {index+1} из {current.steps.length}</b><span className="tag">{Math.round(index/current.steps.length*100)}%</span></div>
    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-indigo-500" style={{width:`${index/current.steps.length*100}%`}}/></div>
    {answers.map((answer,i)=><div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 opacity-85"><p className="muted text-xs font-bold mb-2">Собеседник: {current.steps[i].partner}</p><p lang="en" className="font-semibold">Ты: {current.steps[i].choices[answer].en}</p></div>)}
    <div className="rounded-xl bg-indigo-50 dark:bg-[#28385a] border border-indigo-200 dark:border-indigo-700 p-4"><p className="text-xs font-bold text-indigo-700 dark:text-indigo-200">Собеседник</p><p className="font-bold text-lg leading-7 mt-2" lang="en">{current.steps[index].partner}</p><div className="flex flex-wrap gap-2 mt-3"><button className="btn-soft" onClick={()=>sayEnglish(current.steps[index].partner)}><Volume2 size={16}/> Послушать</button><details className="text-sm"><summary className="cursor-pointer font-semibold p-2">Перевод</summary><p className="muted mt-2">{current.steps[index].ru}</p></details></div></div>
    <div className="space-y-2"><b>Как лучше ответить?</b>{current.steps[index].choices.map((c,i)=>{const answered=choice!==null,correct=i===current.steps[index].answer;return <button key={i} disabled={answered} onClick={()=>setChoice(i)} aria-pressed={choice===i} className={`study-option w-full text-left ${answered&&correct?'correct':choice===i?'wrong':''}`} lang="en">{c.en}</button>})}</div>
    {choice!==null&&<div role="status" className="rounded-xl border border-indigo-200 dark:border-indigo-700 p-4 space-y-3"><p className="font-bold">{choice===current.steps[index].answer?'✓ Подходит!':'Не совсем. Посмотри правильный ответ:'}</p><p className="text-sm leading-6">{current.steps[index].choices[choice].reason}</p>{choice!==current.steps[index].answer&&<p className="font-semibold" lang="en">{current.steps[index].choices[current.steps[index].answer].en}</p>}<div className="flex flex-wrap gap-2"><button className="btn-soft" onClick={()=>sayEnglish(current.steps[index].choices[current.steps[index].answer].en)}><Headphones size={16}/> Послушать ответ</button><button className="btn-soft" onClick={speakChoice}><Mic size={16}/> Произнести вслух</button></div>{spoken&&<p className="text-sm">Браузер распознал: <b lang="en">{spoken}</b>. Сравни с образцом самостоятельно.</p>}{micError&&<p className="text-sm muted">{micError}</p>}<button className="btn" onClick={next}>{index+1===current.steps.length?'Завершить диалог':'Следующая реплика'} <ArrowRight size={16}/></button></div>}
    </>}
   </section>
  </>:<>
   <div className="flex flex-wrap gap-2"><span className="text-sm muted self-center">Ситуация:</span>{(['all','america','work'] as const).map(k=><button key={k} className={`btn-soft ${kind===k?'a1-selected':''}`} onClick={()=>setKind(k)}>{k==='all'?'Все':k==='america'?'Повседневная жизнь':'Работа'}</button>)}</div>
   <div className="flex flex-wrap gap-2"><span className="text-sm muted self-center">Уровень:</span><button className={`btn-soft ${selectedLevel==='all'?'a1-selected':''}`} onClick={()=>setSelectedLevel('all')}>Все</button>{levels.map(l=><button key={l} className={`btn-soft ${selectedLevel===l?'a1-selected':''}`} onClick={()=>setSelectedLevel(l)}>{l}</button>)}</div>
   {visible.length===0&&<p className="muted">Для такого сочетания пока нет диалога. Выбери другой уровень или категорию.</p>}
   <div className="grid md:grid-cols-2 gap-3">{visible.map(d=>{const previous=results['dialogue:'+d.id];return <button key={d.id} className="panel p-5 text-left hover:border-indigo-500" onClick={()=>begin(d)}><div className="flex justify-between gap-2"><span className="tag">{d.level}</span><span className="text-sm text-indigo-700 dark:text-indigo-300 font-semibold">{previous?`${previous.score}/${previous.total} · повторить`:'Начать'}</span></div><h2 className="text-lg font-extrabold mt-3">{d.title}</h2><p className="muted text-sm mt-2">{d.goal}</p><span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 mt-4 block">3 реплики · варианты ответов</span></button>})}</div>
  </>}
 </div>;
}

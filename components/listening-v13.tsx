'use client';
import {useEffect,useRef,useState} from 'react';
import {CheckCircle2,Headphones,Mic,MicOff,Pause,Volume2} from 'lucide-react';
import type {ListeningUnit} from '../lib/skills-content';
import {compareTranscription,spokenLine} from '../lib/listening-v13';
import type {ListeningPractice} from '../lib/storage';

type Recognizer={lang:string;continuous:boolean;interimResults:boolean;onresult:((event:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void)|null;onerror:((event:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;abort:()=>void;stop:()=>void};
type RecognizerWindow=Window & {SpeechRecognition?:new()=>Recognizer;webkitSpeechRecognition?:new()=>Recognizer};
const transcribeHint='Совпадение слов с образцом не является фонетической оценкой. Распознавание речи может ошибаться.';

export function ListeningLab({unit,rate,practice,onRecord}:{unit:ListeningUnit;rate:number;practice?:ListeningPractice;onRecord:(unitId:string,accuracy:number)=>void}){
 const [line,setLine]=useState(0);
 const [revealLine,setRevealLine]=useState(false);
 const [dictation,setDictation]=useState('');
 const [score,setScore]=useState<ReturnType<typeof compareTranscription>|null>(null);
 const [status,setStatus]=useState('');
 const [micSupport,setMicSupport]=useState(false);
 const [recording,setRecording]=useState(false);
 const recognition=useRef<Recognizer|null>(null);
 const current=spokenLine(unit.lines[line]||'');
 function stop(){if(typeof window!=='undefined'&&'speechSynthesis'in window)window.speechSynthesis.cancel();}
 useEffect(()=>{
  setMicSupport(!!((window as RecognizerWindow).SpeechRecognition||(window as RecognizerWindow).webkitSpeechRecognition));
  return ()=>{recognition.current?.abort();if('speechSynthesis'in window)window.speechSynthesis.cancel();};
 },[]);
 useEffect(()=>{setLine(0);setDictation('');setScore(null);setStatus('');setRevealLine(false);recognition.current?.abort();setRecording(false);stop();},[unit.id]);
 function play(text:string){
  stop();setStatus('');
  if(!('speechSynthesis'in window)){setStatus('Браузер не поддерживает озвучку. Попробуй Chrome или Edge.');return;}
  const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=rate;
  const found=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='en-us');if(found)utterance.voice=found;
  utterance.onerror=()=>setStatus('Не удалось воспроизвести фразу. Проверь наличие системного голоса en-US.');
  window.speechSynthesis.speak(utterance);
 }
 function switchLine(i:number){recognition.current?.abort();setRecording(false);setLine(i);setDictation('');setScore(null);setRevealLine(false);stop();setStatus('');}
 function check(){if(!dictation.trim())return;const answer=compareTranscription(current,dictation);setScore(answer);onRecord(unit.id,answer.accuracy);}
 function toggleMic(){
  if(recording){recognition.current?.stop();setRecording(false);return;}
  const Speech=(window as RecognizerWindow).SpeechRecognition||(window as RecognizerWindow).webkitSpeechRecognition;
  if(!Speech){setStatus('Распознавание речи недоступно в этом браузере. Можно ввести текст вручную.');return;}
  const rec=new Speech();recognition.current=rec;rec.lang='en-US';rec.continuous=false;rec.interimResults=false;
  rec.onresult=(event)=>{setDictation(event.results[0]?.[0]?.transcript||'');setScore(null);};
  rec.onerror=(event)=>{setStatus(`Микрофон: ${event.error}. Проверь разрешение браузера.`);setRecording(false);};
  rec.onend=()=>setRecording(false);
  try{rec.start();setRecording(true);setStatus('Слушаю английскую речь…');}catch{setStatus('Микрофон недоступен.');}
 }
 return <div className="mt-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-700 bg-white dark:bg-[#17233d] p-4 md:p-5 space-y-4">
  <div><span className="tag">LISTENING LAB · БЕСПЛАТНО</span><h3 className="text-xl font-extrabold mt-2">Реальная практика на слух</h3><p className="muted text-sm mt-1">Озвучивание работает через голос браузера, без API-ключа. Для распознавания речи браузеру иногда нужен интернет. Это не проверка произношения.</p></div>
  <label className="block text-sm font-semibold">Реплика для тренировки<select className="field mt-1 w-full" value={line} onChange={e=>switchLine(Number(e.target.value))}>{unit.lines.map((v,i)=><option key={i} value={i}>{i+1}. {v.includes(':')?v.split(':')[0]:'Диктор'} — {spokenLine(v).slice(0,58)}{spokenLine(v).length>58?'…':''}</option>)}</select></label>
  <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 p-3 text-sm" aria-live="polite"><b>Выбрана реплика {line+1} из {unit.lines.length}:</b> {unit.lines[line]?.split(':')[0]||'Диктор'}<p className="muted mt-1">При смене реплики меняются аудио и правильный ответ диктанта.</p><button className="text-indigo-700 dark:text-indigo-300 font-bold mt-2" onClick={()=>setRevealLine(v=>!v)}>{revealLine?'Скрыть текст':'Показать текст для сверки'}</button>{revealLine&&<p lang="en" className="mt-2 font-semibold">{current}</p>}</div>
  <div className="flex flex-wrap gap-2"><button className="btn" onClick={()=>void play(unit.lines.map(spokenLine).join(' '))}><Headphones size={17}/> Слушать весь диалог</button><button className="btn-soft" onClick={()=>void play(current)}><Volume2 size={17}/> Повторить реплику</button><button className="btn-soft" onClick={stop}><Pause size={16}/> Стоп</button></div>
  {status&&<p className="text-sm rounded-lg bg-amber-50 text-amber-900 dark:bg-amber-900/25 dark:text-amber-100 p-3" role="status">{status}</p>}
  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3"><div className="flex flex-wrap gap-2 items-center justify-between"><h4 className="font-extrabold">Диктант и повторение вслух</h4>{practice&&<span className="tag">Лучший результат: {practice.best}% · попыток {practice.attempts}</span>}</div>
  <p className="muted text-sm">Прослушай выбранную реплику и запиши её. Можно произнести её в микрофон, если браузер поддерживает распознавание.</p>
  <textarea rows={2} className="field w-full" value={dictation} onChange={e=>{setDictation(e.target.value);setScore(null)}} placeholder="Что услышал на английском?" maxLength={600} aria-label="Текст услышанной реплики"/>
  <div className="flex flex-wrap gap-2"><button className="btn" onClick={check} disabled={!dictation.trim()}><CheckCircle2 size={17}/> Проверить текст</button>{micSupport&&<button className="btn-soft" onClick={toggleMic}>{recording?<MicOff size={17}/>:<Mic size={17}/>} {recording?'Остановить запись':'Сказать в микрофон'}</button>}</div>
  {score&&<div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-4 space-y-2" role="status"><b>Совпадение слов: {score.accuracy}%</b><p className="text-sm">Отличий по словам: {score.errors}. Ожидаемый текст:</p><p className="font-semibold leading-7" lang="en-US">{current}</p><p className="muted text-xs">{transcribeHint}</p></div>}</div>
 </div>;
}

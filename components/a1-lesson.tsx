'use client';
import {useEffect,useMemo,useState} from 'react';
import type {ChangeEvent,KeyboardEvent} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,ClipboardCheck,Lightbulb,RotateCcw,Volume2,XCircle} from 'lucide-react';
import type {Lesson,Question} from '../lib/content';
import {getA1Unit,buildA1Exercises,checkA1Answer,type A1Exercise} from '../lib/a1-course';
import {getUpperUnit,makeAdvancedExercises} from '../lib/upper-course';

const typeLabels:Record<A1Exercise['type'],string>={choice:'Выбери ответ',fill:'Впиши слово или форму',order:'Собери предложение',fix:'Найди и исправь ошибку',translate:'Переведи предложение'};
function speak(text:string){
 if(typeof window==='undefined')return;
 if(!('speechSynthesis'in window)){alert('Озвучка недоступна в этом браузере.');return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.85;
 const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='en-us');if(voice)u.voice=voice;
 window.speechSynthesis.speak(u);
}

type Props={lesson:Lesson;completed:boolean;onBack:()=>void;
 onAnswer:(lesson:Lesson,q:Question,correct:boolean)=>void;
 onFinish:(lesson:Lesson,correct:number,total:number)=>void};

export function A1LessonView({lesson,completed,onBack,onAnswer,onFinish}:Props){
 const unit=lesson.level==='A1'?getA1Unit(lesson.id):getUpperUnit(lesson.id);
 const tasks=useMemo(()=>lesson.level==='A1'?buildA1Exercises(lesson):makeAdvancedExercises(lesson),[lesson]);
 const [phase,setPhase]=useState<'theory'|'practice'|'results'>('theory');
 // A long theory section can leave the viewport far below the new practice panel.
 useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[phase]);
 const [step,setStep]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [typed,setTyped]=useState('');
 const [picked,setPicked]=useState<number[]>([]);
 const [submitted,setSubmitted]=useState(false);
 const [correct,setCorrect]=useState(0);
 const [mistakes,setMistakes]=useState<{prompt:string;answer:string;why:string}[]>([]);
 const [lastCorrect,setLastCorrect]=useState(false);
 if(!unit)return <div className="panel p-6">Урок не найден. <button onClick={onBack} className="btn-soft">Назад</button></div>;
 const task=tasks[step];
 const done=step===tasks.length-1;
 const passed=correct>=Math.ceil(tasks.length*.7);
 const assembled=picked.map(i=>task?.words?.[i]||'').join(' ');
 const given=task?.type==='choice'?(choice===null?'':task.choices?.[choice]||''):task?.type==='order'?assembled:typed;
 const canCheck=!!given.trim();
 function submit(){
  if(submitted||!canCheck||!task)return;
  const ok=task.type==='choice'?choice===task.correctIndex:checkA1Answer(given,task.answers);
  setLastCorrect(ok);setSubmitted(true);
  if(ok)setCorrect(x=>x+1);
  else setMistakes(x=>[...x,{prompt:task.source?`${task.prompt} ${task.source}`:task.prompt,answer:task.answers[0],why:task.why}]);
  // The original profile callback records XP and errors with the unchanged lesson ID.
  const record:Question={q:task.source?`${task.prompt} ${task.source}`:task.prompt,
   choices:[task.answers[0]],answer:0,why:task.why};
  onAnswer(lesson,record,ok);
 }
 function advance(){
  if(!submitted)return;
  if(done){setPhase('results');onFinish(lesson,correct,tasks.length);return;}
  setStep(x=>x+1);setChoice(null);setTyped('');setPicked([]);setSubmitted(false);
 }
 function retry(){setStep(0);setCorrect(0);setChoice(null);setTyped('');setPicked([]);setSubmitted(false);setMistakes([]);setPhase('practice');}
 const title=typeLabels[task?.type||'choice'];
 return <div className="max-w-4xl space-y-5">
  <button type="button" className="btn-soft" onClick={onBack}><ArrowLeft size={17}/> Все уровни</button>
  <section className="panel p-6 md:p-8">
   <div className="flex items-center flex-wrap gap-2"><span className="tag">{lesson.level} · ПОЛНЫЙ УРОК</span><span className="muted text-xs font-bold">{completed?'Ранее пройден • можно повторить':'Новый урок'}</span></div>
   <h1 className="text-3xl font-extrabold mt-3">{unit.title}</h1><p className="muted mt-2">{unit.desc}</p>
   <div className="flex flex-wrap gap-2 mt-5 text-xs font-bold">
    <span className={`rounded-lg px-3 py-2 ${phase==='theory'?'bg-indigo-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>1. Теория</span>
    <span className={`rounded-lg px-3 py-2 ${phase==='practice'?'bg-indigo-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>2. Практика · {tasks.length} заданий</span>
    <span className={`rounded-lg px-3 py-2 ${phase==='results'?'bg-indigo-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>3. Итог</span>
   </div>
  </section>
  {phase==='theory'&&<>
   <section className="panel p-6 md:p-8 space-y-5">
    <div className="flex items-center gap-2"><BookOpen className="text-indigo-500"/><h2 className="text-xl font-extrabold">Разберём правило по шагам</h2></div>
    <p className="muted text-sm leading-7">Прочитай объяснения, произнеси примеры и сравни правильные конструкции с типичными ошибками.</p>
    <div className="space-y-3">{unit.sections.map((section,i)=><article key={i} className="rounded-2xl border border-slate-200 dark:border-slate-600 p-5">
     <div className="flex gap-3"><span className="w-8 h-8 shrink-0 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 flex items-center justify-center font-extrabold">{i+1}</span><div className="flex-1"><h3 className="font-extrabold text-lg">{section.title}</h3><p className="mt-2 leading-7">{section.body}</p><button type="button" className="mt-3 flex gap-2 items-center text-indigo-700 dark:text-indigo-300 font-semibold text-sm text-left" onClick={()=>speak(section.model)}><Volume2 size={16}/>{section.model}</button></div></div>
    </article>)}</div>
    <div className="marked-note rounded-2xl p-5"><h3 className="font-extrabold text-indigo-700 dark:text-indigo-200">Формулы для запоминания</h3><p className="mt-3 font-semibold whitespace-pre-line leading-9">{unit.formula}</p></div>
    <div><h3 className="font-bold mb-3">Подсказки и маркеры</h3><div className="flex flex-wrap gap-2">{unit.markers.map(x=><span key={x} className="rounded-xl bg-slate-100 dark:bg-slate-700 px-3 py-2 font-semibold text-sm">{x}</span>)}</div></div>
   </section>
   <section className="panel p-6 md:p-8"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-extrabold">10 примеров с переводом</h2><p className="muted text-sm mt-2">Нажми на динамик и повтори фразу вслух.</p></div><span className="tag">EN-US</span></div>
    <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">{unit.examples.map(([en,ru],i)=><div key={i} className="flex gap-3 items-center py-3.5"><button type="button" onClick={()=>speak(en)} className="rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 p-3 shrink-0" aria-label={'Прослушать '+en}><Volume2 size={18}/></button><div><p className="font-bold">{en}</p><p className="muted text-sm mt-1">{ru}</p></div></div>)}</div>
   </section>
   <section className="panel p-6 md:p-8"><h2 className="text-xl font-extrabold flex gap-2 items-center"><Lightbulb size={22} className="text-amber-500"/> Ошибки, которые важно избежать</h2><div className="space-y-4 mt-5">{unit.pitfalls.map((p,i)=><article key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4"><div className="grid sm:grid-cols-2 gap-3"><div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3"><p className="font-bold text-rose-700 dark:text-rose-300 text-xs">НЕВЕРНО</p><p className="mt-2 font-semibold">{p.wrong}</p></div><div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3"><p className="font-bold text-emerald-700 dark:text-emerald-300 text-xs">ПРАВИЛЬНО</p><p className="mt-2 font-semibold">{p.right}</p></div></div><p className="muted text-sm leading-6 mt-3">{p.why}</p></article>)}</div></section>
   <div className="flex flex-wrap gap-3"><button type="button" className="btn" onClick={retry}>Начать {tasks.length} упражнений <ArrowRight size={18}/></button><button type="button" className="btn-soft" onClick={onBack}>Вернуться к урокам</button></div>
  </>}
  {phase==='practice'&&task&&<section className="panel p-6 md:p-9">
   <div className="flex justify-between items-start flex-wrap gap-2 text-sm font-semibold"><span className="tag">{title}</span><span className="muted">Вопрос {step+1} / {tasks.length} · Правильно: {correct}</span></div>
   <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mt-5 mb-7" aria-label={`Пройдено ${step} из ${tasks.length}`}><div className="bg-indigo-500 h-full transition-all" style={{width:`${step/tasks.length*100}%`}}/></div>
   <h2 className="font-extrabold text-xl md:text-2xl leading-9">{task.prompt}</h2>
   {task.source&&<p className="rounded-xl bg-rose-50 dark:bg-rose-950/40 mt-5 p-4 font-bold">{task.source}</p>}
   {task.type==='choice'?<div className="grid gap-3 mt-6">{task.choices?.map((option,i)=><button type="button" key={i} disabled={submitted} onClick={()=>setChoice(i)} className={`study-option ${submitted&&i===task.correctIndex?'correct':submitted&&choice===i?'wrong':choice===i?'a1-selected':''}`} aria-pressed={choice===i}><b className="mr-2">{String.fromCharCode(65+i)}.</b>{option}</button>)}</div>:
    task.type==='order'?<div className="mt-6 space-y-4"><div className="min-h-16 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 p-3 flex flex-wrap gap-2 items-center">{picked.length?picked.map((at,i)=><button type="button" disabled={submitted} key={i} className="a1-token-selected" onClick={()=>setPicked(p=>p.filter((_,j)=>j!==i))}>{task.words?.[at]}</button>):<span className="muted text-sm">Выбирай слова ниже в правильном порядке</span>}</div><div className="flex flex-wrap gap-2">{task.words?.map((token,i)=><button type="button" key={i} disabled={submitted||picked.includes(i)} onClick={()=>setPicked(p=>[...p,i])} className="a1-token">{token}</button>)}</div><button type="button" disabled={submitted||picked.length===0} className="btn-soft" onClick={()=>setPicked([])}><RotateCcw size={16}/> Очистить</button></div>:
    <div className="mt-6"><label htmlFor="a1-answer" className="block font-semibold text-sm mb-2">{task.type==='fill'?'Напиши только пропущенное слово или выражение':'Напиши предложение полностью на английском'}</label><input id="a1-answer" type="text" className="field w-full" autoComplete="off" autoCapitalize="off" spellCheck={false} value={typed} disabled={submitted} placeholder={task.type==='fill'?'Твой ответ…':'Напиши предложение…'} onChange={(e:ChangeEvent<HTMLInputElement>)=>setTyped(e.target.value)} onKeyDown={(e:KeyboardEvent<HTMLInputElement>)=>{if(e.key==='Enter'){e.preventDefault();submit();}}}/><p className="muted mt-2 text-xs">Проверка по заранее подготовленным правильным вариантам, без ИИ. Регистр и конечная пунктуация не важны.</p></div>}
   {!submitted?<button type="button" className="btn mt-6" disabled={!canCheck} onClick={submit}>Проверить ответ <ClipboardCheck size={17}/></button>:<div className={`mt-6 rounded-2xl p-5 ${lastCorrect?'bg-emerald-50 dark:bg-emerald-950/40':'bg-rose-50 dark:bg-rose-950/40'}`} role="status"><div className="flex gap-2 items-center font-extrabold">{lastCorrect?<CheckCircle2 className="text-emerald-600" size={20}/>:<XCircle className="text-rose-600" size={20}/>} {lastCorrect?'Правильно!':'Есть ошибка — разберём её'}</div><p className="mt-3"><b>Правильный ответ:</b> {task.answers[0]}</p>{!lastCorrect&&<p className="mt-1 text-sm"><b>Твой ответ:</b> {given}</p>}<p className="mt-3 text-sm leading-7">{task.why}</p><button className="btn mt-5" onClick={advance}>{done?'Завершить тренировку':'Следующее задание'} <ArrowRight size={17}/></button></div>}
  </section>}
  {phase==='results'&&<section className="panel p-6 md:p-9"><div className="text-center"><GraduationCapIcon passed={passed}/><h2 className="text-3xl font-black mt-4">{passed?'Отличная работа!':'Стоит закрепить тему'}</h2><p className="muted mt-3 text-lg">{correct} из {tasks.length} · {Math.round(correct/tasks.length*100)}%</p><p className="mt-3">{passed?'Урок отмечен как пройденный. Можешь повторить его когда угодно.':'Для завершения нужно 70% правильных ответов. Посмотри ошибки и попробуй снова.'}</p></div>
   {mistakes.length>0&&<div className="mt-8"><h3 className="font-extrabold text-xl">Разбор ошибок · {mistakes.length}</h3><div className="divide-y divide-slate-200 dark:divide-slate-700">{mistakes.map((item,i)=><article key={i} className="py-4"><p className="font-bold">{item.prompt}</p><p className="mt-2 text-emerald-700 dark:text-emerald-300 font-semibold">Правильно: {item.answer}</p><p className="muted mt-1 text-sm leading-6">{item.why}</p></article>)}</div></div>}
   <div className="mt-7 flex flex-wrap gap-3 justify-center"><button type="button" className="btn-soft" onClick={retry}><RotateCcw size={17}/> Пройти заново</button><button type="button" className="btn" onClick={onBack}>К уровням <ArrowRight size={17}/></button><button type="button" className="btn-soft" onClick={()=>setPhase('theory')}><BookOpen size={17}/> Повторить теорию</button></div>
  </section>}
 </div>;
}
function GraduationCapIcon({passed}:{passed:boolean}){return <div className={`mx-auto rounded-2xl w-20 h-20 grid place-items-center ${passed?'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300':'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'}`}><ClipboardCheck size={40}/></div>;}

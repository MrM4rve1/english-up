'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,ChevronDown,ChevronRight,GraduationCap,RotateCcw,Volume2} from 'lucide-react';
import type {Lesson,Question} from '../lib/content';
import type {Level} from '../lib/storage';
import {enrichLessons,type DetailedLesson} from '../lib/enrichment';
import {buildA1Exercises,getA1Order} from '../lib/a1-course';
import {getUpperUnit,makeAdvancedExercises,getUpperOrder} from '../lib/upper-course';
import {A1LessonView} from './a1-lesson';

export const LEVELS:Level[]=['A1','A2','B1','B2'];
const levelInfo:Record<Level,{name:string;sub:string;dot:string}>={
 A1:{name:'Начальный',sub:'Основы языка и простые предложения',dot:'01'},
 A2:{name:'Базовый',sub:'Повседневные ситуации и уверенная база',dot:'02'},
 B1:{name:'Средний',sub:'Сложные мысли и рабочая переписка',dot:'03'},
 B2:{name:'Выше среднего',sub:'Точные формулировки и сложные структуры',dot:'04'},
};

export function sayEnglish(text:string,rate=.86){
 if(typeof window==='undefined'||!('speechSynthesis'in window)){alert('Браузер не поддерживает озвучивание.');return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=rate;
 const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='en-us');if(voice)u.voice=voice;
 window.speechSynthesis.speak(u);
}

type Props={lessons:Lesson[];currentLevel:Level;focusLevel:Level|null;completed:Record<string,number>;
  selected:Lesson|null;onOpenReference?:()=>void;onSelect:(lesson:Lesson)=>void;onBack:()=>void;
  onAnswer:(lesson:Lesson,q:Question,correct:boolean)=>void;onFinish:(lesson:Lesson,correct:number,total:number)=>void;
};
export function GrammarCourse({lessons,currentLevel,focusLevel,completed,selected,onOpenReference,onSelect,onBack,onAnswer,onFinish}:Props){
 const [open,setOpen]=useState<Record<Level,boolean>>({A1:true,A2:currentLevel==='A2',B1:currentLevel==='B1',B2:currentLevel==='B2'});
 const all=useMemo(()=>enrichLessons(lessons),[lessons]);
 useEffect(()=>{if(focusLevel)setOpen(old=>({...old,[focusLevel]:true}));},[focusLevel]);
 if(selected){const lesson=all.find(l=>l.id===selected.id)||selected;
  return (lesson.level==='A1'||getUpperUnit(lesson.id))?<A1LessonView key={lesson.id} lesson={lesson} completed={!!completed[lesson.id]} onBack={onBack} onAnswer={onAnswer} onFinish={onFinish}/>:<LessonView key={lesson.id} lesson={lesson} completed={!!completed[lesson.id]} onBack={onBack} onAnswer={onAnswer} onFinish={onFinish}/>;
 }
 const completedCount=lessons.filter(l=>completed[l.id]).length;
 return <div className="space-y-6">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
   <div><span className="tag">ПОЛНЫЙ ПУТЬ · A1 → B2</span><h1 className="text-3xl md:text-4xl font-extrabold mt-3">Грамматика по уровням</h1><p className="muted mt-2 max-w-2xl">Открой нужный уровень, выбери тему, изучи правило и закрепи его в упражнениях. Твой прежний прогресс сохранён.</p></div>
   <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 p-4 bg-indigo-50 dark:bg-indigo-950/30 shrink-0"><div className="font-extrabold text-2xl">{completedCount} <span className="text-base font-semibold muted">/ {lessons.length}</span></div><div className="text-xs muted">уроков завершено</div></div>
  </div>
  {onOpenReference&&<button className="panel w-full p-5 text-left flex items-center justify-between gap-3 hover:border-indigo-500" onClick={onOpenReference}><span><b className="text-lg">📚 Справочник правил по темам</b><span className="muted block text-sm mt-1">Артикли, местоимения, предлоги, say / tell / speak / talk и другие базовые конструкции — с поиском и заданиями.</span></span><ArrowRight className="shrink-0 text-indigo-600 dark:text-indigo-300" size={21}/></button>}
  <div className="space-y-4">
   {LEVELS.map(level=>{
    const group=all.filter(l=>l.level===level).sort((a,b)=>level==='A1'?getA1Order(a.id)-getA1Order(b.id):getUpperOrder(a.id)-getUpperOrder(b.id)),done=group.filter(l=>completed[l.id]).length,expanded=open[level];
    return <section key={level} className="panel overflow-hidden">
     <button className="w-full text-left p-5 md:p-6 flex gap-4 items-center" onClick={()=>setOpen(old=>({...old,[level]:!old[level]}))} aria-expanded={expanded} aria-controls={'lessons-'+level}>
      <span className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black">{level}</span>
      <span className="flex-1 min-w-0"><span className="block font-extrabold text-xl">{level} <span className="text-base font-semibold muted">· {levelInfo[level].name}</span></span><span className="block muted text-sm mt-1">{levelInfo[level].sub}</span></span>
      <span className="hidden sm:block text-sm font-bold muted">{done} / {group.length}</span><ChevronDown className={`shrink-0 transition-transform ${expanded?'rotate-180':''}`} size={22}/>
     </button>
     <div className="h-1.5 bg-slate-100 dark:bg-slate-700 mx-5 md:mx-6 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full transition-all" style={{width:`${group.length?done/group.length*100:0}%`}}/></div>
     {expanded&&<div id={'lessons-'+level} className="p-4 md:p-6 grid md:grid-cols-2 gap-3">
      {group.map((lesson,index)=><button key={lesson.id} onClick={()=>onSelect(lesson)} className="level-panel text-left p-4 md:p-5 transition hover:border-indigo-400 hover:shadow-sm group">
       <div className="flex items-start gap-3"><span className="h-9 w-9 shrink-0 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-sm">{String(index+1).padStart(2,'0')}</span><span className="min-w-0 flex-1"><strong className="text-base block">{lesson.title}</strong><span className="muted block text-sm mt-1">{lesson.desc}</span></span>{completed[lesson.id]?<CheckCircle2 size={21} className="text-emerald-500 shrink-0"/>:<ChevronRight className="text-indigo-500 shrink-0" size={20}/>}</div>
       <div className="mt-4 flex items-center justify-between text-xs"><span className="muted">{`${level==='A1'?buildA1Exercises(lesson).length:makeAdvancedExercises(lesson).length} заданий · 5 форматов`}</span><span className="font-bold text-indigo-600 dark:text-indigo-300">{completed[lesson.id]?'Повторить':'Учить →'}</span></div>
      </button>)}
     </div>}
    </section>;
   })}
  </div>
 </div>;
}

function LessonView({lesson,completed,onBack,onAnswer,onFinish}:{lesson:DetailedLesson;completed:boolean;onBack:()=>void;onAnswer:Props['onAnswer'];onFinish:Props['onFinish']}){
 const [phase,setPhase]=useState<'theory'|'quiz'|'results'>('theory');
 const [index,setIndex]=useState(0);const [selected,setSelected]=useState<number|null>(null);const [correct,setCorrect]=useState(0);
 const questions=lesson.questions;const question=questions[index];const passed=correct>=Math.ceil(questions.length*.7);
 function choose(i:number){if(selected!==null)return;setSelected(i);const ok=i===question.answer;if(ok)setCorrect(x=>x+1);onAnswer(lesson,question,ok);}
 function next(){if(index===questions.length-1){setPhase('results');onFinish(lesson,correct,questions.length);}else{setIndex(x=>x+1);setSelected(null);}}
 function retry(){setPhase('quiz');setIndex(0);setCorrect(0);setSelected(null);}
 return <div className="space-y-5 max-w-4xl">
  <button className="btn-soft" onClick={onBack}><ArrowLeft size={17}/> Все уроки</button>
  <div className="panel p-6 md:p-8"><div className="flex flex-wrap items-center gap-2"><span className="tag">{lesson.level}</span><span className="muted text-xs font-semibold">{completed?'Ранее пройден':'Новая тема'}</span></div><h1 className="text-3xl font-extrabold mt-3">{lesson.title}</h1><p className="muted mt-2">{lesson.desc}</p><div className="mt-6 flex gap-2"><span className={`tag ${phase==='theory'?'':'opacity-60'}`}>1. Теория</span><span className={`tag ${phase==='quiz'?'':'opacity-60'}`}>2. Практика</span><span className={`tag ${phase==='results'?'':'opacity-60'}`}>3. Результат</span></div></div>
  {phase==='theory'&&<>
   <section className="panel p-6 md:p-8 space-y-5"><h2 className="text-xl font-extrabold flex items-center gap-2"><BookOpen size={22} className="text-indigo-500"/> Простое объяснение</h2><p className="leading-8">{lesson.rule}</p><div className="marked-note rounded-xl p-4"><div className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2">Формула</div><p className="font-semibold leading-8 whitespace-pre-line">{lesson.formula}</p></div></section>
   <section className="panel p-6 md:p-8"><h2 className="text-xl font-extrabold mb-1">Примеры из жизни</h2><p className="muted text-sm mb-5">Нажми на динамик, чтобы прослушать фразу по-американски.</p><div className="divide-y divide-slate-100 dark:divide-slate-700">{lesson.examples.map(([en,ru],i)=><div key={i} className="flex items-center gap-4 py-4"><button className="shrink-0 text-indigo-600 dark:text-indigo-300 p-2 rounded-xl bg-indigo-50 dark:bg-slate-700" onClick={()=>sayEnglish(en)} aria-label={'Прослушать: '+en}><Volume2 size={19}/></button><div><p className="font-bold">{en}</p><p className="muted text-sm mt-1">{ru}</p></div></div>)}</div></section>
   {lesson.pitfall&&<section className="panel p-6 md:p-8"><h2 className="text-xl font-extrabold mb-4">Частая ошибка</h2><div className="grid sm:grid-cols-2 gap-3"><div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl"><span className="text-rose-700 dark:text-rose-300 text-xs font-bold">✗ НЕПРАВИЛЬНО</span><p className="font-semibold mt-2">{lesson.pitfall[0]}</p></div><div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl"><span className="text-emerald-700 dark:text-emerald-300 text-xs font-bold">✓ ПРАВИЛЬНО</span><p className="font-semibold mt-2">{lesson.pitfall[1]}</p></div></div><p className="muted text-sm mt-4">{lesson.pitfall[2]}</p></section>}
   <button className="btn w-full sm:w-auto" onClick={()=>setPhase('quiz')}>Перейти к упражнениям <ArrowRight size={18}/></button>
  </>}
  {phase==='quiz'&&<section className="panel p-6 md:p-9"><div className="flex items-center justify-between text-sm font-bold mb-4"><span>Упражнение {index+1} из {questions.length}</span><span className="muted">Верно: {correct}</span></div><div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-7"><div className="h-full bg-indigo-500 transition-all" style={{width:`${(index+1)/questions.length*100}%`}}/></div><h2 className="text-xl md:text-2xl font-extrabold mb-6">{question.q}</h2><div className="grid gap-3">{question.choices.map((option,i)=><button key={i} onClick={()=>choose(i)} disabled={selected!==null} className={`study-option ${selected!==null&&i===question.answer?'correct':selected===i?'wrong':''}`}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==null&&<div className={`rounded-xl p-4 mt-5 ${selected===question.answer?'bg-emerald-50 dark:bg-emerald-950/50':'bg-rose-50 dark:bg-rose-950/40'}`}><b>{selected===question.answer?'✓ Правильно!':'✗ Неверно. Правильный ответ: '+question.choices[question.answer]}</b><p className="text-sm mt-2 leading-7">{question.why}</p><button className="btn mt-4" onClick={next}>{index+1===questions.length?'Посмотреть результат':'Следующее задание'} <ArrowRight size={16}/></button></div>}</section>}
  {phase==='results'&&<section className="panel p-7 md:p-10 text-center"><GraduationCap className="mx-auto text-indigo-500" size={48}/><h2 className="text-3xl font-extrabold mt-4">{passed?'Тема освоена!':'Ещё немного практики'}</h2><p className="muted mt-3">{correct} из {questions.length} правильных · {Math.round(correct/questions.length*100)}%</p><p className="mt-4">{passed?'Урок отмечен как пройденный. В любой момент можно повторить.':'Для завершения требуется минимум 70% верных ответов. Разберись с ошибками и попробуй снова.'}</p><div className="flex gap-3 justify-center mt-7 flex-wrap"><button className="btn-soft" onClick={retry}><RotateCcw size={18}/> Повторить тест</button><button className="btn" onClick={onBack}>Вернуться к уровням <ArrowRight size={18}/></button></div></section>}
 </div>;
}

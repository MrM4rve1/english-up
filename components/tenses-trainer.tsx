'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowRight,BookOpen,CheckCircle2,Clock3,RotateCcw,Volume2,AlertCircle} from 'lucide-react';
import type {Level,Review,TenseStats} from '../lib/storage';
import {checkTenseAnswer,tenses,modes,getSessionTenseTasks,masteryOverview,type TenseMode,type TenseTask,type TenseUnit} from '../lib/tenses';
import {sayEnglish} from './grammar';

type SessionMode='mixed'|'review'|TenseMode;
type Props={level:Level;stats:Record<string,TenseStats>;reviews:Record<string,Review>;onAnswer:(task:TenseTask,correct:boolean)=>void;onFinish:(key:string,score:number,total:number)=>void;onOpenErrors:()=>void};
const levelOrder=['A1','A2','B1','B2'] as const;
const modeNames:Record<SessionMode,string>={mixed:'Смешанная практика',review:'Повторение по расписанию',identify:'Определи время',form:'Выбери форму',fix:'Исправь ошибку',fill:'Впиши форму',translate:'Переведи предложение',order:'Собери предложение'};
function TenseReference({unit}:{unit:TenseUnit}){
 return <div className="grid md:grid-cols-2 gap-4 text-sm leading-7">
  <div className="space-y-3"><div className="marked-note p-4 rounded-xl"><p className="text-xs font-black text-indigo-700 dark:text-indigo-200 mb-2">УТВЕРЖДЕНИЕ (+)</p><p className="font-bold">{unit.formula}</p></div><div className="level-panel p-4"><p className="text-xs font-black muted">ОТРИЦАНИЕ (−)</p><p className="mt-1 font-semibold">{unit.negative}</p><p className="text-xs font-black muted mt-3">ВОПРОС (?)</p><p className="mt-1 font-semibold">{unit.question}</p></div><div className="level-panel p-4"><p className="text-xs font-extrabold muted">ВРЕМЕННАЯ ЛИНИЯ</p><p className="mt-2 font-mono text-sm">{unit.timeline}</p></div></div>
  <div className="space-y-3"><p><b>Когда использовать:</b> {unit.when}</p><p><b>Маркеры:</b> {unit.markers}</p><p><b>Сравни:</b> {unit.contrast}</p><p><b>Частая ошибка:</b> {unit.pitfall}</p><div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40"><button className="text-left flex items-start gap-2 font-extrabold text-indigo-800 dark:text-indigo-200" onClick={()=>sayEnglish(unit.example)}><Volume2 size={17} className="shrink-0 mt-1"/> {unit.example}</button><p className="mt-1 text-sm muted">{unit.exampleRu}</p></div></div>
 </div>;
}
export function TensesPractice({level,stats,reviews,onAnswer,onFinish,onOpenErrors}:Props){
 const practiceRef=useRef<HTMLElement|null>(null);
 const [chosenLevel,setChosenLevel]=useState<Level|'all'>('all');
 const [expanded,setExpanded]=useState<string|null>(null);
 const [focus,setFocus]=useState<string|null>(null);
 const [active,setActive]=useState<TenseTask[]>([]);
 const [mode,setMode]=useState<SessionMode>('mixed');
 const [index,setIndex]=useState(0);
 const [choice,setChoice]=useState('');
 const [tokens,setTokens]=useState<number[]>([]);
 const [checked,setChecked]=useState<boolean|null>(null);
 const [score,setScore]=useState(0);
 const [finished,setFinished]=useState(false);
 const overview=useMemo(()=>masteryOverview(stats,reviews),[stats,reviews]);
 const due=overview.filter(t=>t.due).length;
 useEffect(()=>{if(!active.length)return;const timer=setTimeout(()=>practiceRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),70);return ()=>clearTimeout(timer);},[active]);
 const item=active[index];
 const inputValue=item?.mode==='order'?tokens.map(i=>item.tokens?.[i]||'').join(' '):choice;
 function start(next:SessionMode,nextFocus:string|null=null){const tasks=getSessionTenseTasks(next,chosenLevel,nextFocus,reviews);setActive(tasks);setFocus(nextFocus);setMode(next);setIndex(0);setChoice('');setTokens([]);setChecked(null);setScore(0);setFinished(false);}
 function submit(){if(!item||checked!==null||!inputValue.trim())return;const ok=checkTenseAnswer(item,inputValue);setChecked(ok);if(ok)setScore(x=>x+1);onAnswer(item,ok);}
 function advance(){if(index===active.length-1){setFinished(true);onFinish(`${mode}:${chosenLevel}:${focus||'all'}`,score,active.length);}else{setIndex(i=>i+1);setChoice('');setTokens([]);setChecked(null);}}
 function repeat(){start(mode,focus);}
 return <div className="space-y-6">
  <div><span className="tag">ВСЕ 12 ВРЕМЕННЫХ ФОРМ · A1–B2</span><h1 className="text-3xl md:text-4xl font-extrabold mt-3">Tenses Trainer</h1><p className="muted mt-2 max-w-3xl">Пойми, почему подходит именно это время: изучи конструкцию и закрепи её в шести форматах. Ошибки будут ждать повторения в отдельном разделе.</p></div>
  <section className="panel p-5 md:p-7"><div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between"><div><h2 className="font-extrabold text-xl">Справочник 12 времён</h2><p className="muted text-sm mt-1">Раскрой нужное время, чтобы увидеть формулы и отличие от похожих конструкций.</p></div><span className="tag"><Clock3 size={14} className="mr-1"/> {due} к повторению</span></div>
   <div className="grid md:grid-cols-2 gap-3 mt-5">{levelOrder.map(lev=><div key={lev} className="level-panel p-4"><h3 className="font-black text-lg mb-3">{lev} · {tenses.filter(t=>t.level===lev).length} формы</h3><div className="space-y-2">{tenses.filter(t=>t.level===lev).map(t=>{const stat=overview.find(x=>x.id===t.id)!;return <div key={t.id} className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden bg-white dark:bg-[#1c2741]"><button className="w-full p-3 text-left flex items-center gap-2" onClick={()=>setExpanded(expanded===t.id?null:t.id)} aria-expanded={expanded===t.id}><span className="flex-1"><b className="block">{t.name}</b><span className="muted text-xs">{t.ru}</span></span><span className="text-xs font-bold muted">{stat.percent===null?'Не изучено':stat.percent+'%'}{stat.due?' · повторить':''}</span><span aria-hidden="true">{expanded===t.id?'−':'+'}</span></button>{expanded===t.id&&<div className="p-4 pt-0"><TenseReference unit={t}/><button className="btn mt-4 w-full" onClick={()=>start('mixed',t.id)}>Начать 6 упражнений: {t.name} <ArrowRight size={16}/></button></div>}</div>;})}</div></div>)}</div>
  </section>
  <section className="panel p-5 md:p-7"><h2 className="text-xl font-extrabold">Выбери тренировку</h2><p className="muted text-sm mt-2">Уровень влияет на набор задач, а не на сохранённый уровень твоего профиля ({level}).</p>
   <div className="flex flex-wrap gap-2 my-5">{(['all',...levelOrder] as const).map(lev=><button key={lev} className={chosenLevel===lev?'btn':'btn-soft'} onClick={()=>{setChosenLevel(lev);setActive([]);setFinished(false);setFocus(null);}}>{lev==='all'?'Все уровни':lev}</button>)}</div>
   <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">{modes.map(m=><button key={m.id} className="level-panel p-4 text-left hover:border-indigo-500" onClick={()=>start(m.id)}><b>{m.title}</b><p className="muted text-xs mt-1">{m.description}</p></button>)}</div>
   <div className="grid sm:grid-cols-2 gap-3 mt-3"><button className="btn p-4" onClick={()=>start('mixed')}>Смешанная практика <ArrowRight size={17}/></button><button className="btn-soft p-4" onClick={()=>start('review')} disabled={!due}>Повторить по расписанию · {due}</button></div>
   <p className="text-xs muted mt-4">Для заданий с вводом используется сравнение с подготовленными ответами. Грамматически допустимые синонимы иногда могут не засчитаться — образец и объяснение всегда доступны после проверки.</p>
  </section>
  {mode==='review'&&active.length===0&&<div className="panel p-5" role="status">Сейчас нет времён, назначенных к повторению. Вернись после следующего занятия или начни смешанную тренировку.</div>}
  {active.length>0&&<section ref={practiceRef} className="panel p-5 md:p-8 scroll-mt-5" aria-live="polite">{finished?<div className="text-center py-8"><CheckCircle2 className="text-emerald-500 mx-auto" size={45}/><h2 className="text-2xl font-black mt-4">Тренировка завершена</h2><p className="muted mt-3">{score} из {active.length} · {Math.round(score/active.length*100)}% правильных</p><p className="muted text-sm mt-3">Неверные ответы добавлены в «Мои ошибки», а сложные времена — в интервальное повторение.</p><div className="flex flex-wrap justify-center gap-3 mt-6"><button className="btn" onClick={repeat}><RotateCcw size={17}/> Ещё раз</button><button className="btn-soft" onClick={onOpenErrors}>Мои ошибки</button></div></div>:item&&<>
   <div className="flex justify-between gap-2 text-sm font-bold"><span>{modeNames[mode]}</span><span>{index+1} / {active.length}</span></div><div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden my-4"><div className="h-full bg-indigo-500" style={{width:`${(index+1)/active.length*100}%`}}/></div>
   <div className="flex flex-wrap items-center gap-2 mb-3"><span className="tag">{tenses.find(t=>t.id===item.tenseId)?.level}</span><span className="muted text-sm">{item.mode==='fix'?'Исправь ошибочное предложение':modeNames[item.mode]}</span></div>
   <h3 className="text-xl md:text-2xl font-extrabold leading-relaxed">{item.prompt}</h3>
   {item.hint&&<p className="muted text-sm mt-3">{item.hint}</p>}
   {item.options?<div className="grid gap-3 mt-6">{item.options.map(op=><button type="button" disabled={checked!==null} aria-pressed={choice===op} key={op} className={`study-option ${checked!==null&&op===item.answers[0]?'correct':checked===false&&choice===op?'wrong':choice===op?'a1-selected':''}`} onClick={()=>setChoice(op)}>{op}</button>)}</div>:item.mode==='order'?<div className="mt-5 space-y-4"><div className="min-h-16 p-3 rounded-xl border border-indigo-300 dark:border-indigo-500 flex flex-wrap gap-2">{tokens.length?tokens.map((ti,j)=><button type="button" key={`${ti}-${j}`} className="a1-token-selected" disabled={checked!==null} onClick={()=>setTokens(t=>t.filter((_,k)=>k!==j))}>{item.tokens?.[ti]}</button>):<span className="muted text-sm">Нажимай на слова ниже, чтобы собрать предложение</span>}</div><div className="flex flex-wrap gap-2">{item.tokens?.map((token,j)=><button type="button" key={j} className="a1-token" disabled={tokens.includes(j)||checked!==null} onClick={()=>setTokens(t=>[...t,j])}>{token}</button>)}</div></div>:<form className="mt-5" onSubmit={e=>{e.preventDefault();submit();}}><label htmlFor="tense-response" className="font-bold block mb-2">Твой ответ на английском</label><input id="tense-response" autoComplete="off" spellCheck={false} className="field w-full" placeholder="Напиши ответ здесь" value={choice} disabled={checked!==null} onChange={e=>setChoice(e.target.value)}/></form>}
   {checked===null?<button className="btn mt-5" disabled={!inputValue.trim()} onClick={submit}>Проверить ответ <CheckCircle2 size={17}/></button>:<div className={`rounded-2xl p-5 mt-6 ${checked?'bg-emerald-50 dark:bg-emerald-950/40':'bg-rose-50 dark:bg-rose-950/40'}`} role="status"><p className="font-black flex items-center gap-2">{checked?<CheckCircle2 size={19}/>:<AlertCircle size={19}/>} {checked?'Правильно!':'Разберём ошибку'}</p><p className="text-sm mt-2"><b>Образец:</b> {item.answers[0]}</p><p className="text-sm leading-7 mt-2">{item.explanation}</p><button className="btn mt-4" onClick={advance}>{index===active.length-1?'Результат':'Следующее задание'} <ArrowRight size={17}/></button></div>}
  </>}</section>}
 </div>;
}

'use client';
import {useEffect,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,Headphones,MessageCircle,RotateCcw,Save,Volume2} from 'lucide-react';
import type {Level,SkillResult} from '../lib/storage';
import type {ScenarioUnit,Phrase} from '../lib/life-work-content';
import {americanUnits,workUnits,scenarioResultKey,scenarioSuccess} from '../lib/life-work-content';
import {sayEnglish} from './grammar';

export type LegacySupportCase={client:string;answer:string;explain:string};
type Props={
 level:Level;results:Record<string,SkillResult>;savedWords:string[];
 onComplete:(key:string,score:number,total:number)=>void;
 onMistakes:(unit:ScenarioUnit,missed:{index:number;question:ScenarioUnit['questions'][number]}[])=>void;
 onSavePhrase:(unit:ScenarioUnit,phrase:Phrase,index:number)=>void;
 onStartDialogue:(unit:ScenarioUnit)=>void;
 legacyCases?:LegacySupportCase[];
};
const LEVELS:Level[]=['A1','A2','B1','B2'];
function phraseKey(unit:ScenarioUnit,i:number){return `custom:${unit.category}:${unit.id}-${i}`;}
function ScenarioLesson({unit,props,onBack}:{unit:ScenarioUnit;props:Props;onBack:()=>void}){
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [submitted,setSubmitted]=useState(false);
 const [showTranslation,setShowTranslation]=useState(false);
 const [showExample,setShowExample]=useState(false);
 const [rate,setRate]=useState(.9);
 const score=unit.questions.filter((q,i)=>answers[i]===q.answer).length;
 const allAnswered=Object.keys(answers).length===unit.questions.length;
 const result=props.results[scenarioResultKey(unit)];
 const passed=result&&scenarioSuccess(result.score,result.total);
 function finish(){if(!allAnswered||submitted)return;setSubmitted(true);props.onComplete(scenarioResultKey(unit),score,unit.questions.length);props.onMistakes(unit,unit.questions.flatMap((question,index)=>answers[index]===question.answer?[]:[{index,question}]));}
 return <div className="space-y-5">
  <button className="btn-soft" onClick={onBack}><ArrowLeft size={16}/> Ко всем темам</button>
  <section className="panel p-5 md:p-8">
   <div className="flex flex-wrap items-center gap-2"><span className="tag">{unit.level}</span><span className="muted text-sm">{unit.category==='america'?'English for America':'English for Work'}</span>{passed&&<span className="text-emerald-700 dark:text-emerald-300 text-sm font-bold flex gap-1 items-center"><CheckCircle2 size={15}/> Тема пройдена</span>}</div>
   <h2 className="text-2xl md:text-3xl font-extrabold mt-3">{unit.title}</h2>
   <p className="muted mt-3 leading-7">{unit.goal}</p>
   <div className="marked-note p-4 rounded-xl mt-5"><b>Ситуация</b><p className="mt-2 leading-7">{unit.scene}</p></div>
   <div className="mt-4 rounded-xl bg-indigo-50 dark:bg-[#273657] border border-indigo-200 dark:border-indigo-800 p-4"><b>Как это работает в США</b><p className="leading-7 text-sm mt-2">{unit.culture}</p></div>
  </section>
  <section className="panel p-5 md:p-7">
   <div className="flex flex-wrap justify-between gap-3 items-center"><h3 className="text-xl font-extrabold flex items-center gap-2"><Headphones size={21}/> Разговор в контексте</h3><div className="flex flex-wrap gap-2"><label className="text-sm muted flex items-center gap-2">Скорость <select className="field !py-1" value={rate} onChange={e=>setRate(Number(e.target.value))}><option value="0.75">0.75×</option><option value="0.9">0.9×</option><option value="1">1×</option></select></label><button className="btn-soft" onClick={()=>sayEnglish(unit.dialogue.map(x=>x.en).join(' '),rate)}><Volume2 size={16}/> Весь диалог</button></div></div>
   <p className="muted text-xs mt-2">Используется голос en-US, если он установлен в браузере. Это синтез речи, а не запись дикторов.</p>
   <div className="space-y-3 mt-5">{unit.dialogue.map((line,i)=><div className="level-panel p-4" key={i}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><b className="text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-200">{line.speaker}</b><p lang="en" className="text-base font-semibold leading-7 mt-1">{line.en}</p>{showTranslation&&<p className="muted text-sm mt-2">{line.ru}</p>}</div><button className="btn-soft shrink-0" aria-label={`Прослушать реплику ${i+1}`} onClick={()=>sayEnglish(line.en,rate)}><Volume2 size={16}/></button></div></div>)}</div>
   <button className="btn-soft mt-4" aria-pressed={showTranslation} onClick={()=>setShowTranslation(p=>!p)}>{showTranslation?'Скрыть перевод':'Показать перевод диалога'}</button>
  </section>
  <section className="panel p-5 md:p-7"><h3 className="text-xl font-extrabold">Полезные выражения</h3><p className="muted text-sm mt-2">Озвучивай фразы и сохраняй сложные в личный словарь. Сохранённые фразы доступны в разделе «Новые слова».</p><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-5">{unit.phrases.map((p,i)=>{const saved=props.savedWords.includes(phraseKey(unit,i));return <div className="level-panel p-4 flex flex-col gap-2" key={i}><b lang="en" className="text-lg">{p.en}</b><p className="text-sm">{p.ru}</p><p className="muted text-xs leading-6 flex-1">{p.tip}</p><div className="flex flex-wrap gap-2 mt-2"><button className="btn-soft" aria-label={`Прослушать ${p.en}`} onClick={()=>sayEnglish(p.en,rate)}><Volume2 size={15}/></button><button className="btn-soft" onClick={()=>props.onSavePhrase(unit,p,i)} disabled={saved}>{saved?<><CheckCircle2 size={15}/> Сохранено</>:<><Save size={15}/> В словарь</>}</button></div></div>;})}</div></section>
  <section className="panel p-5 md:p-7"><h3 className="text-xl font-extrabold">Проверь понимание</h3><p className="muted text-sm mt-2">Три вопроса с объяснениями. Тема засчитывается от 2 правильных ответов из 3. Можно проходить повторно.</p>
   <div className="space-y-6 mt-6">{unit.questions.map((q,i)=><div key={i}><p className="font-bold mb-3">{i+1}. {q.q}</p><div className="grid sm:grid-cols-2 gap-2">{q.choices.map((choice,j)=>{const picked=answers[i]===j;const marked=submitted&&picked;const correct=submitted&&j===q.answer;return <button key={j} type="button" disabled={submitted} aria-pressed={picked} className={`study-option ${marked&&!correct?'wrong':correct?'correct':picked?'a1-selected':''}`} onClick={()=>setAnswers(a=>({...a,[i]:j}))}>{choice}</button>;})}</div>{submitted&&<div className={`p-3 rounded-xl mt-3 text-sm leading-6 ${answers[i]===q.answer?'bg-emerald-50 dark:bg-emerald-950/30':'bg-rose-50 dark:bg-rose-950/30'}`} role="status"><b>{answers[i]===q.answer?'Верно':'Неверно'}.</b> {q.why}<p className="mt-1">Ответ: {q.choices[q.answer]}</p></div>}</div>)}</div>
   {submitted?<div className="mt-6 space-y-3"><div role="status" className="marked-note p-4 rounded-xl font-bold">Результат: {score} из {unit.questions.length}. {scenarioSuccess(score,unit.questions.length)?'Тема пройдена.':'Повтори фразы и попробуй ещё раз.'}</div><button className="btn-soft" onClick={()=>{setAnswers({});setSubmitted(false);}}><RotateCcw size={16}/> Новая попытка</button></div>:<button className="btn mt-6" disabled={!allAnswered} onClick={finish}>Проверить ответы <ArrowRight size={16}/></button>}
  </section>
  <section className="panel p-5 md:p-7 space-y-4">
   <h3 className="text-xl font-extrabold">Применение в разговоре</h3><p className="leading-7">{unit.practice.prompt}</p>
   <p className="muted text-sm">Здесь нет длинного задания на письмо: изучи пример и потренируй готовые реплики в бесплатном диалоге.</p>
   <div className="flex flex-wrap gap-3"><button className="btn-soft" onClick={()=>setShowExample(v=>!v)}>{showExample?'Скрыть':'Показать'} образец ответа</button><button className="btn" onClick={()=>props.onStartDialogue(unit)}><MessageCircle size={16}/> Открыть похожий диалог</button></div>
   {showExample&&<div className="level-panel p-4"><b>Один из возможных ответов</b><p className="mt-2 leading-7" lang="en">{unit.practice.model}</p><p className="muted text-sm mt-2">{unit.practice.translation}</p><button className="btn-soft mt-3" onClick={()=>sayEnglish(unit.practice.model,rate)}><Volume2 size={16}/> Послушать</button></div>}
  </section>
 </div>;
}
function LegacyCases({cases,props}:{cases:LegacySupportCase[];props:Props}){
 const [index,setIndex]=useState(0);const [shown,setShown]=useState(false);
 const item=cases[index];
 return <section className="panel p-5 md:p-7 space-y-4"><h2 className="text-xl font-extrabold">Клиентские ситуации</h2><p className="muted text-sm">Пять полезных примеров: послушай клиента, посмотри корректный ответ и перейди к разговорной практике.</p>
  <div className="flex flex-wrap gap-2">{cases.map((_,i)=><button key={i} className={`btn-soft ${i===index?'a1-selected':''}`} onClick={()=>{setIndex(i);setShown(false);}}>Ситуация {i+1}</button>)}</div>
  <div className="level-panel p-4"><b>Клиент</b><p lang="en" className="leading-7 mt-2">{item.client}</p><button className="btn-soft mt-3" onClick={()=>sayEnglish(item.client)}><Volume2 size={16}/> Послушать</button></div>
  <div className="flex gap-2 flex-wrap"><button className="btn-soft" onClick={()=>setShown(v=>!v)}>{shown?'Скрыть':'Показать'} корректный ответ</button><button className="btn" onClick={()=>props.onStartDialogue(workUnits[Math.min(index,workUnits.length-1)])}>Похожий диалог <ArrowRight size={16}/></button></div>
  {shown&&<div className="marked-note p-4 rounded-xl"><p className="leading-7" lang="en">{item.answer}</p><p className="muted text-sm mt-2">{item.explain}</p></div>}
 </section>;
}
export function LifeWorkCourse(props:Props&{kind:'america'|'work'}){
 const {kind}=props;
 const units=kind==='america'?americanUnits:workUnits;
 const [chosen,setChosen]=useState<ScenarioUnit|null>(null);
 const [level,setLevel]=useState<Level| 'all'>(props.level);
 const [view,setView]=useState<'lessons'|'legacy'>('lessons');
 const title=kind==='america'?'English for America':'English for Work';
 const completed=units.filter(u=>{const r=props.results[scenarioResultKey(u)];return r&&scenarioSuccess(r.score,r.total);}).length;
 // Reset selected lesson only if the parent switches between the two programs.
 useEffect(()=>{setChosen(null);setView('lessons');setLevel(props.level);},[kind]);
 return <div className="space-y-6">
  <div><span className="tag">{kind==='america'?'АМЕРИКАНСКИЙ АНГЛИЙСКИЙ':'CUSTOMER SUPPORT · FINTECH · PAYMENTS'}</span><h1 className="text-3xl md:text-4xl font-extrabold mt-3">{title}</h1><p className="muted mt-3 leading-7">{kind==='america'?'Реальные повседневные ситуации: кафе, жильё, покупки, общение с коллегами и разговорные выражения.':'Чат-поддержка, возвраты, споры, расследование платежей, безопасность, рабочая коммуникация и передача смены.'}</p></div>
  <div className="panel p-4 md:p-5 flex flex-wrap gap-3 justify-between items-center"><div><b>{completed} из {units.length} тем пройдено</b><p className="muted text-sm mt-1">Результат каждого теста сохраняется в твоём профиле. Можно повторять без ограничений.</p></div><div className="w-full md:w-48 h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700"><div className="h-full bg-indigo-500" style={{width:`${completed/units.length*100}%`}}/></div></div>
  {kind==='work'&&<div className="flex flex-wrap gap-2"><button className={`btn-soft ${view==='lessons'?'a1-selected':''}`} onClick={()=>{setView('lessons');setChosen(null);}}>Уроки по уровням</button><button className={`btn-soft ${view==='legacy'?'a1-selected':''}`} onClick={()=>{setView('legacy');setChosen(null);}}>5 старых кейсов</button></div>}
  {view==='legacy'&&kind==='work'&&props.legacyCases?.length?<LegacyCases cases={props.legacyCases} props={props}/>:chosen?<ScenarioLesson key={chosen.id} unit={chosen} props={props} onBack={()=>setChosen(null)}/>:<>
   <div className="flex flex-wrap gap-2 items-center"><span className="muted text-sm mr-2">Уровень:</span><button className={`btn-soft ${level==='all'?'a1-selected':''}`} onClick={()=>setLevel('all')}>Все</button>{LEVELS.map(l=><button key={l} className={`btn-soft ${level===l?'a1-selected':''}`} onClick={()=>setLevel(l)}>{l}</button>)}</div>
   {LEVELS.filter(l=>level==='all'||l===level).map(l=>{const matching=units.filter(u=>u.level===l);const passed=matching.filter(u=>{const r=props.results[scenarioResultKey(u)];return r&&scenarioSuccess(r.score,r.total);}).length;return <section className="panel p-5 md:p-7" key={l}><div className="flex flex-wrap gap-3 justify-between items-center"><div><h2 className="text-2xl font-extrabold">{l} <span className="muted text-sm">· {l==='A1'?'Основы':l==='A2'?'Быт и простая работа':l==='B1'?'Уверенное общение':'Сложные ситуации'}</span></h2><p className="muted text-sm mt-2">Пройдено {passed} из {matching.length}</p></div></div><div className="grid md:grid-cols-2 gap-3 mt-5">{matching.map((u,i)=>{const r=props.results[scenarioResultKey(u)];const mastered=r&&scenarioSuccess(r.score,r.total);return <button key={u.id} className="study-option flex gap-3 items-start" onClick={()=>{setChosen(u);window.scrollTo?.({top:0,behavior:'smooth'});}}><span className="tag">{String(i+1).padStart(2,'0')}</span><span className="flex-1"><b className="block text-base">{u.title}</b><span className="muted text-sm leading-6 block mt-1">{u.goal}</span><span className="text-indigo-700 dark:text-indigo-300 text-xs font-bold mt-3 flex gap-1 items-center">{mastered?'✓ Изучено · повторить':'Открыть урок'} <ArrowRight size={14}/></span></span></button>;})}</div></section>;})}
   <div className="panel p-5 text-sm leading-7 muted"><BookOpen size={18} className="inline mr-2"/>Практика бесплатная: диалоги, готовые выражения и выбор ответа. Никакого API-ключа или регистрации. Примеры — учебные, не инструкция для реальной обработки денег.</div>
  </>}
 </div>;
}

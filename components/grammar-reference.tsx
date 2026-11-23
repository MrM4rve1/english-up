'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Bookmark,BookOpen,CheckCircle2,ChevronRight,Search,RotateCcw,Volume2,XCircle,Lightbulb,Filter,ClipboardCheck,Headphones,Delete,ShieldCheck} from 'lucide-react';
import {GRAMMAR_RULES,RULE_CATEGORIES,RULE_TOTALS,filterGrammarRules,isRuleTaskCorrect,type GrammarRule,type RuleCategory,type RuleTask} from '../lib/grammar-reference';
import type {Level,SkillResult} from '../lib/storage';
import {sayEnglish} from './grammar';

export type RuleBookProps={
 results:Record<string,SkillResult>;favorites:string[];onFavorite:(id:string)=>void;
 onFinish:(rule:GrammarRule,score:number,total:number)=>void;onMistake:(rule:GrammarRule,task:RuleTask)=>void;
 requestedRule?:string|null;onOpenCourse:(level:Level)=>void
};
type Miss={id:string;prompt:string;answer:string;why:string};
const STAGE_NAMES=['Основы','Новые ситуации','Перевод','Порядок слов','Аудирование'];
function stageOf(task:RuleTask,index:number){
 if(index<6)return 0;
 if(task.id.includes('-deep-context-'))return 1;
 if(task.type==='translate')return 2;
 if(task.type==='order')return 3;
 return 4;
}
function taskTitle(task:RuleTask){
 switch(task.type){
 case 'choice':return 'Выбери подходящий ответ';
 case 'fill':return 'Впиши слово или выражение';
 case 'fix':return 'Исправь предложение';
 case 'translate':return 'Переведи самостоятельно';
 case 'order':return 'Собери предложение';
 case 'dictation':return 'Диктант: слушай и записывай';
 }
}
export function GrammarReference({results,favorites,onFavorite,onFinish,onMistake,requestedRule,onOpenCourse}:RuleBookProps){
 const [search,setSearch]=useState('');
 const [level,setLevel]=useState<Level|'all'>('all');
 const [category,setCategory]=useState<RuleCategory|'all'>('all');
 const [onlyFavorites,setOnlyFavorites]=useState(false);
 const [activeId,setActiveId]=useState<string|null>(null);
 const [phase,setPhase]=useState<'theory'|'practice'|'result'>('theory');
 const [step,setStep]=useState(0);
 const [answer,setAnswer]=useState('');
 const [orderSelected,setOrderSelected]=useState<number[]>([]);
 const [graded,setGraded]=useState<boolean|null>(null);
 const [skipped,setSkipped]=useState(false);
 const [hintOpen,setHintOpen]=useState(false);
 const [score,setScore]=useState(0);
 const [wrong,setWrong]=useState<Miss[]>([]);
 const [reviewIds,setReviewIds]=useState<string[]>([]);
 const mainRef=useRef<HTMLDivElement>(null);
 const tasksRef=useRef<HTMLDivElement>(null);
 const resultsCount=GRAMMAR_RULES.filter(r=>results[r.id]&&results[r.id].total>0&&results[r.id].score/results[r.id].total>=.7).length;
 const filtered=useMemo(()=>filterGrammarRules({search,level,category}).filter(r=>!onlyFavorites||favorites.includes(r.id)),[search,level,category,onlyFavorites,favorites]);
 const rule=GRAMMAR_RULES.find(r=>r.id===activeId);
 const tasks=rule?(reviewIds.length?rule.tasks.filter(t=>reviewIds.includes(t.id)):rule.tasks):[];
 const task=tasks[step];
 const isLast=step===tasks.length-1;
 const isRetry=reviewIds.length>0;
 function resetStep(){setStep(0);setAnswer('');setOrderSelected([]);setGraded(null);setSkipped(false);setHintOpen(false);setScore(0);setWrong([]);}
 function openRule(id:string){setActiveId(id);setPhase('theory');setReviewIds([]);resetStep();mainRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}
 function leaveRule(){setActiveId(null);setPhase('theory');setReviewIds([]);resetStep();mainRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}
 useEffect(()=>{if(requestedRule&&GRAMMAR_RULES.some(r=>r.id===requestedRule))openRule(requestedRule);},[requestedRule]);
 useEffect(()=>{if(phase==='practice')tasksRef.current?.scrollIntoView({behavior:'smooth',block:'start'});},[phase,activeId,reviewIds]);
 function startPractice(){setReviewIds([]);resetStep();setPhase('practice');}
 function startMistakeReview(){if(!wrong.length)return;setReviewIds([...new Set(wrong.map(x=>x.id))]);resetStep();setPhase('practice');}
 function selectOrderPart(index:number){
  if(!task||!task.tokens||graded!==null)return;
  const next=[...orderSelected,index];setOrderSelected(next);setAnswer(next.map(j=>task.tokens![j]).join(' '));
 }
 function removeOrderPart(index:number){
  if(!task||!task.tokens||graded!==null)return;
  const next=orderSelected.filter((_,i)=>i!==index);setOrderSelected(next);setAnswer(next.map(j=>task.tokens![j]).join(' '));
 }
 function check(){
  if(!rule||!task||graded!==null||!answer.trim())return;
  const ok=isRuleTaskCorrect(task,answer);setGraded(ok);
  if(ok)setScore(n=>n+1);
  else setWrong(prev=>[...prev,{id:task.id,prompt:task.prompt,answer:task.answer,why:task.why}]);
 }
 function acceptAlternative(){
  if(task?.type!=='translate'||graded!==false)return;
  setWrong(prev=>prev.filter(e=>e.id!==task.id));setGraded(true);setScore(n=>n+1);
 }
 function skipAudio(){if(task?.type!=='dictation'||graded!==null)return;setSkipped(true);setGraded(false);}
 function next(){
  if(!rule||!task||graded===null)return;
  if(!graded&&!skipped)onMistake(rule,task);
  if(isLast){setPhase('result');if(!isRetry)onFinish(rule,score,tasks.length);}
  else{setStep(n=>n+1);setAnswer('');setOrderSelected([]);setGraded(null);setSkipped(false);setHintOpen(false);}
 }
 return <div ref={mainRef} className="space-y-5 scroll-mt-24 max-w-6xl">
 {!rule?<>
  <header className="panel p-5 md:p-8"><span className="tag">A1 → B2 · СПРАВОЧНИК</span><h1 className="text-3xl font-extrabold mt-3">Все основные правила английского</h1><p className="muted mt-3 leading-7 max-w-3xl">Артикли, местоимения, предлоги, похожие глаголы, количество и построение предложений. 18 упражнений на каждое правило, с объяснениями и повторением ошибок.</p>
   <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">{[[RULE_TOTALS.topics,'правил'],[RULE_TOTALS.tasks,'задания'],[resultsCount,'освоено']].map(([n,s])=><div key={s} className="rounded-xl bg-slate-100 dark:bg-slate-700 p-3"><div className="text-xl md:text-2xl font-black">{n}</div><div className="muted text-xs">{s}</div></div>)}</div>
  </header>
  <section className="panel p-4 md:p-5 space-y-4" aria-label="Поиск и фильтры"><label className="font-bold text-sm" htmlFor="rule-search">Найти правило по слову или примеру</label><div className="relative"><Search size={19} className="absolute left-3 top-3.5 text-slate-500"/><input id="rule-search" className="field w-full pl-10" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Например: the, say, предлоги, much, условные…"/></div>
   <div className="flex flex-wrap gap-2 items-center"><span className="muted text-sm font-bold"><Filter size={16} className="inline mr-1"/>Уровень:</span>{(['all','A1','A2','B1','B2'] as const).map(l=><button type="button" key={l} className={level===l?'btn py-2 px-3 text-sm':'btn-soft py-2 px-3 text-sm'} onClick={()=>setLevel(l)} aria-pressed={level===l}>{l==='all'?'Все':l}</button>)}<button type="button" className={onlyFavorites?'btn py-2 px-3 text-sm':'btn-soft py-2 px-3 text-sm'} onClick={()=>setOnlyFavorites(x=>!x)} aria-pressed={onlyFavorites}><Bookmark size={15}/> Избранное</button></div>
   <label htmlFor="rule-category" className="block text-sm font-bold">Раздел справочника</label><select id="rule-category" className="field w-full md:max-w-lg" value={category} onChange={e=>setCategory(e.target.value as RuleCategory|'all')}><option value="all">Все категории</option>{RULE_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select><p className="muted text-xs" role="status">Найдено правил: {filtered.length}</p>
  </section>
  {filtered.length===0?<section className="panel p-8"><h2 className="font-bold">Ничего не найдено</h2><p className="muted mt-2">Попробуй другой запрос или сбрось фильтры.</p><button className="btn mt-4" onClick={()=>{setSearch('');setCategory('all');setLevel('all');setOnlyFavorites(false);}}>Сбросить фильтры</button></section>:
   <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(r=>{const result=results[r.id];const passed=!!result&&result.total>0&&result.score/result.total>=.7;return <article key={r.id} className="level-panel p-5 flex flex-col gap-3"><div className="flex items-center justify-between gap-2"><span className="tag">{r.level} · {r.category}</span><button type="button" aria-label={favorites.includes(r.id)?'Убрать из избранного':'В избранное'} aria-pressed={favorites.includes(r.id)} onClick={()=>onFavorite(r.id)} className="p-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-slate-700"><Bookmark size={19} fill={favorites.includes(r.id)?'currentColor':'none'} className="text-indigo-600 dark:text-indigo-300"/></button></div><h2 className="font-extrabold text-lg leading-7">{r.title}</h2><p className="muted text-sm leading-6 flex-1">{r.brief}</p><p className="muted text-xs">{r.uses.length} сравнений · {r.tasks.length} заданий · {result?`лучший результат ${Math.round(result.score/result.total*100)}%`:'ещё не изучено'}</p><button type="button" className="btn-soft w-full" onClick={()=>openRule(r.id)}>{passed?<CheckCircle2 size={17}/>:<BookOpen size={17}/>} {passed?'Повторить':'Открыть правило'} <ChevronRight size={16}/></button></article>;})}</div>}
 </>:<>
  <div className="flex items-center justify-between flex-wrap gap-2"><button type="button" className="btn-soft" onClick={leaveRule}><ArrowLeft size={17}/> Все правила</button><button type="button" className="btn-soft" onClick={()=>onFavorite(rule.id)}><Bookmark size={17} fill={favorites.includes(rule.id)?'currentColor':'none'}/>{favorites.includes(rule.id)?'В избранном':'Сохранить правило'}</button></div>
  <header className="panel p-6 md:p-8"><span className="tag">{rule.level} · {rule.category}</span><h1 className="text-3xl font-extrabold mt-3">{rule.title}</h1><p className="muted mt-3 leading-7">{rule.brief}</p><div className="flex flex-wrap gap-2 mt-5"><span className="tag">1. Теория</span><span className="tag">2. {rule.tasks.length} упражнений</span><span className="tag">3. Разбор ошибок</span></div></header>
  {phase==='theory'&&<>
   <section className="panel p-6 md:p-8 space-y-4"><h2 className="font-extrabold text-xl">Когда и почему употребляется</h2>{rule.notes.map((line,i)=><p key={i} className="leading-8">{line}</p>)}<div className="overflow-x-auto"><table className="w-full text-sm text-left border-collapse"><thead><tr className="bg-slate-100 dark:bg-slate-700"><th className="p-3">Конструкция</th><th className="p-3">Когда использовать</th><th className="p-3">Пример</th></tr></thead><tbody>{rule.uses.map((u,i)=><tr key={i} className="border-b border-slate-200 dark:border-slate-700"><td className="font-bold p-3">{u.label}</td><td className="p-3">{u.detail}</td><td className="p-3"><button type="button" className="text-indigo-700 dark:text-indigo-300 font-semibold text-left" onClick={()=>sayEnglish(u.example)} title="Озвучить">{u.example} <Volume2 size={15} className="inline"/></button></td></tr>)}</tbody></table></div></section>
   <section className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl">Примеры с переводом</h2><p className="muted text-sm mt-2">Нажми на динамик, чтобы услышать американский вариант произношения, если он доступен в браузере.</p><div className="divide-y divide-slate-200 dark:divide-slate-700 mt-4">{rule.examples.map((e,i)=><div key={i} className="flex gap-3 items-center py-3"><button type="button" className="rounded-xl bg-indigo-50 dark:bg-indigo-950 p-3 text-indigo-700 dark:text-indigo-300" onClick={()=>sayEnglish(e.en)} aria-label={'Озвучить '+e.en}><Volume2 size={18}/></button><div><p className="font-bold">{e.en}</p><p className="muted text-sm mt-1">{e.ru}</p></div></div>)}</div></section>
   <section className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl flex items-center gap-2"><Lightbulb size={20} className="text-amber-500"/>Типичная ошибка</h2><div className="grid md:grid-cols-2 gap-3 mt-4"><div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-4"><p className="font-bold text-rose-700 dark:text-rose-300 text-xs">НЕПРАВИЛЬНО</p><p className="mt-2 font-semibold">{rule.mistake.wrong}</p></div><div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 p-4"><p className="font-bold text-emerald-700 dark:text-emerald-300 text-xs">ПРАВИЛЬНО</p><p className="mt-2 font-semibold">{rule.mistake.right}</p></div></div><p className="muted mt-3 text-sm leading-7">{rule.mistake.why}</p></section>
   <div className="flex flex-wrap gap-3"><button className="btn" onClick={startPractice}>Начать 18 упражнений <ArrowRight size={18}/></button><button className="btn-soft" onClick={()=>onOpenCourse(rule.level)}>Все уроки {rule.level}</button></div>
  </>}
  {phase==='practice'&&task&&<section ref={tasksRef} className="panel p-6 md:p-9 space-y-5 scroll-mt-24" aria-label="Практика правила">
   <div className="flex flex-wrap justify-between gap-3 items-center"><span className="tag">{isRetry?'Повторение ошибок':STAGE_NAMES[stageOf(task,step)]} · {taskTitle(task)}</span><span className="muted text-sm font-bold">{step+1} / {tasks.length} · Верно: {score}</span></div>
   <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{width:`${(step+Number(graded!==null))/tasks.length*100}%`}}/></div>
   <div className="flex flex-wrap gap-2">{STAGE_NAMES.map((name,i)=><span key={name} className={`rounded-full px-2 py-1 text-xs ${i===stageOf(task,step)&&!isRetry?'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-100':'bg-slate-100 dark:bg-slate-700'}`}>{name}</span>)}</div>
   <h2 className="text-xl md:text-2xl font-extrabold leading-9">{task.prompt}</h2>
   {task.options?.includes('—')&&<p className="muted text-sm">Знак «—» означает, что слово или артикль не нужен.</p>}
   {task.type==='dictation'&&<div className="flex gap-3 flex-wrap"><button type="button" className="btn" onClick={()=>sayEnglish(task.answer)}><Headphones size={18}/> Прослушать предложение</button><button className="btn-soft" type="button" onClick={()=>sayEnglish(task.answer)}><RotateCcw size={17}/> Ещё раз</button><p className="muted text-xs w-full">Для звука требуется браузер с поддержкой озвучивания.</p></div>}
   {task.type==='choice'?<div className="grid gap-3">{task.options?.map((opt,i)=><button key={i} type="button" disabled={graded!==null} aria-pressed={answer===opt} className={`study-option ${graded!==null&&isRuleTaskCorrect(task,opt)?'correct':graded!==null&&opt===answer&&!graded?'wrong':answer===opt?'a1-selected':''}`} onClick={()=>setAnswer(opt)}>{String.fromCharCode(65+i)}. {opt}</button>)}</div>:
    task.type==='order'&&task.tokens?<div className="space-y-4"><div className="rounded-xl border-2 border-dashed border-indigo-200 dark:border-slate-600 min-h-20 p-3 flex flex-wrap items-center gap-2" role="group" aria-label="Собранное предложение">{orderSelected.length?orderSelected.map((index,i)=><button key={`${index}-${i}`} type="button" className="btn-soft px-3 py-2 text-sm" onClick={()=>removeOrderPart(i)} disabled={graded!==null} title="Убрать слово">{task.tokens![index]}</button>):<p className="muted text-sm">Нажимай на слова в правильном порядке — предложение появится здесь.</p>}</div><div className="flex flex-wrap gap-2" role="group" aria-label="Слова для сборки">{task.tokens.map((word,i)=><button key={i} type="button" className="btn-soft px-3 py-2 text-sm" disabled={graded!==null||orderSelected.includes(i)} onClick={()=>selectOrderPart(i)}>{word}</button>)}</div><button type="button" className="btn-soft" disabled={graded!==null||orderSelected.length===0} onClick={()=>{setOrderSelected([]);setAnswer('');}}><Delete size={17}/> Очистить собранное</button></div>:
    <><label htmlFor="rule-answer" className="font-semibold text-sm">{task.type==='fill'?'Напиши пропущенное слово или выражение':task.type==='fix'?'Перепиши всё предложение правильно':'Напиши предложение по-английски'}</label><textarea rows={task.type==='fill'?2:3} id="rule-answer" className="field w-full" autoComplete="off" autoCapitalize="off" spellCheck={false} value={answer} disabled={graded!==null} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();check();}}} placeholder="Твой ответ…"/><p className="muted text-xs">Ctrl + Enter — проверить. {task.type==='translate'?'Сравнение с образцом: равнозначные переводы можно засчитать после самопроверки.':'Знаки препинания и регистр не влияют на проверку.'}</p></>}
   <div className="flex gap-2 flex-wrap"><button type="button" className="btn-soft" onClick={()=>setHintOpen(x=>!x)} aria-expanded={hintOpen}><Lightbulb size={17}/> {hintOpen?'Скрыть подсказку':'Подсказка'}</button>{graded===null&&task.type==='dictation'&&<button type="button" className="btn-soft" onClick={skipAudio}>Нет звука — пропустить без записи ошибки</button>}</div>
   {hintOpen&&<div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-4 text-sm leading-7"><b>Подсказка:</b> {task.hint||rule.brief}</div>}
   {graded===null?<button type="button" className="btn" disabled={!answer.trim()} onClick={check}>Проверить ответ <ClipboardCheck size={17}/></button>:
    <div className={`rounded-2xl p-5 ${graded?'bg-emerald-50 dark:bg-emerald-950/30':'bg-rose-50 dark:bg-rose-950/30'}`} role="status"><div className="flex gap-2 items-center font-extrabold">{graded?<CheckCircle2 size={21}/>:<XCircle size={21}/>} {skipped?'Диктант пропущен':graded?'Правильно!':'Разберём ответ'}</div><p className="mt-3"><b>Учебный образец:</b> {task.answer}</p><p className="mt-2 text-sm leading-7">{task.why}</p>
     {task.type==='translate'&&graded===false&&<div className="mt-3 p-3 bg-white/70 dark:bg-slate-900/40 rounded-xl"><p className="text-sm">Твой перевод может отличаться и при этом быть правильным. Сверь значение, порядок слов и грамматику с образцом.</p><button type="button" className="btn-soft mt-3" disabled={answer.trim().split(/\s+/).length<3} onClick={acceptAlternative}><ShieldCheck size={16}/> Мой вариант тоже правильный (самопроверка)</button></div>}
     <button type="button" className="btn mt-4" onClick={next}>{isLast?'Результаты':'Следующий вопрос'} <ArrowRight size={17}/></button>
    </div>}
  </section>}
  {phase==='result'&&<section className="panel p-6 md:p-8 space-y-5"><h2 className="text-2xl font-extrabold">{isRetry?'Повторение ошибок завершено':score>=Math.ceil(tasks.length*.7)?'Правило освоено!':'Закрепим правило ещё раз'}</h2><p className="text-lg">{score} из {tasks.length} · {Math.round(score/tasks.length*100)}%</p><p className="muted">{isRetry?'Повторение не изменяет лучший результат первоначальной тренировки.':'Для зачёта нужно 70%. Прогресс сохраняется в профиле, повторять можно сколько угодно.'}</p>
   {wrong.length>0&&<div className="space-y-3"><h3 className="font-bold">Разбор ошибок</h3>{wrong.map((e,i)=><article className="rounded-xl bg-slate-100 dark:bg-slate-700 p-4" key={`${e.id}-${i}`}><p className="font-bold">{e.prompt}</p><p className="text-emerald-700 dark:text-emerald-300 mt-2">Правильно: {e.answer}</p><p className="muted text-sm mt-2">{e.why}</p></article>)}</div>}
   <div className="flex flex-wrap gap-3">{wrong.length>0&&<button className="btn" onClick={startMistakeReview}><RotateCcw size={17}/> Повторить только ошибки ({wrong.length})</button>}<button className="btn-soft" onClick={startPractice}><RotateCcw size={17}/> Все 18 упражнений</button><button className="btn-soft" onClick={()=>{setPhase('theory');mainRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}}><BookOpen size={17}/> Повторить объяснения</button><button className="btn-soft" onClick={leaveRule}>К справочнику</button></div>
  </section>}
 </>}
 </div>;
}

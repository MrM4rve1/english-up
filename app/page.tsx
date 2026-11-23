'use client';
import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import {AnimatePresence,motion} from 'framer-motion';
import {
 ArrowRight,BarChart3,BookOpen,Bookmark,Brain,BriefcaseBusiness,CheckCircle2,ChevronRight,CalendarDays,
 Clock3,Download,Flame,GraduationCap,House,Languages,Menu,MessageCircle,Moon,
 RotateCcw,Settings,ShieldCheck,Star,Sun,Upload,Volume2,X
} from 'lucide-react';
import {lessons,words,Lesson,Question,Word} from '../lib/content';
import type {GrammarRule,RuleTask} from '../lib/grammar-reference';
import {dayKey,currentStreak,initial,load,nextReview,normalizeProfile,persist,mergeSkillResult,skillPass,Profile,Level} from '../lib/storage';
import {GrammarCourse,LEVELS,sayEnglish} from '../components/grammar';
import {Vocabulary} from '../components/vocabulary';
import {dailyPlan,weakestLesson} from '../lib/daily-plan';
import {TensesPractice} from '../components/tenses-trainer';
import {ErrorReview} from '../components/error-review';
import {makeTenseError,errorKey,dueErrors,masteryOverview,type TenseTask} from '../lib/tenses';
import type {LearningError} from '../lib/storage';
const GrammarReference=dynamic(()=>import('../components/grammar-reference').then(m=>m.GrammarReference),{ssr:false});
const ReadingSkills=dynamic(()=>import('../components/skills').then(m=>m.ReadingSkills),{ssr:false});
const ListeningSkills=dynamic(()=>import('../components/skills').then(m=>m.ListeningSkills),{ssr:false});
import type {ReadingUnit} from '../lib/skills-content';
import {SKILL_COUNTS} from '../lib/skill-counts';
import {PWAControls} from '../components/pwa-controls';
const LearningCalendar=dynamic(()=>import('../components/learning-insights').then(m=>m.LearningCalendar),{ssr:false});
const LearningInsights=dynamic(()=>import('../components/learning-insights').then(m=>m.LearningInsights),{ssr:false});
const DialoguePractice=dynamic(()=>import('../components/dialogue-practice').then(m=>m.DialoguePractice),{ssr:false});
import {dialogues} from '../lib/dialogues';
import {LifeWorkCourse} from '../components/life-work-course';
import {AssessmentCenter} from '../components/assessment';
import {achievements} from '../lib/achievements';
import type {AssessmentResult} from '../lib/assessments';
import {americanUnits,workUnits,type ScenarioUnit,type Phrase,type UnitQuestion} from '../lib/life-work-content';

type Tab='home'|'grammar'|'reference'|'words'|'reading'|'listening'|'tenses'|'work'|'america'|'stats'|'calendar'|'errors'|'settings'|'dialogues'|'assessment';
const menus=[
 {id:'home' as Tab,title:'Главная',Icon:House},
 {id:'grammar' as Tab,title:'Грамматика',Icon:BookOpen},
 {id:'reference' as Tab,title:'Справочник правил',Icon:Bookmark},
 {id:'assessment' as Tab,title:'Проверка уровня',Icon:GraduationCap},
 {id:'words' as Tab,title:'Новые слова',Icon:Languages},
 {id:'reading' as Tab,title:'Чтение',Icon:BookOpen},
 {id:'listening' as Tab,title:'Аудирование',Icon:Volume2},
 {id:'tenses' as Tab,title:'Тренажёр времён',Icon:Clock3},
 {id:'america' as Tab,title:'Для жизни в США',Icon:House},
 {id:'work' as Tab,title:'Для работы',Icon:BriefcaseBusiness},
 {id:'errors' as Tab,title:'Мои ошибки',Icon:RotateCcw},
 {id:'stats' as Tab,title:'Мой прогресс',Icon:BarChart3},
 {id:'calendar' as Tab,title:'Календарь',Icon:CalendarDays},
 {id:'dialogues' as Tab,title:'Диалоги',Icon:MessageCircle},
 {id:'settings' as Tab,title:'Настройки',Icon:Settings},
];
const support=[
 {client:"My payment hasn't arrived yet. Can you check it?",answer:'Thank you for contacting us. Could you please provide your transaction ID so I can check the payment status?',explain:'Сначала уточни идентификатор транзакции и не обещай результат, который ещё не проверен.'},
 {client:'I want a refund. The order was canceled.',answer:'I understand. Could you please share your order number so I can look into your refund request?',explain:'Прояви понимание и попроси номер заказа. Не обещай возврат без проверки.'},
 {client:'Why is my transaction still pending?',answer:'I understand your concern. Let me check the transaction status. Could you provide the transaction ID?',explain:'Уточни transaction ID и сначала проверь статус, прежде чем называть причину задержки.'},
 {client:'I accidentally sent the wrong amount. Can you help?',answer:'Thanks for letting us know. Please share the transaction ID and the amount sent, so we can review the details.',explain:'Уточни сумму и идентификатор, не проси секретные пароли или коды.'},
 {client:'I still cannot access my account after resetting my password.',answer:'I’m sorry you’re having trouble. Could you tell me what error message you see when you try to sign in?',explain:'Задай уточняющий вопрос о сообщении об ошибке, не запрашивая пароль.'},
];

export default function Page(){
 const [profile,setProfile]=useState<Profile>(initial);
 const [ready,setReady]=useState(false);
 const [tab,setTab]=useState<Tab>('home');
 const [dialogueLaunch,setDialogueLaunch]=useState<{token:number;kind:'america'|'work';level:Level;title:string}|null>(null);
 const [mobile,setMobile]=useState(false);
 const [selectedLesson,setSelectedLesson]=useState<Lesson|null>(null);
 const [requestedRule,setRequestedRule]=useState<string|null>(null);
 const [focusLevel,setFocusLevel]=useState<Level|null>(null);
 const importRef=useRef<HTMLInputElement|null>(null);
 const [notice,setNotice]=useState('');
 const [storageWarning,setStorageWarning]=useState(false);
 const latestProfile=useRef(profile);
 useEffect(()=>{setProfile(load());setReady(true);},[]);
 // Debounce large dictionary saves so the interface stays responsive.
 useEffect(()=>{latestProfile.current=profile;if(!ready)return;
  const timer=setTimeout(()=>{try{persist(profile);setStorageWarning(false);}catch{setStorageWarning(true);}},350);
  return ()=>clearTimeout(timer);
 },[profile,ready]);
 useEffect(()=>{if(!ready)return;const flush=()=>{try{if(latestProfile.current)persist(latestProfile.current);}catch{setStorageWarning(true);}};
  window.addEventListener('pagehide',flush);return ()=>window.removeEventListener('pagehide',flush);
 },[ready]);
 useEffect(()=>{document.documentElement.classList.toggle('dark',profile.dark);return()=>document.documentElement.classList.remove('dark');},[profile.dark]);
 
 const update=(change:Partial<Profile>)=>setProfile(p=>({...p,...change}));
 const award=(xp:number)=>setProfile(p=>({...p,xp:p.xp+xp,activity:{...p.activity,[dayKey()]:(p.activity[dayKey()]||0)+xp}}));
 const learned=Object.keys(profile.reviews).length;
 const earnedAchievements=achievements(profile);
 const due=[...words,...profile.customWords,...profile.externalWords].filter(w=>profile.reviews[w.id]&&profile.reviews[w.id].due<=Date.now()).length;
 const today=dayKey();
 const plan=dailyPlan(profile,due);
 const finishedToday=profile.dailyDone[today]||[];
 const weakLesson=lessons.find(l=>l.id===weakestLesson(profile));
 function toggleTask(id:string){setProfile(p=>{const done=p.dailyDone[dayKey()]||[];return {...p,dailyDone:{...p.dailyDone,[dayKey()]:done.includes(id)?done.filter(x=>x!==id):[...done,id]}};});}
 function openTask(task:{id:string;tab:string}){if(task.id==='grammar'&&weakLesson){chooseLesson(weakLesson);}else navigate(task.tab as Tab);}
 const streak=currentStreak(profile.activity);
 const done=lessons.filter(l=>profile.completed[l.id]).length;
 const groups=LEVELS.map(level=>({level,total:lessons.filter(l=>l.level===level).length,done:lessons.filter(l=>l.level===level&&profile.completed[l.id]).length}));
 const nextLesson=lessons.find(l=>!profile.completed[l.id]&&l.level===profile.level)||lessons.find(l=>!profile.completed[l.id])||lessons[0];
 function startScenarioDialogue(unit:ScenarioUnit){setDialogueLaunch({token:Date.now(),kind:unit.category,level:unit.level,title:unit.title});navigate('dialogues');}
 function navigate(next:Tab,level:Level|null=null){if(next!=='reference')setRequestedRule(null);setTab(next);setMobile(false);setSelectedLesson(null);setFocusLevel(level);window.scrollTo?.({top:0,behavior:'smooth'});}
 function chooseLesson(lesson:Lesson){setTab('grammar');setSelectedLesson(lesson);setMobile(false);window.scrollTo?.({top:0,behavior:'smooth'});}
 function logAnswer(lesson:Lesson,question:Question,correct:boolean){
  if(correct)award(10);
  else setProfile(p=>{const now=Date.now();const error:LearningError={source:'grammar',lesson:lesson.title,lessonId:lesson.id,question:question.q,why:question.why,correctAnswer:question.choices[question.answer],date:now};const key=errorKey(error);return {...p,errors:[error,...p.errors].slice(0,200),errorReviews:{...p.errorReviews,[key]:{due:now,interval:0,ease:2.5,reps:0,last:now}}};});
 }
 function finishLesson(lesson:Lesson,correct:number,total:number){
  if(correct>=Math.ceil(total*.7))setProfile(p=>({...p,completed:{...p.completed,[lesson.id]:Date.now()}}));
 }
 function recordTense(task:TenseTask,correct:boolean){
  setProfile(p=>{const now=Date.now();const previous=p.tenseStats[task.tenseId]||{attempts:0,correct:0,lastAt:0};const gain=correct&&!p.tenseAwarded[task.id]?5:0;const mistake=makeTenseError(task,now);const key=errorKey(mistake);
   return {...p,tenseStats:{...p.tenseStats,[task.tenseId]:{attempts:previous.attempts+1,correct:previous.correct+Number(correct),lastAt:now}},
    tenseReviews:{...p.tenseReviews,[task.tenseId]:nextReview(p.tenseReviews[task.tenseId],correct?2:0,now)},
    tenseAwarded:gain?{...p.tenseAwarded,[task.id]:now}:p.tenseAwarded,
    errors:correct?p.errors:[mistake,...p.errors].slice(0,200),
    errorReviews:correct?p.errorReviews:{...p.errorReviews,[key]:{due:now,interval:0,ease:2.5,reps:0,last:now}},
    xp:p.xp+gain,activity:gain?{...p.activity,[dayKey()]:(p.activity[dayKey()]||0)+gain}:p.activity};
  });
 }
 function saveTenseSession(key:string,score:number,total:number){setProfile(p=>({...p,tenseSessions:{...p.tenseSessions,[key]:mergeSkillResult(p.tenseSessions[key],score,total)}}));}
 function saveRuleResult(rule:GrammarRule,score:number,total:number){setProfile(p=>{
  const old=p.ruleResults[rule.id];const isFirstPass=score>=Math.ceil(total*.7)&&(!old||old.score<Math.ceil(old.total*.7));const gain=isFirstPass?15:0;
  return {...p,ruleResults:{...p.ruleResults,[rule.id]:mergeSkillResult(old,score,total)},xp:p.xp+gain,activity:gain?{...p.activity,[dayKey()]:(p.activity[dayKey()]||0)+gain}:p.activity};
 });}
 function toggleRuleFavorite(id:string){setProfile(p=>({...p,ruleFavorites:p.ruleFavorites.includes(id)?p.ruleFavorites.filter(x=>x!==id):[...p.ruleFavorites,id]}));}
 function recordRuleMistake(rule:GrammarRule,task:RuleTask){setProfile(p=>{const now=Date.now();const error:LearningError={id:'reference:'+task.id,source:'reference',topic:rule.category,lesson:rule.title,lessonId:rule.id,question:task.prompt,why:task.why,correctAnswer:task.answer,date:now};const key=errorKey(error);return {...p,errors:[error,...p.errors].slice(0,200),errorReviews:{...p.errorReviews,[key]:{due:now,interval:0,ease:2.5,reps:0,last:now}}};});}
 function gradeError(error:LearningError,correct:boolean){const key=errorKey(error);setProfile(p=>({...p,errorReviews:{...p.errorReviews,[key]:nextReview(p.errorReviews[key],correct?2:0)}}));}
 function openErrorLesson(error:LearningError){if(error.source==='reference'){setRequestedRule(error.lessonId||null);navigate('reference');return;}if(error.source==='america'||error.source==='work'){navigate(error.source);return;}const lesson=lessons.find(l=>l.id===error.lessonId)||lessons.find(l=>l.title===error.lesson);if(lesson)chooseLesson(lesson);else navigate('grammar');}
 function gradeWord(word:Word,grade:0|1|2|3){
  setProfile(p=>({...p,reviews:{...p.reviews,[word.id]:nextReview(p.reviews[word.id],grade)},...(grade>0?{xp:p.xp+5,activity:{...p.activity,[dayKey()]:(p.activity[dayKey()]||0)+5}}:{})}));
 }
 function saveAssessment(result:AssessmentResult){setProfile(p=>({...p,assessments:{...p.assessments,[result.id]:result}}));}
 function saveAssessmentDraft(id:string,value:string){setProfile(p=>({...p,assessmentDrafts:{...p.assessmentDrafts,[id]:value}}));}
 function saveSkill(id:string,score:number,total:number){
  setProfile(p=>{
   const previous=p.skillResults[id];const passedBefore=previous?skillPass(previous.score,previous.total):false;
   const passedNow=skillPass(score,total);const gain=passedNow&&!passedBefore?20:0;
   return {...p,skillResults:{...p.skillResults,[id]:mergeSkillResult(previous,score,total)},
    ...(gain?{xp:p.xp+gain,activity:{...p.activity,[dayKey()]:(p.activity[dayKey()]||0)+gain}}:{})};
  });
 }
 function savePhrase(unit:ScenarioUnit,phrase:Phrase,index:number){
  const id=`custom:${unit.category}:${unit.id}-${index}`;
  setProfile(p=>{
   if(p.savedWords.includes(id))return p;
   const word:Word={id,en:phrase.en,ru:phrase.ru,level:unit.level,topic:unit.category==='america'?'English for America':'English for Work',example:unit.dialogue.find(d=>d.en.includes(phrase.en))?.en||unit.practice.model,translation:phrase.tip};
   return {...p,savedWords:[...p.savedWords,id],customWords:[...p.customWords,word]};
  });
 }
 function saveScenarioMistakes(unit:ScenarioUnit,missed:{index:number;question:UnitQuestion}[]){
  if(!missed.length)return;
  setProfile(p=>{
   const now=Date.now();
   const errors:LearningError[]=missed.map(({index,question})=>({id:`${unit.category}:${unit.id}:${index}`,source:unit.category,lesson:unit.title,lessonId:unit.id,question:question.q,correctAnswer:question.choices[question.answer],why:question.why,date:now}));
   const reviews={...p.errorReviews};for(const e of errors){const key=errorKey(e);if(!reviews[key]||reviews[key].reps===0)reviews[key]={due:now,interval:0,ease:2.5,reps:0,last:now};}
   return {...p,errors:[...errors,...p.errors].slice(0,200),errorReviews:reviews};
  });
 }
 function saveGlossaryWord(en:string,ru:string,unit:ReadingUnit){
  const existing=words.find(w=>w.en.toLowerCase()===en.toLowerCase());
  const candidateId=existing?.id||'custom:reading:'+en.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  const sample=unit.passage.split(/(?<=[.!?])\s+/).find(part=>part.toLowerCase().includes(en.toLowerCase()))||unit.passage.split('.')[0]+'.';
  setProfile(p=>{
   if(p.savedWords.includes(candidateId))return p;
   const customWord:Word={id:candidateId,en,ru,level:unit.level,topic:'Чтение',example:sample,translation:'Полный перевод предложения доступен в исходном тексте.'};
   return {...p,savedWords:[...p.savedWords,candidateId],customWords:existing||p.customWords.some(w=>w.id===candidateId)?p.customWords:[...p.customWords,customWord]};
  });
 }
 function exportData(){
  const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='english-up-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 async function importData(file:File|undefined){if(!file)return;try{
  const text=await file.text();const raw=JSON.parse(text);
  if(!raw||typeof raw!=='object'||!('xp'in raw||'completed'in raw||'reviews'in raw))throw new Error('Некорректный формат файла');
  const next=normalizeProfile(raw);if(!window.confirm('Заменить текущий прогресс данными из файла?'))return;
  setProfile(next);setNotice('Прогресс восстановлен из файла.');
 }catch{setNotice('Не удалось импортировать файл. Проверь, что это экспорт English Up в формате JSON.');}
 finally{if(importRef.current)importRef.current.value='';}}
 if(!ready)return <div className="min-h-screen grid place-items-center font-bold">Загрузка English Up…</div>;
 return <div className="min-h-screen md:flex">
  <aside className={`side-nav w-[266px] shrink-0 md:min-h-screen p-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto ${mobile?'fixed inset-y-0 left-0 z-50 shadow-2xl':'hidden md:block'}`}>
   <div className="flex items-center justify-between mb-7"><button className="font-black text-2xl tracking-tight text-indigo-600 dark:text-indigo-300" onClick={()=>navigate('home')}>✦ English <span className="text-slate-900 dark:text-white">Up</span></button><button className="md:hidden text-slate-700 dark:text-white" onClick={()=>setMobile(false)} aria-label="Закрыть меню"><X/></button></div>
   <div className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 px-3">Моя школа</div>
   <nav className="space-y-1" aria-label="Главное меню">{menus.map(({id,title,Icon})=><button key={id} className={`nav-item ${tab===id?'active':''}`} onClick={()=>navigate(id)} aria-current={tab===id?'page':undefined}><Icon size={19}/><span>{title}</span></button>)}</nav>
   <div className="mt-7 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-3 px-3">Уровни грамматики</div>
   <div className="grid grid-cols-2 gap-2 px-1">{LEVELS.map(level=><button key={level} className={`level-side rounded-xl py-2.5 px-3 text-sm font-extrabold ${tab==='grammar'&&focusLevel===level?'selected':''}`} onClick={()=>navigate('grammar',level)}>{level} <ChevronRight size={14} className="inline ml-1"/></button>)}</div>
   <div className="mt-8 rounded-2xl bg-indigo-50 dark:bg-[#283755] p-4 border border-indigo-100 dark:border-[#44577c]"><div className="flex gap-2 items-center font-extrabold"><Flame size={20} className="text-orange-500"/>{streak} дней подряд</div><p className="muted text-xs mt-2 leading-5">Каждый небольшой шаг приближает к B2. Главное — продолжать.</p></div>
  </aside>
  {mobile&&<button className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={()=>setMobile(false)} aria-label="Закрыть боковое меню"/>}
  <main className="min-w-0 flex-1">
  {storageWarning&&<div className="m-4 rounded-xl border border-rose-400 bg-rose-50 text-rose-900 p-4 text-sm" role="alert"><b>Браузер не смог сохранить прогресс.</b> Возможно, закончилось место в localStorage. Экспортируй резервную копию через настройки, отключи большую базу или освободи место в браузере.</div>}
   <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#1c2741]/95 backdrop-blur px-4 md:px-9 py-4 flex items-center justify-between gap-2"><div className="flex items-center gap-3"><button className="md:hidden p-2" onClick={()=>setMobile(true)} aria-label="Открыть меню"><Menu size={23}/></button><span className="font-bold">{menus.find(m=>m.id===tab)?.title}</span></div><div className="flex items-center gap-2 md:gap-4"><span className="tag">{profile.level}</span><span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm">★ {profile.xp} XP</span><button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" onClick={()=>update({dark:!profile.dark})} aria-label="Сменить тему">{profile.dark?<Sun size={21}/>:<Moon size={21}/>}</button></div></header>
   <AnimatePresence mode="wait"><motion.div key={tab+(selectedLesson?.id||'')} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.14}} className="max-w-[1170px] mx-auto p-5 md:p-9 space-y-7">
    {tab==='home'&&<>
     <section className="rounded-3xl bg-gradient-to-r from-[#4338ca] via-[#4f46e5] to-[#7757dc] p-7 md:p-10 text-white overflow-hidden relative"><div className="relative z-10 max-w-2xl"><div className="text-indigo-100 font-semibold">ПЕРСОНАЛЬНЫЙ УЧЕБНЫЙ КАБИНЕТ</div><h1 className="text-3xl md:text-4xl font-black mt-4">Английский, который пригодится каждый день.</h1><p className="text-indigo-100 mt-4 mb-6 leading-7">От базовых правил до уверенного общения. Начни с темы своего уровня и закрепи знания практикой.</p><button className="bg-white text-indigo-800 font-extrabold rounded-xl px-5 py-3 hover:bg-indigo-50" onClick={()=>chooseLesson(nextLesson)}>Продолжить: {nextLesson.title} <ArrowRight size={17} className="inline ml-2"/></button></div><span className="absolute right-6 bottom-0 text-[140px] font-black text-white/10 select-none">Aa</span></section>
     <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">{[[<Languages key="l"/>,learned,'Слов в повторении'],[<BookOpen key="b"/>,done,'Завершено уроков'],[<Clock3 key="c"/>,due,'Слов на повторение'],[<Star key="s"/>,profile.xp,'Получено XP']].map(([Icon,value,label],i)=><div className="panel p-5" key={i}><div className="text-indigo-600 dark:text-indigo-300 mb-4">{Icon}</div><div className="text-3xl font-black">{value}</div><div className="muted text-sm mt-2">{label}</div></div>)}</div>
     <button className="panel w-full p-4 text-left flex items-center justify-between gap-3 hover:border-indigo-500" onClick={()=>navigate('calendar')}><span><CalendarDays size={18} className="inline mr-2 text-indigo-600 dark:text-indigo-300"/><b>Учебный календарь</b><span className="muted text-sm block mt-1">Отметки занятий, ежедневный план и история XP</span></span><ArrowRight size={18}/></button>
     {dueErrors(profile.errors,profile.errorReviews).length>0&&<button className="w-full panel p-4 text-left flex flex-wrap items-center justify-between gap-3 hover:border-indigo-500" onClick={()=>navigate('errors')}><span className="font-bold"><RotateCcw size={17} className="inline mr-2 text-indigo-600 dark:text-indigo-300"/>Ошибки для повторения: {dueErrors(profile.errors,profile.errorReviews).length}</span><span className="text-indigo-700 dark:text-indigo-300 font-semibold">Начать повторение →</span></button>}
     <button className="panel p-4 w-full text-left flex justify-between items-center gap-3 hover:border-indigo-400" onClick={()=>navigate('reference')}><span><b>📚 Справочник английских правил</b><span className="muted text-sm block mt-1">Артикли, местоимения, предлоги, похожие слова · поиск и практика</span></span><ArrowRight size={20}/></button>
     <button className="panel p-4 w-full text-left flex justify-between items-center gap-3 hover:border-indigo-400" onClick={()=>navigate('assessment')}><span><b>🎯 Проверь свой уровень</b><span className="muted text-sm block mt-1">Диагностика A1–B2, пробный экзамен и разбор результатов</span></span><ArrowRight size={20}/></button>
     <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-5"><section className="panel p-6"><div className="flex items-center justify-between"><h2 className="font-extrabold text-xl">План на сегодня</h2><span className="tag">{profile.dailyMinutes} минут</span></div><p className="muted text-sm mt-2 mb-4">План рекомендуемых занятий на {profile.dailyMinutes} минут. Дела отмечаются вручную, чтобы ты мог выбрать комфортный темп.</p><div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-3"><div className="h-full bg-emerald-500" style={{width:`${plan.length?finishedToday.filter(id=>plan.some(p=>p.id===id)).length/plan.length*100:0}%`}}/></div><p className="muted text-xs mb-2">Отмечено {finishedToday.filter(id=>plan.some(p=>p.id===id)).length} из {plan.length}</p>{plan.map((item,i)=><div key={item.id} className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"><label className="flex items-center gap-2 cursor-pointer" title="Отметить как выполненное"><input type="checkbox" checked={finishedToday.includes(item.id)} onChange={()=>toggleTask(item.id)} aria-label={'Отметить '+item.title}/></label><button className="flex items-center gap-3 flex-1 text-left" onClick={()=>openTask(item)}><span className="w-10 h-10 grid place-items-center rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-black shrink-0">{i+1}</span><span className="flex-1"><b className="block">{item.title}</b><span className="muted text-sm">{item.description} · {item.minutes} мин.</span></span><ArrowRight className="text-indigo-500 shrink-0" size={18}/></button></div>)}</section>
      <section className="panel p-6"><h2 className="font-extrabold text-xl">Прогресс по уровням</h2><p className="muted text-sm mt-2 mb-5">Открой уровень, чтобы увидеть его уроки.</p><div className="space-y-5">{groups.map(g=><button key={g.level} className="w-full text-left" onClick={()=>navigate('grammar',g.level)}><div className="flex justify-between text-sm font-bold mb-2"><span>{g.level}</span><span className="muted">{g.done} / {g.total}</span></div><div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full rounded-full bg-indigo-500" style={{width:`${g.total?g.done/g.total*100:0}%`}}/></div></button>)}</div><p className="muted text-xs mt-7">Показатели рассчитаны только по реальным результатам уроков. Это не официальная оценка CEFR.</p></section></div>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
       {([['america','English for America',americanUnits,'Диалоги для жизни в США'],['work','English for Work',workUnits,'Customer Support · FinTech · Payment Support']] as const).map(([id,title,units,description])=>{const mastered=units.filter(u=>{const record=profile.skillResults[`${id}:${u.id}`];return record&&skillPass(record.score,record.total);}).length;return <button key={id} className="panel p-5 text-left hover:border-indigo-400 transition-colors" onClick={()=>navigate(id)}><div className="flex items-center gap-2"><BriefcaseBusiness size={21} className="text-indigo-600 dark:text-indigo-300"/><b className="text-lg">{title}</b></div><p className="muted text-sm mt-2">{description}</p><p className="text-sm font-semibold mt-3">{mastered} из {units.length} уроков пройдено</p><div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-3"><div className="h-full bg-indigo-500" style={{width:`${mastered/units.length*100}%`}}/></div></button>;})}
      </div>
    </>}
    {tab==='calendar'&&<LearningCalendar profile={profile}/>}
    {tab==='assessment'&&<AssessmentCenter results={profile.assessments} onResult={saveAssessment} onOpenDialogue={()=>navigate('dialogues')} onChooseLevel={level=>{update({level});navigate('grammar',level);}}/>}
    {tab==='reference'&&<GrammarReference results={profile.ruleResults} favorites={profile.ruleFavorites} onFavorite={toggleRuleFavorite} onFinish={saveRuleResult} onMistake={recordRuleMistake} requestedRule={requestedRule} onOpenCourse={level=>navigate('grammar',level)}/>}
    {tab==='grammar'&&<GrammarCourse onOpenReference={()=>navigate('reference')} lessons={lessons} currentLevel={profile.level} focusLevel={focusLevel} completed={profile.completed} selected={selectedLesson} onSelect={chooseLesson} onBack={()=>setSelectedLesson(null)} onAnswer={logAnswer} onFinish={finishLesson}/>}
    {tab==='words'&&<Vocabulary profile={profile} onChange={update} onGrade={gradeWord}/>}
    {tab==='reading'&&<ReadingSkills level={profile.level} results={profile.skillResults} onComplete={saveSkill} onSaveWord={saveGlossaryWord}/>}
    {tab==='listening'&&<ListeningSkills level={profile.level} results={profile.skillResults} onComplete={saveSkill} practice={profile.listeningPractice} onPractice={(id,accuracy)=>setProfile(p=>{const prev=p.listeningPractice[id];return {...p,listeningPractice:{...p.listeningPractice,[id]:{attempts:(prev?.attempts||0)+1,best:Math.max(prev?.best||0,accuracy),at:Date.now()}}};})}/>}
        {tab==='tenses'&&<TensesPractice level={profile.level} stats={profile.tenseStats} reviews={profile.tenseReviews} onAnswer={recordTense} onFinish={saveTenseSession} onOpenErrors={()=>navigate('errors')}/>}
         {tab==='america'&&<LifeWorkCourse kind="america" level={profile.level} results={profile.skillResults} savedWords={profile.savedWords} onComplete={saveSkill} onSavePhrase={savePhrase} onMistakes={saveScenarioMistakes} onStartDialogue={startScenarioDialogue}/>}
     {tab==='work'&&<LifeWorkCourse kind="work" level={profile.level} results={profile.skillResults} savedWords={profile.savedWords} onComplete={saveSkill} onSavePhrase={savePhrase} onMistakes={saveScenarioMistakes} onStartDialogue={startScenarioDialogue} legacyCases={support}/>}
{tab==='errors'&&<ErrorReview errors={profile.errors} reviews={profile.errorReviews} onGrade={gradeError} onLesson={openErrorLesson} onTenses={()=>navigate('tenses')}/>}
    {tab==='stats'&&<><div><span className="tag">СТАТИСТИКА</span><h1 className="text-3xl font-extrabold mt-3">Мой прогресс</h1><p className="muted mt-2">Только реальные результаты на этом устройстве. Чтение, аудирование и диалоги сохраняются в профиле.</p></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[['Опыт',profile.xp+' XP'],['Дней подряд',streak],['Изучалось слов',learned],['Завершено тем',done]].map(([name,value])=><div className="panel p-6" key={name}><p className="text-3xl font-black">{value}</p><p className="muted text-sm mt-3">{name}</p></div>)}</div><div className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl mb-5">Активность за 7 дней</h2><div className="h-48 flex items-end gap-3">{Array.from({length:7},(_,i)=>{const date=new Date();date.setDate(date.getDate()-6+i);const xp=profile.activity[dayKey(date)]||0;const max=Math.max(100,...Object.values(profile.activity).slice(-30));return <div className="flex-1 flex flex-col items-center justify-end h-full" key={i}><span className="muted text-xs mb-2">{xp}</span><div className="w-full rounded-t-xl bg-indigo-500" style={{height:`${Math.max(2,xp/max*145)}px`,maxWidth:'64px'}}/><span className="muted text-xs mt-3">{date.toLocaleDateString('ru',{weekday:'short'})}</span></div>;})}</div></div><div className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl">Грамматика A1–B2</h2><div className="grid sm:grid-cols-2 gap-5 mt-5">{groups.map(g=><button key={g.level} className="level-panel p-4 text-left" onClick={()=>navigate('grammar',g.level)}><b className="text-xl">{g.level}</b><p className="muted text-sm mt-1">{g.done} из {g.total} завершено</p><div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mt-3"><div className="bg-indigo-500 h-full" style={{width:`${g.total?g.done/g.total*100:0}%`}}/></div></button>)}</div></div></>}
         {tab==='stats'&&<section className="panel p-6 md:p-8"><div className="flex flex-wrap justify-between items-center gap-3"><div><h2 className="font-extrabold text-xl">Справочник правил</h2><p className="muted text-sm mt-2">Засчитаны только темы с результатом от 70% на этом устройстве.</p></div><button className="btn-soft" onClick={()=>navigate('reference')}>Открыть справочник <ArrowRight size={16}/></button></div><div className="grid sm:grid-cols-3 gap-3 mt-4"><div className="level-panel p-4"><b className="text-2xl">{Object.keys(profile.ruleResults).length}</b><p className="muted text-sm mt-1">тем с попытками</p></div><div className="level-panel p-4"><b className="text-2xl">{Object.values(profile.ruleResults).filter(r=>skillPass(r.score,r.total)).length} / 49</b><p className="muted text-sm mt-1">освоено правил</p></div><div className="level-panel p-4"><b className="text-2xl">{profile.ruleFavorites.length}</b><p className="muted text-sm mt-1">избранных правил</p></div></div></section>}
    {tab==='stats'&&<section className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl mb-4">Английский для жизни и работы</h2><div className="grid sm:grid-cols-2 gap-4">{([['america','Для жизни в США',americanUnits],['work','Для работы',workUnits]] as const).map(([key,title,units])=>{const done=units.filter(u=>{const r=profile.skillResults[`${key}:${u.id}`];return r&&skillPass(r.score,r.total);}).length;return <button key={key} className="level-panel text-left p-4" onClick={()=>navigate(key)}><b className="text-lg">{title}</b><p className="muted mt-2">{done} из {units.length} тем пройдено</p><div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden"><div className="h-full bg-indigo-500" style={{width:`${done/units.length*100}%`}}/></div></button>;})}</div></section>}
{tab==='stats'&&<div className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl mb-4">Практика навыков</h2><div className="grid sm:grid-cols-3 gap-4">{([['reading','Чтение',SKILL_COUNTS.reading],['listening','Аудирование',SKILL_COUNTS.listening],['dialogue','Диалоги',dialogues.length]] as const).map(([key,name,total])=>{const completed=Object.entries(profile.skillResults).filter(([id,result])=>id.startsWith(key+':')&&skillPass(result.score,result.total)).length;return <button key={key} className="level-panel text-left p-4" onClick={()=>navigate(key==='dialogue'?'dialogues':key)}><b className="text-lg">{name}</b><p className="muted mt-2">{completed} из {total} завершено</p><div className="h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-600 mt-3"><div className="h-full bg-indigo-500" style={{width:`${completed/total*100}%`}}/></div></button>})}</div></div>}
    {tab==='stats'&&<section className="panel p-6 md:p-8"><div className="flex flex-wrap justify-between items-center gap-3"><div><h2 className="font-extrabold text-xl">Аудирование: диктанты</h2><p className="muted text-sm mt-1">Совпадение слов с образцом — не оценка акцента или уровня CEFR.</p></div><button className="btn-soft" onClick={()=>navigate('listening')}>Тренироваться</button></div><div className="grid grid-cols-2 gap-3 mt-4"><div className="level-panel p-4"><p className="font-black text-2xl">{Object.values(profile.listeningPractice).reduce((n,item)=>n+item.attempts,0)}</p><p className="muted text-sm mt-1">проверенных диктантов</p></div><div className="level-panel p-4"><p className="font-black text-2xl">{Object.keys(profile.listeningPractice).length}</p><p className="muted text-sm mt-1">диалогов в тренировке</p></div></div></section>}
    {tab==='stats'&&<section className="panel p-6 md:p-8"><h2 className="font-extrabold text-xl">Разговорная практика</h2><p className="muted text-sm mt-2">Только пройденные диалоги с проверяемыми вариантами ответов. Без платного ИИ.</p><p className="text-2xl font-black mt-4">{Object.keys(profile.skillResults).filter(k=>k.startsWith('dialogue:')).length} / {dialogues.length}</p><button className="btn-soft mt-4" onClick={()=>navigate('dialogues')}>Открыть диалоги</button></section>}
    {tab==='stats'&&<section className="panel p-6 md:p-8"><div className="flex gap-3 justify-between items-center"><h2 className="font-extrabold text-xl">Освоение 12 времён</h2><button className="btn-soft" onClick={()=>navigate('tenses')}>Тренироваться <ArrowRight size={16}/></button></div><p className="muted text-sm mt-2">Доля правильных ответов по каждому времени — не официальная оценка уровня.</p><div className="grid sm:grid-cols-2 gap-3 mt-5">{masteryOverview(profile.tenseStats,profile.tenseReviews).map(t=><div className="level-panel p-4" key={t.id}><div className="flex justify-between gap-3 text-sm"><b>{t.name}</b><span className="font-bold">{t.percent===null?'Нет ответов':t.percent+'%'}</span></div><p className="muted text-xs mt-1">{t.attempts} ответов{t.due?' · пора повторить':''}</p><div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden"><div className="h-full bg-indigo-500" style={{width:`${t.percent||0}%`}}/></div></div>)}</div></section>}
    {tab==='stats'&&<section className="panel p-6 md:p-8"><div className="flex justify-between items-center gap-3"><div><h2 className="text-xl font-extrabold">Достижения</h2><p className="muted text-sm mt-1">{earnedAchievements.filter(a=>a.achieved).length} из {earnedAchievements.length} получено</p></div><button className="btn-soft" onClick={()=>navigate('assessment')}>Проверить уровень</button></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">{earnedAchievements.map(a=><div key={a.id} className={`rounded-xl p-4 border ${a.achieved?'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30':'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40 opacity-75'}`}><div className="text-2xl">{a.icon}</div><b className="block mt-2">{a.name}</b><p className="muted text-xs mt-1">{a.description}</p><span className="text-xs font-bold mt-2 block">{a.achieved?'✓ Получено':'Ещё не открыто'}</span></div>)}</div></section>}
    {tab==='stats'&&<LearningInsights profile={profile} onCalendar={()=>navigate('calendar')}/>}
    {tab==='dialogues'&&<DialoguePractice level={profile.level} results={profile.skillResults} onComplete={saveSkill} launch={dialogueLaunch}/>}
    {tab==='settings'&&<><div><span className="tag">ТВОИ ПРЕДПОЧТЕНИЯ</span><h1 className="text-3xl font-extrabold mt-3">Настройки обучения</h1><p className="muted mt-2">Все изменения сохраняются в браузере автоматически.</p></div><section className="panel p-6 md:p-8 max-w-2xl space-y-6"><label className="block"><span className="block font-bold mb-2">Текущий уровень</span><select className="field w-full" value={profile.level} onChange={e=>update({level:e.target.value as Level})}>{LEVELS.map(l=><option key={l}>{l}</option>)}</select><span className="muted text-xs block mt-2">Самостоятельный выбор, а не результат экзамена CEFR.</span></label><label className="block"><span className="block font-bold mb-2">Время занятий в день</span><select className="field w-full" value={profile.dailyMinutes} onChange={e=>update({dailyMinutes:Number(e.target.value)})}>{[15,30,45,60,90].map(n=><option key={n} value={n}>{n} минут</option>)}</select></label><label className="block"><span className="block font-bold mb-2">Новые слова в день</span><select className="field w-full" value={profile.dailyWords} onChange={e=>update({dailyWords:Number(e.target.value)})}>{[5,10,15,20,30].map(n=><option key={n} value={n}>{n} слов</option>)}</select></label><label className="flex items-center gap-3 font-bold"><input type="checkbox" checked={profile.dark} onChange={e=>update({dark:e.target.checked})}/> Тёмная тема</label><div className="pt-3 border-t border-slate-200 dark:border-slate-700"><h2 className="font-extrabold mb-3">Резервная копия прогресса</h2><div className="flex flex-wrap gap-3"><button className="btn-soft" onClick={exportData}><Download size={17}/> Экспортировать JSON</button><button className="btn-soft" onClick={()=>importRef.current?.click()}><Upload size={17}/> Импортировать JSON</button><input ref={importRef} type="file" accept=".json,application/json" onChange={e=>void importData(e.target.files?.[0])} className="hidden" aria-label="Выбрать файл прогресса"/></div>{notice&&<p role="status" className="text-sm mt-3 text-indigo-700 dark:text-indigo-300">{notice}</p>}</div><PWAControls/><div className="pt-3 border-t border-slate-200 dark:border-slate-700"><button className="border border-rose-400 dark:border-rose-500 text-rose-700 dark:text-rose-200 rounded-xl px-4 py-2 font-semibold" onClick={()=>{if(window.confirm('Удалить весь локальный прогресс? Это действие нельзя отменить.')){setProfile({...initial,completed:{},reviews:{},savedWords:[],activity:{},errors:[]});setNotice('Прогресс сброшен.');}}}>Сбросить весь прогресс</button><p className="muted text-xs mt-4 leading-6">Регистрации нет. Данные остаются в браузере; при очистке его хранилища они могут исчезнуть. Для переноса на другое устройство используйте экспорт и импорт.</p></div></section></>}
   </motion.div></AnimatePresence>
  </main>
 </div>;
}

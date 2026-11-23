import type {Profile} from './storage.ts';
import {skillPass} from './storage.ts';
export type Achievement={id:string;icon:string;name:string;description:string;achieved:boolean};
export function achievements(profile:Profile):Achievement[]{
 const finished=Object.keys(profile.completed).length;
 const practicedWords=Object.values(profile.reviews).filter(r=>r.reps>=1).length;
 const studiedDays=Object.keys(profile.activity).filter(k=>profile.activity[k]>0).length;
 const reading=Object.entries(profile.skillResults).filter(([id,r])=>id.startsWith('reading:')&&skillPass(r.score,r.total)).length;
 const listening=Object.entries(profile.skillResults).filter(([id,r])=>id.startsWith('listening:')&&skillPass(r.score,r.total)).length;
 const life=Object.entries(profile.skillResults).filter(([id,r])=>(id.startsWith('america:')||id.startsWith('work:'))&&skillPass(r.score,r.total)).length;
 const dialogues=Object.entries(profile.skillResults).filter(([id,r])=>id.startsWith('dialogue:')&&skillPass(r.score,r.total)).length;
 const completedTasks=Object.values(profile.dailyDone).reduce((n,tasks)=>n+tasks.length,0);
 const listenedTen=listening>=10,readTen=reading>=10;
 const conversations=Object.values(profile.skillResults).filter((r)=>r.attempts>0).length;
 return [
  {id:'first-lesson',icon:'📖',name:'Первый урок',description:'Пройти любую грамматическую тему',achieved:finished>=1},
  {id:'grammar-10',icon:'🧩',name:'Разбираюсь в правилах',description:'Пройти 10 грамматических тем',achieved:finished>=10},
  {id:'grammar-50',icon:'🎓',name:'Знаток грамматики',description:'Пройти 50 грамматических тем',achieved:finished>=50},
  {id:'words-20',icon:'🗃️',name:'20 слов',description:'Хотя бы раз успешно повторить 20 слов',achieved:practicedWords>=20},
  {id:'words-100',icon:'📚',name:'100 слов',description:'Хотя бы раз успешно повторить 100 слов',achieved:practicedWords>=100},
  {id:'three-days',icon:'🌱',name:'Начало привычки',description:'Заниматься в три разных дня',achieved:studiedDays>=3},
  {id:'reader',icon:'📗',name:'Читатель',description:'Успешно выполнить 3 урока Reading',achieved:reading>=3},
  {id:'listener',icon:'🎧',name:'Слушатель',description:'Успешно выполнить 3 урока Listening',achieved:listening>=3},
  {id:'world',icon:'🌎',name:'Для жизни и работы',description:'Завершить 5 ситуационных уроков',achieved:life>=5},
  {id:'ai',icon:'🤖',name:'Люблю диалоги',description:'Пройти 5 разных диалогов',achieved:dialogues>=5},
  {id:'assessment',icon:'🎯',name:'Точка отсчёта',description:'Завершить входную диагностику',achieved:!!profile.assessments.placement},
  {id:'mock-b2',icon:'🏅',name:'Пробный B2',description:'Завершить пробный тест B2 (без сертификата)',achieved:!!profile.assessments.b2},
  {id:'reader-10',icon:'📘',name:'10 текстов',description:'Успешно пройти 10 Reading-уроков',achieved:readTen},
  {id:'listener-10',icon:'🎶',name:'10 диалогов',description:'Успешно пройти 10 Listening-уроков',achieved:listenedTen},
  {id:'writer-1',icon:'✍️',name:'Первый разговор',description:'Пройти разговорную тренировку',achieved:dialogues>=1},
  {id:'writer-5',icon:'📝',name:'Уверенный собеседник',description:'Пройти 8 разговорных тренировок',achieved:dialogues>=8},
  {id:'plan-10',icon:'📅',name:'Учебный план',description:'Отметить 10 пунктов ежедневного плана',achieved:completedTasks>=10},
  {id:'five-days',icon:'🌿',name:'Пять учебных дней',description:'Учиться в пять разных дней с начислением XP',achieved:studiedDays>=5},
  {id:'vocab-500',icon:'🏆',name:'500 слов в работе',description:'Повторить не менее 500 слов хотя бы один раз',achieved:practicedWords>=500},
  {id:'b2-grammar',icon:'🚀',name:'Готов к сложной грамматике',description:'Закончить 60 грамматических уроков',achieved:finished>=60}
 ];
}

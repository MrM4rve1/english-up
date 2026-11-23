import type {Profile} from './storage.ts';
import {dueErrors,errorKey} from './tenses.ts';
export type StudyTab='grammar'|'words'|'tenses'|'errors'|'listening'|'reading'|'work'|'dialogues'|'america';
export type DailyTask={id:string;tab:StudyTab;title:string;description:string;minutes:number};
const allocations:Record<number,{type:StudyTab;minutes:number}[]>={
 15:[{type:'words',minutes:6},{type:'grammar',minutes:6},{type:'tenses',minutes:3}],
 30:[{type:'words',minutes:8},{type:'grammar',minutes:10},{type:'listening',minutes:6},{type:'tenses',minutes:3},{type:'dialogues',minutes:3}],
 45:[{type:'words',minutes:8},{type:'grammar',minutes:12},{type:'listening',minutes:8},{type:'reading',minutes:5},{type:'tenses',minutes:4},{type:'dialogues',minutes:4},{type:'america',minutes:4}],
 60:[{type:'words',minutes:10},{type:'grammar',minutes:14},{type:'listening',minutes:9},{type:'reading',minutes:7},{type:'tenses',minutes:6},{type:'dialogues',minutes:6},{type:'work',minutes:5},{type:'america',minutes:3}],
 90:[{type:'words',minutes:17},{type:'grammar',minutes:20},{type:'listening',minutes:14},{type:'reading',minutes:11},{type:'tenses',minutes:8},{type:'dialogues',minutes:8},{type:'work',minutes:7},{type:'america',minutes:5}]
};
export function weakestLesson(profile:Profile):string|null{
 const counts=new Map<string,number>();
 const counted=new Set<string>();
 for(const error of profile.errors){const key=errorKey(error);if(!error.lessonId||error.source==='tenses'||error.source==='america'||error.source==='work'||counted.has(key)||((profile.errorReviews[key]?.due||0)>Date.now()))continue;counted.add(key);counts.set(error.lessonId,(counts.get(error.lessonId)||0)+1);}
 return [...counts].sort((a,b)=>b[1]-a[1])[0]?.[0]||null;
}
export function dailyPlan(profile:Profile,dueWords:number):DailyTask[]{
 const budget=allocations[profile.dailyMinutes]||allocations[30];
 const weakness=weakestLesson(profile);
 return budget.map(({type,minutes})=>{
  if(type==='words')return{id:'words',tab:'words' as const,minutes,title:dueWords?'Повторение и новые слова':'Изучи новые слова',description:dueWords?`${dueWords} слов ожидают повторения · ${profile.dailyWords} новых в день`:`Цель — ${profile.dailyWords} новых слов`};
  if(type==='grammar')return{id:'grammar',tab:'grammar' as const,minutes,title:weakness?'Укрепи слабую тему':'Продолжи грамматику',description:weakness?'Повтори конструкцию, где были ошибки':'Открой следующий урок своего уровня'};
  if(type==='listening')return{id:'listening',tab:'listening' as const,minutes,title:'Послушай английский',description:'Аудиозадание с проверкой понимания'};
  if(type==='reading')return{id:'reading',tab:'reading' as const,minutes,title:'Почитай на английском',description:'Адаптированный текст и вопросы'};
  if(type==='dialogues')return{id:'dialogues',tab:'dialogues' as const,minutes,title:'Тренируй разговор',description:'Диалог с выбором ответа и объяснениями'};
  if(type==='tenses'){const mistakes=dueErrors(profile.errors,profile.errorReviews).length;return mistakes?{id:'tenses',tab:'errors' as const,minutes,title:'Повтори свои ошибки',description:`${mistakes} карточек к повторению · затем вернись ко временам`}:{id:'tenses',tab:'tenses' as const,minutes,title:'Повтори времена',description:'12 времён, шесть видов заданий и разбор контекста'};}
  if(type==='america')return{id:'america',tab:'america' as const,minutes,title:'Английский для жизни в США',description:'Живые диалоги, выражения и проверка понимания'};
  return{id:'work',tab:'work' as const,minutes,title:'Английский для работы',description:'Практика сообщений в поддержку клиентов'};
 });
}

import {isAssessmentResult,type AssessmentResult} from './assessments.ts';
import {cleanAIHistory,cleanWritingReviews,type LegacyMessage,type LegacyWritingReview} from './legacy-profile.ts';
import type {Word} from './content.ts';
export type Level='A1'|'A2'|'B1'|'B2';
export type Review={due:number;interval:number;ease:number;reps:number;last:number;first?:number};
export type SkillResult={score:number;total:number;at:number;attempts:number};
export type ListeningPractice={attempts:number;best:number;at:number};
export type LearningError={lesson:string;lessonId?:string;question:string;why:string;date:number;correctAnswer?:string;id?:string;source?:'tenses'|'grammar'|'america'|'work'|'reference';topic?:string};
export type TenseStats={attempts:number;correct:number;lastAt:number};
export type Profile={
  level:Level;dailyMinutes:number;dailyWords:number;dark:boolean;
  completed:Record<string,number>;reviews:Record<string,Review>;savedWords:string[];
  xp:number;activity:Record<string,number>;errors:LearningError[];customWords:Word[];externalWords:Word[];dailyDone:Record<string,string[]>;skillResults:Record<string,SkillResult>;writingDrafts:Record<string,string>;
  tenseStats:Record<string,TenseStats>;tenseReviews:Record<string,Review>;tenseAwarded:Record<string,number>;tenseSessions:Record<string,SkillResult>;errorReviews:Record<string,Review>;
  ruleResults:Record<string,SkillResult>;ruleFavorites:string[];
  listeningPractice:Record<string,ListeningPractice>;aiHistory:Record<string,LegacyMessage[]>;aiWritingReviews:Record<string,LegacyWritingReview>;assessments:Record<string,AssessmentResult>;assessmentDrafts:Record<string,string>;
};
export const initial:Profile={level:'A2',dailyMinutes:30,dailyWords:10,dark:false,completed:{},reviews:{},savedWords:[],xp:0,activity:{},errors:[],customWords:[],externalWords:[],dailyDone:{},skillResults:{},writingDrafts:{},tenseStats:{},tenseReviews:{},tenseAwarded:{},tenseSessions:{},errorReviews:{},listeningPractice:{},ruleResults:{},ruleFavorites:[],aiHistory:{},aiWritingReviews:{},assessments:{},assessmentDrafts:{}};
const KEY='english-up-profile-v1'; // Сохраняем ключ v2: старый прогресс не потеряется.
export function isValidProfile(data:unknown):data is Partial<Profile>{
 return typeof data==='object'&&data!==null&&!Array.isArray(data)&&
  (!('completed' in data)||typeof (data as Profile).completed==='object')&&
  (!('reviews' in data)||typeof (data as Profile).reviews==='object');
}
function validReviewMap(value:unknown,cap:number):Record<string,Review>{
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 return Object.fromEntries(Object.entries(value).filter(([k,v])=>k.length>0&&k.length<220&&v&&typeof v==='object'&&Number.isFinite(v.due)&&Number.isFinite(v.interval)&&Number.isFinite(v.ease)&&Number.isFinite(v.reps)&&Number.isFinite(v.last)).slice(0,cap)) as Record<string,Review>;
}
export function normalizeProfile(value:unknown):Profile{
 if(!isValidProfile(value))return {...initial};
 const data=value as Partial<Profile>;
 return {
  ...initial,...data,
  level:(['A1','A2','B1','B2'].includes(String(data.level))?data.level:initial.level) as Level,
  dailyMinutes:[15,30,45,60,90].includes(Number(data.dailyMinutes))?Number(data.dailyMinutes):30,
  dailyWords:[5,10,15,20,30].includes(Number(data.dailyWords))?Number(data.dailyWords):10,
  dark:typeof data.dark==='boolean'?data.dark:false,
  completed:data.completed&&typeof data.completed==='object'&&!Array.isArray(data.completed)?data.completed:{},
  reviews:data.reviews&&typeof data.reviews==='object'&&!Array.isArray(data.reviews)?data.reviews:{},
  savedWords:Array.isArray(data.savedWords)?data.savedWords.filter((x):x is string=>typeof x==='string'):[],
  xp:typeof data.xp==='number'&&Number.isFinite(data.xp)?Math.max(0,data.xp):0,
  activity:data.activity&&typeof data.activity==='object'&&!Array.isArray(data.activity)?data.activity:{},
  errors:Array.isArray(data.errors)?data.errors:[],
  dailyDone:data.dailyDone&&typeof data.dailyDone==='object'&&!Array.isArray(data.dailyDone)?data.dailyDone:{},
  skillResults:data.skillResults&&typeof data.skillResults==='object'&&!Array.isArray(data.skillResults)?Object.fromEntries(Object.entries(data.skillResults).filter(([key,value])=>/^(reading|listening|writing|america|work|dialogue):[a-z0-9-]+$/.test(key)&&value&&typeof value==='object'&&Number.isFinite(value.score)&&Number.isFinite(value.total)&&value.total>0&&value.score>=0&&value.score<=value.total&&Number.isFinite(value.at)&&Number.isFinite(value.attempts))):{},
  writingDrafts:data.writingDrafts&&typeof data.writingDrafts==='object'&&!Array.isArray(data.writingDrafts)?Object.fromEntries(Object.entries(data.writingDrafts).filter(([key,value])=>/^w-[a-z0-9-]+$/.test(key)&&typeof value==='string'&&value.length<=10000).slice(0,100)):{},
  tenseStats:data.tenseStats&&typeof data.tenseStats==='object'&&!Array.isArray(data.tenseStats)?Object.fromEntries(Object.entries(data.tenseStats).filter(([k,v])=>/^[a-z-]+$/.test(k)&&v&&typeof v==='object'&&Number.isFinite(v.attempts)&&Number.isFinite(v.correct)&&Number.isFinite(v.lastAt)&&v.correct>=0&&v.correct<=v.attempts).slice(0,50)): {},
  tenseReviews:validReviewMap(data.tenseReviews,50),
  errorReviews:validReviewMap(data.errorReviews,500),
  tenseAwarded:data.tenseAwarded&&typeof data.tenseAwarded==='object'&&!Array.isArray(data.tenseAwarded)?Object.fromEntries(Object.entries(data.tenseAwarded).filter(([k,v])=>/^[a-z-]+:(identify|form|fix|fill|translate|order)$/.test(k)&&typeof v==='number'&&Number.isFinite(v)).slice(0,200)):{},
  tenseSessions:data.tenseSessions&&typeof data.tenseSessions==='object'&&!Array.isArray(data.tenseSessions)?Object.fromEntries(Object.entries(data.tenseSessions).filter(([k,v])=>/^[a-z0-9:-]+$/.test(k)&&v&&typeof v==='object'&&Number.isFinite(v.score)&&Number.isFinite(v.total)&&v.total>0&&v.score>=0&&v.score<=v.total&&Number.isFinite(v.at)&&Number.isFinite(v.attempts)).slice(0,100)):{},
  assessments:data.assessments&&typeof data.assessments==='object'&&!Array.isArray(data.assessments)?Object.fromEntries(Object.entries(data.assessments).filter(([k,v])=>['placement','b2'].includes(k)&&isAssessmentResult(v,k)).slice(0,2)):{},
  assessmentDrafts:data.assessmentDrafts&&typeof data.assessmentDrafts==='object'&&!Array.isArray(data.assessmentDrafts)?Object.fromEntries(Object.entries(data.assessmentDrafts).filter(([k,v])=>['b2-writing','b2-speaking'].includes(k)&&typeof v==='string'&&v.length<=10000)):{},
  ruleResults:data.ruleResults&&typeof data.ruleResults==='object'&&!Array.isArray(data.ruleResults)?Object.fromEntries(Object.entries(data.ruleResults).filter(([key,value])=>/^[a-z0-9-]{3,60}$/.test(key)&&value&&typeof value==='object'&&Number.isFinite(value.score)&&Number.isFinite(value.total)&&value.total>0&&value.score>=0&&value.score<=value.total&&Number.isFinite(value.at)&&Number.isFinite(value.attempts)).slice(0,150)):{},
  ruleFavorites:Array.isArray(data.ruleFavorites)?[...new Set(data.ruleFavorites.filter((x):x is string=>typeof x==='string'&&/^[a-z0-9-]{3,60}$/.test(x)))].slice(0,150):[],
  listeningPractice:data.listeningPractice&&typeof data.listeningPractice==='object'&&!Array.isArray(data.listeningPractice)?Object.fromEntries(Object.entries(data.listeningPractice).filter(([k,v])=>/^l-[a-z0-9-]+$/.test(k)&&v&&typeof v==='object'&&Number.isInteger(v.attempts)&&v.attempts>=1&&v.attempts<=10000&&Number.isFinite(v.best)&&v.best>=0&&v.best<=100&&Number.isFinite(v.at)).slice(0,150)):{},
  aiHistory:cleanAIHistory(data.aiHistory),
  aiWritingReviews:cleanWritingReviews(data.aiWritingReviews),
  customWords:Array.isArray(data.customWords)?data.customWords.filter((w):w is Word=>typeof w?.id==='string'&&w.id.startsWith('custom:')&&typeof w.en==='string'&&typeof w.ru==='string'&&['A1','A2','B1','B2'].includes(w.level)&&typeof w.example==='string'&&typeof w.translation==='string'&&typeof w.topic==='string').slice(0,3000):[],
  externalWords:Array.isArray(data.externalWords)?data.externalWords.filter((w):w is Word=>typeof w?.id==='string'&&w.id.startsWith('public-v10:')&&typeof w.en==='string'&&typeof w.ru==='string'&&['A1','A2','B1','B2'].includes(w.level)&&typeof w.example==='string'&&typeof w.translation==='string'&&typeof w.topic==='string').slice(0,5500):[]
 };
}
export function load():Profile{
 if(typeof window==='undefined')return {...initial};
 try{return normalizeProfile(JSON.parse(localStorage.getItem(KEY)||'null'));}catch{return {...initial};}
}
export function persist(value:Profile){if(typeof window!=='undefined')localStorage.setItem(KEY,JSON.stringify(value));}
export function nextReview(prev:Review|undefined,grade:0|1|2|3,now=Date.now()):Review{
 const base=prev??{due:now,interval:0,ease:2.5,reps:0,last:0,first:now};
 const first=base.first||now;
 if(grade===0)return{due:now+60_000,interval:0,ease:Math.max(1.3,base.ease-.2),reps:0,last:now,first};
 const ease=Math.max(1.3,base.ease+(grade===3?.15:grade===1?-.15:0));
 const interval=base.reps===0?1:base.reps===1?3:Math.max(1,Math.round(base.interval*ease*(grade===1?.75:1)));
 return{due:now+interval*86_400_000,interval,ease,reps:base.reps+1,last:now,first};
}
export function dayKey(date=new Date()){return`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function currentStreak(activity:Record<string,number>){
 const date=new Date();if(!activity[dayKey(date)])date.setDate(date.getDate()-1);
 let count=0;while(activity[dayKey(date)]){count++;date.setDate(date.getDate()-1);}return count;
}
export function localDayAt(timestamp:number){return dayKey(new Date(timestamp));}

export function mergeSkillResult(prev:SkillResult|undefined,score:number,total:number,now=Date.now()):SkillResult{
 const boundedTotal=Math.max(1,Math.round(total));
 const boundedScore=Math.min(boundedTotal,Math.max(0,Math.round(score)));
 if(!prev)return {score:boundedScore,total:boundedTotal,at:now,attempts:1};
 const oldRate=prev.score/prev.total;const newRate=boundedScore/boundedTotal;
 return {...(newRate>=oldRate?{score:boundedScore,total:boundedTotal}:{score:prev.score,total:prev.total}),at:now,attempts:Math.max(0,prev.attempts)+1};
}
export function skillPass(score:number,total:number){return total>0&&score>=Math.ceil(total*2/3);}

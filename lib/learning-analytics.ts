import type {Profile} from './storage.ts';
import {dayKey,skillPass} from './storage.ts';
export type ActivityDay={key:string;date:Date;xp:number;tasks:string[];grammar:number;skills:number;wordReviews:number;active:boolean};
/** Activity is calculated from actual stored events; there is no invented study-time estimate. */
export function activityDays(profile:Profile,days=90,today=new Date()):ActivityDay[]{
 const start=new Date(today.getFullYear(),today.getMonth(),today.getDate(),12);const grid:ActivityDay[]=[];
 const grammar:Record<string,number>={};const skills:Record<string,number>={};const review:Record<string,number>={};
 for(const timestamp of Object.values(profile.completed)){if(Number.isFinite(timestamp)&&timestamp>0){const key=dayKey(new Date(timestamp));grammar[key]=(grammar[key]||0)+1;}}
 for(const record of Object.values(profile.skillResults)){if(Number.isFinite(record.at)&&record.at>0){const key=dayKey(new Date(record.at));skills[key]=(skills[key]||0)+1;}}
 for(const record of Object.values(profile.reviews)){if(Number.isFinite(record.last)&&record.last>0){const key=dayKey(new Date(record.last));review[key]=(review[key]||0)+1;}}
 for(let i=days-1;i>=0;i--){const date=new Date(start);date.setDate(start.getDate()-i);const key=dayKey(date);const xp=Math.max(0,Number(profile.activity[key])||0);const tasks=profile.dailyDone[key]||[];
  const grammarCount=grammar[key]||0,skillCount=skills[key]||0,wordReviews=review[key]||0;
  grid.push({key,date,xp,tasks,grammar:grammarCount,skills:skillCount,wordReviews,active:xp>0||tasks.length>0||grammarCount>0||skillCount>0||wordReviews>0});
 }
 return grid;
}
export function activitySummary(profile:Profile,days=30,today=new Date()){
 const grid=activityDays(profile,days,today);
 const practiced=grid.filter(d=>d.active);
 const totals=grid.reduce((acc,d)=>({xp:acc.xp+d.xp,grammar:acc.grammar+d.grammar,skillEntries:acc.skillEntries+d.skills,wordReviews:acc.wordReviews+d.wordReviews,tasks:acc.tasks+d.tasks.length}),{xp:0,grammar:0,skillEntries:0,wordReviews:0,tasks:0});
 const averageXP=practiced.length?Math.round(totals.xp/practiced.length):0;
 return {...totals,activeDays:practiced.length,days,averageXP};
}
export function skillOverview(profile:Profile,totals:Record<'reading'|'listening'|'dialogue',number>){
 return (['reading','listening','dialogue'] as const).map(kind=>{
  const items=Object.entries(profile.skillResults).filter(([id])=>id.startsWith(kind+':'));
  const passed=items.filter(([,value])=>skillPass(value.score,value.total)).length;
  return {kind,total:totals[kind],attempted:items.length,passed,percent:totals[kind]?Math.round(100*passed/totals[kind]):0};
 });
}
export function monthMatrix(profile:Profile,year:number,month:number,today=new Date()):Array<ActivityDay|null>{
 const first=new Date(year,month,1,12);const last=new Date(year,month+1,0,12);
 const length=last.getDate();const offset=(first.getDay()+6)%7;
 const data=activityDays(profile,Math.max(30,370),today);
 const byKey=new Map(data.map(item=>[item.key,item]));
 return [...Array.from({length:offset},()=>null),...Array.from({length},(_,index)=>{
  const date=new Date(year,month,index+1,12);if(date>new Date(today.getFullYear(),today.getMonth(),today.getDate(),12))return null;
  return byKey.get(dayKey(date))||{key:dayKey(date),date,xp:0,tasks:[],grammar:0,skills:0,wordReviews:0,active:false};
 })];
}

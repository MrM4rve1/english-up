/** Backwards-compatible import of historical progress. No API integration or network calls. */
export type LegacyMessage={role:'user'|'assistant';content:string;at:number};
export type LegacyWritingReview={corrected:string;summary:string;strengths:string[];improvements:string[];grammarNotes:string[];nextStep:string;at:number};
const trim=(s:string,max:number)=>s.replace(/\u0000/g,'').trim().slice(0,max);
export function cleanAIHistory(value:unknown):Record<string,LegacyMessage[]>{
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 return Object.fromEntries(Object.entries(value).filter(([key,v])=>key.length<140&&Array.isArray(v)).slice(0,35).map(([key,rows])=>[key,(rows as unknown[]).filter(row=>!!row&&typeof row==='object'&&['user','assistant'].includes((row as LegacyMessage).role)&&typeof (row as LegacyMessage).content==='string').slice(-30).map(row=>({role:(row as LegacyMessage).role,content:(row as LegacyMessage).content.slice(0,2500),at:Number.isFinite((row as LegacyMessage).at)?(row as LegacyMessage).at:0}))]));
}
export function cleanWritingReviews(value:unknown):Record<string,LegacyWritingReview>{
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 return Object.fromEntries(Object.entries(value).filter(([key,row])=>/^w-[a-z0-9-]+$/.test(key)&&row&&typeof row==='object').slice(0,60).flatMap(([key,row])=>{
  const review=row as Record<string,unknown>;
  if(['corrected','summary','nextStep'].some(k=>typeof review[k]!=='string'||!(review[k] as string).trim()))return [];
  if(['strengths','improvements','grammarNotes'].some(k=>!Array.isArray(review[k])||!(review[k] as unknown[]).every(v=>typeof v==='string')))return [];
  const arr=(k:string,max:number)=>(review[k] as string[]).slice(0,max).map(v=>trim(v,500));
  return [[key,{corrected:trim(review.corrected as string,12000),summary:trim(review.summary as string,2000),nextStep:trim(review.nextStep as string,2000),strengths:arr('strengths',6),improvements:arr('improvements',8),grammarNotes:arr('grammarNotes',8),at:Number.isFinite(review.at)?review.at as number:0}]];
 }));
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {readingUnits,listeningUnits,writingTasks,validateComprehension,wordCount} from '../lib/skills-content.ts';
import {extraReading,extraListening,extraWriting} from '../lib/skills-library.ts';
import {initial,normalizeProfile,dayKey,mergeSkillResult,nextReview} from '../lib/storage.ts';
import {activityDays,activitySummary,monthMatrix,skillOverview} from '../lib/learning-analytics.ts';
import {achievements} from '../lib/achievements.ts';
import {SKILL_COUNTS} from '../lib/skill-counts.ts';
const levels=['A1','A2','B1','B2'];
const legacyReading=['r-a1-01','r-a2-01','r-b1-01','r-b2-01'];
const legacyListening=['l-a1-01','l-a2-01','l-b1-01','l-b2-01'];
test('new skill library expands all four levels, leaves old IDs unchanged and never duplicates IDs',()=>{
 assert.equal(extraReading.length,32);assert.equal(extraListening.length,32);assert.equal(extraWriting.length,24);
 assert.equal(readingUnits.length,48);assert.equal(listeningUnits.length,48);assert.equal(writingTasks.length,36);
 assert.deepEqual([SKILL_COUNTS.reading,SKILL_COUNTS.listening,SKILL_COUNTS.writing],[readingUnits.length,listeningUnits.length,writingTasks.length]);
 for(const [items,count] of [[readingUnits,12],[listeningUnits,12],[writingTasks,9]]){
  assert.equal(new Set(items.map(x=>x.id)).size,items.length);
  for(const level of levels)assert.equal(items.filter(x=>x.level===level).length,count);
 }
 for(const id of legacyReading)assert.ok(readingUnits.some(u=>u.id===id));
 for(const id of legacyListening)assert.ok(listeningUnits.some(u=>u.id===id));
});
test('new Reading texts are bilingual, substantive and have 3 distinct graded questions',()=>{
 for(const unit of extraReading){assert.ok(unit.passage.length>=220,unit.id);assert.ok(unit.translation.length>=200,unit.id);assert.ok(unit.glossary.length>=3,unit.id);
  assert.equal(unit.questions.length,3);assert.ok(validateComprehension(unit));
  for(const question of unit.questions){assert.equal(new Set(question.choices).size,3);assert.ok(question.choices[question.correct]);assert.ok(question.explanation.length>=15);}
 }
});
test('new Listening scenarios have separate spoken roles and checkable feedback',()=>{
 for(const unit of extraListening){assert.ok(unit.lines.length>=6,unit.id);assert.ok(unit.lines.every(s=>/^[^:]+: /.test(s)),unit.id);
  assert.equal(unit.questions.length,3);assert.ok(validateComprehension(unit));assert.equal(unit.keyPhrases.length,2);
  assert.ok(unit.translation.length>=60,unit.id);
 }
});
test('new Writing tasks have 3 clear checks, model examples and sensible level goals',()=>{
 for(const task of extraWriting){assert.equal(task.checks.length,3);assert.equal(task.usefulPhrases.length,3);assert.ok(wordCount(task.model)>=task.minWords,task.id);
  assert.ok(task.modelTranslation.length>=70,task.id);assert.ok(task.tip.length>=30,task.id);
  assert.ok(task.level==='A1'?task.minWords<=35:task.level==='B2'?task.minWords>=100:true);
 }
});
test('compatibility: migration keeps old lesson timestamps, old skill grades, AI chats, word reviews and drafts',()=>{
 const restored=normalizeProfile({level:'B1',xp:1177,completed:{'be':1699999999999},skillResults:{'reading:r-a1-01':mergeSkillResult(undefined,3,3,1700000000000)},
 writingDrafts:{'w-a1-01':'My earlier draft'},reviews:{hello:nextReview(undefined,2,1700000000000)},dailyDone:{'2026-11-20':['reading']},aiHistory:{}});
 assert.equal(restored.level,'B1');assert.equal(restored.completed.be,1699999999999);assert.equal(restored.xp,1177);
 assert.equal(restored.skillResults['reading:r-a1-01'].score,3);assert.equal(restored.writingDrafts['w-a1-01'],'My earlier draft');assert.equal(restored.reviews.hello.reps,1);
 assert.deepEqual(restored.dailyDone['2026-11-20'],['reading']);
});
test('activity calendar tracks stored events with stable local dates; does not invent activity',()=>{
 const time=new Date(2026,10,23,12);const day=dayKey(time);const blank=activityDays(initial,7,time);
 assert.equal(blank.length,7);assert.ok(blank.every(d=>!d.active&&!d.xp&&!d.grammar));
 const p={...initial,activity:{[day]:25},dailyDone:{[day]:['words','reading']},completed:{one:time.getTime()},skillResults:{'reading:r-a1-01':mergeSkillResult(undefined,3,3,time.getTime())},reviews:{hello:{due:1,interval:1,ease:2,reps:1,last:time.getTime()}}};
 const result=activityDays(p,7,time);const last=result.at(-1);
 assert.equal(last.key,day);assert.equal(last.xp,25);assert.equal(last.tasks.length,2);assert.equal(last.grammar,1);assert.equal(last.skills,1);assert.equal(last.wordReviews,1);
 const sum=activitySummary(p,7,time);assert.equal(sum.xp,25);assert.equal(sum.activeDays,1);assert.equal(sum.averageXP,25);
});
test('calendar starts on Monday, keeps month borders and hides dates after today',()=>{
 const m=monthMatrix(initial,2026,10,new Date(2026,10,23,12));
 assert.equal(m.length,36);assert.equal(m[0],null);assert.equal(m[6]?.key,'2026-11-01');assert.equal(m[28]?.key,'2026-11-23');assert.equal(m[29],null);
});
test('analytics treats dialogue outcomes separately from reading and listening',()=>{
 const p={...initial,skillResults:{'reading:r-a1-01':mergeSkillResult(undefined,3,3,1000),'listening:l-a1-01':mergeSkillResult(undefined,1,3,1000),'dialogue:coffee-order':mergeSkillResult(undefined,2,3,1000)}};
 const list=skillOverview(p,{reading:48,listening:48,dialogue:12});
 assert.equal(list[0].passed,1);assert.equal(list[1].passed,0);assert.equal(list[2].passed,1);assert.equal(list[2].percent,8);
});
test('achievements require actual dialogue answers and completion',()=>{
 const blank=achievements(initial);assert.ok(blank.length>=20);assert.ok(blank.every(x=>!x.achieved));
 const p={...initial,dailyDone:{'2026-11-23':['words','grammar','reading','listening','dialogues','work','america','tenses','errors','bonus']},skillResults:{'dialogue:coffee-order':mergeSkillResult(undefined,2,3,1000)}};
 const awards=achievements(p);assert.equal(awards.find(a=>a.id==='writer-1')?.achieved,true);assert.equal(awards.find(a=>a.id==='plan-10')?.achieved,true);assert.equal(p.xp,0);
});
test('app offers discoverable calendar and library search without signup or YouTube',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');const skills=readFileSync(new URL('../components/skills.tsx',import.meta.url),'utf8');
 assert.match(page,/id:'calendar'/);assert.match(page,/LearningInsights/);assert.match(page,/LearningCalendar/);assert.match(skills,/CatalogSearch/);assert.match(page,/next\/dynamic/);
 assert.doesNotMatch(page,/youtube\.com|youtu\.be|signup|\/login/);
});
test('PWA caches scope-relative assets with no secrets or network API',()=>{
 const sw=readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');const offline=readFileSync(new URL('../public/offline.html',import.meta.url),'utf8');const pwa=readFileSync(new URL('../components/pwa-controls.tsx',import.meta.url),'utf8');
 assert.match(sw,/self\.registration\.scope/);assert.match(sw,/req\.method!=='GET'/);assert.match(sw,/offline\.html/);
 assert.doesNotMatch(sw,/OPENAI_API_KEY|localStorage|sessionStorage|\/api\//);assert.match(offline,/Нет подключения/);assert.match(pwa,/beforeinstallprompt/);
 assert.ok(statSync(new URL('../public/icon-192.png',import.meta.url)).size>200);
});
test('worker can register install/fetch lifecycle listeners (no browser packages)',async()=>{
 const worker=readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');const {runInNewContext}=await import('node:vm');const listeners={};
 runInNewContext(worker,{self:{registration:{scope:'https://example.test/english-up/'},location:{origin:'https://example.test'},addEventListener:(type,fn)=>{listeners[type]=fn},skipWaiting:()=>{},clients:{claim:()=>Promise.resolve()}},caches:{open:async()=>({addAll:async()=>{},keys:async()=>[],put:async()=>{}}),keys:async()=>[]},fetch:async()=>({ok:true,clone:()=>({})}),URL,Response,Promise,console});
 assert.equal(typeof listeners.install,'function');assert.equal(typeof listeners.activate,'function');assert.equal(typeof listeners.fetch,'function');
});

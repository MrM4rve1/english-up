import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readingUnits,listeningUnits,writingTasks,validateComprehension,wordCount,writingHints} from '../lib/skills-content.ts';
import {mergeSkillResult,normalizeProfile,skillPass} from '../lib/storage.ts';
const levels=['A1','A2','B1','B2'];

test('reading: original 16 passages plus 32 new, 12 per level and 3 distinct questions each',()=>{
 assert.equal(readingUnits.length,48);
 assert.equal(new Set(readingUnits.map(x=>x.id)).size,48);
 for(const level of levels)assert.equal(readingUnits.filter(x=>x.level===level).length,12);
 for(const u of readingUnits){
  assert.ok(u.passage.length>=160&&u.translation.length>=100&&u.glossary.length>=3,u.id);
  assert.equal(u.questions.length,3,u.id);
  assert.equal(new Set(u.questions.map(x=>x.prompt)).size,3);
  assert.ok(validateComprehension(u),u.id);
  assert.ok(u.questions.every(x=>x.explanation.length>=15));
 }
});
test('listening: 48 dialogues with speaker lines, audio texts, varied comprehension',()=>{
 assert.equal(listeningUnits.length,48);
 assert.equal(new Set(listeningUnits.map(x=>x.id)).size,48);
 for(const level of levels)assert.equal(listeningUnits.filter(x=>x.level===level).length,12);
 for(const u of listeningUnits){
  assert.ok(u.lines.length>=4&&u.lines.every(x=>x.includes(': ')),u.id);
  assert.equal(u.questions.length,3,u.id);assert.ok(validateComprehension(u),u.id);
  assert.equal(u.keyPhrases.length,2);
 }
});
test('writing: 36 authored tasks, clear self-review criteria, long enough model response',()=>{
 assert.equal(writingTasks.length,36);
 assert.equal(new Set(writingTasks.map(x=>x.id)).size,36);
 for(const level of levels)assert.equal(writingTasks.filter(x=>x.level===level).length,9);
 for(const t of writingTasks){
  assert.ok(t.prompt.length>=60&&t.modelTranslation.length>70,t.id);
  assert.equal(t.checks.length,3,t.id);assert.equal(t.usefulPhrases.length,3,t.id);
  assert.ok(wordCount(t.model)>=t.minWords,t.id);
 }
});
test('writing helper makes only factual technical recommendations, not fake AI grading',()=>{
 assert.equal(wordCount("I've sent an email. We've received it!"),7);
 const short=writingHints('i want help',30);
 assert.equal(short.minimumReached,false);assert.ok(short.hints.length>=2);
 const long=writingHints('I would like to contact you about my recent order.',9);
 assert.equal(long.minimumReached,true);
});
test('existing profile loads with new optional progress and preserves all old fields',()=>{
 const old={xp:900,level:'B2',completed:{be:173},reviews:{foo:{due:1,interval:1,ease:2.5,reps:1,last:1}},savedWords:['foo'],dailyDone:{'2026-11-22':['words']}};
 const result=normalizeProfile(old);
 assert.equal(result.xp,900);assert.equal(result.completed.be,173);assert.ok(result.reviews.foo);
 assert.deepEqual(result.skillResults,{});assert.deepEqual(result.writingDrafts,{});
});
test('skill result retains best score and counts attempts, preventing duplicate credit at UI boundary',()=>{
 const a=mergeSkillResult(undefined,2,3,100);
 assert.equal(skillPass(a.score,a.total),true);
 const b=mergeSkillResult(a,1,3,200);
 assert.equal(b.score,2);assert.equal(b.total,3);assert.equal(b.attempts,2);
 const c=mergeSkillResult(b,3,3,300);
 assert.equal(c.score,3);assert.equal(c.attempts,3);
 assert.equal(skillPass(1,3),false);
});
test('new navigation uses real modules while retaining old trainer and no registration',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 assert.match(page,/ReadingSkills/);assert.match(page,/ListeningSkills/);assert.match(page,/DialoguePractice/);
 assert.match(page,/TensesPractice/);assert.match(page,/english-up-profile-v1|profile\.skillResults/);
 assert.doesNotMatch(page,/youtube\.com|youtu\.be|signup|\/login/);
});

test('daily plan includes dialogues instead of writing without losing work or tenses',async()=>{
 const {dailyPlan}=await import('../lib/daily-plan.ts');
 for(const budget of [15,30,45,60,90]){
  const profile=normalizeProfile({dailyMinutes:budget});
  const plan=dailyPlan(profile,0);
  assert.equal(plan.reduce((sum,x)=>sum+x.minutes,0),budget);
  assert.equal(new Set(plan.map(x=>x.id)).size,plan.length);
  if(budget>=60){assert.ok(plan.some(x=>x.tab==='work'));assert.ok(plan.some(x=>x.tab==='tenses'));assert.ok(plan.some(x=>x.tab==='dialogues'));}
 }
});

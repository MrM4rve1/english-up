import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tenses,tenseTasks,modes,getTenseTasks,checkTenseAnswer,errorKey,uniqueErrors,dueErrors,makeTenseError,normalizeAnswer,masteryOverview} from '../lib/tenses.ts';
import {normalizeProfile,nextReview} from '../lib/storage.ts';
import {dailyPlan} from '../lib/daily-plan.ts';
const levels=['A1','A2','B1','B2'];

test('twelve distinct tenses with explanations, negatives, questions and comparisons',()=>{
 assert.equal(tenses.length,12);assert.equal(new Set(tenses.map(x=>x.id)).size,12);
 for(const unit of tenses){
  assert.ok(levels.includes(unit.level));
  for(const field of ['formula','negative','question','when','markers','contrast','timeline','example','exampleRu','pitfall'])assert.ok(unit[field].length>5,`${unit.id} missing ${field}`);
 }
});
test('seventy-two meaningful drills, six modes per tense; every answer is checkable',()=>{
 assert.equal(modes.length,6);assert.equal(tenseTasks.length,72);assert.equal(new Set(tenseTasks.map(x=>x.id)).size,72);
 for(const unit of tenses){
  const tasks=tenseTasks.filter(x=>x.tenseId===unit.id);
  assert.equal(tasks.length,6);assert.equal(new Set(tasks.map(x=>x.mode)).size,6);
  for(const task of tasks){
   assert.ok(task.prompt.length>15,task.id);assert.ok(task.explanation.length>20,task.id);
   assert.ok(task.answers.length>0&&task.answers[0].length>2,task.id);
   assert.ok(checkTenseAnswer(task,task.answers[0]),task.id);
   assert.equal(checkTenseAnswer(task,'definitely wrong'),false,task.id);
   if(task.options){assert.equal(task.options.length,3,task.id);assert.ok(task.options.includes(task.answers[0]),task.id);assert.equal(new Set(task.options).size,3,task.id);}
   if(task.tokens){assert.equal(normalizeAnswer(task.tokens.join(' ')),normalizeAnswer(task.answers[0]),task.id);}
  }
 }
});
test('mixed, specific-level and repetition selection are distinct and stable',()=>{
 assert.equal(getTenseTasks('mixed','all').length,72);
 assert.equal(getTenseTasks('translate','B2').length,1);
 assert.equal(getTenseTasks('form','A1').length,4);
 assert.equal(getTenseTasks('mixed','all',['past-perfect']).length,6);
 assert.equal(getTenseTasks('mixed','A1',['past-perfect']).length,0);
});
test('manual text check ignores punctuation and case but preserves missing auxiliaries',()=>{
 const task=tenseTasks.find(t=>t.id==='present-perfect:translate');
 assert.ok(task);
 assert.equal(checkTenseAnswer(task,'we have already received your message!'),true);
 assert.equal(checkTenseAnswer(task,"We've already received your message."),true);
 assert.equal(checkTenseAnswer(task,'We already received your message.'),false);
 assert.equal(checkTenseAnswer(task,''),false);
});
test('errors from v6 remain readable, deduplicated and scheduled correctly',()=>{
 const old={lesson:'Present Perfect',lessonId:'present-perfect',question:'Has he sent it?',why:'has + V3',correctAnswer:'Yes, he has.',date:100};
 const newErr=makeTenseError(tenseTasks[0],200);
 assert.equal(newErr.source,'tenses');assert.ok(newErr.id.startsWith('tense:'));
 assert.equal(uniqueErrors([old,old,newErr]).length,2);
 assert.equal(dueErrors([old,newErr],{},500).length,2);
 const schedule=nextReview(undefined,2,500);
 assert.equal(dueErrors([old,newErr],{[errorKey(old)]:schedule},500).length,1);
 assert.ok(dueErrors([old,newErr],{[errorKey(old)]:schedule},schedule.due+1).length>=1);
});
test('old profile values preserved, new v7 values are opt-in and normalize safely',()=>{
 const old={level:'A2',xp:777,completed:{a1:100},errors:[{lesson:'Test',question:'Q',correctAnswer:'A',why:'Reason',date:1}],skillResults:{'reading:r-a1':{score:2,total:3,attempts:1,at:10}},customWords:[]};
 const profile=normalizeProfile(old);
 assert.equal(profile.xp,777);assert.equal(profile.completed.a1,100);assert.equal(profile.errors.length,1);
 assert.deepEqual(profile.tenseStats,{});assert.deepEqual(profile.tenseAwarded,{});
 assert.deepEqual(profile.tenseReviews,{});assert.deepEqual(profile.tenseSessions,{});assert.deepEqual(profile.errorReviews,{});
 const v7=normalizeProfile({...old,tenseStats:{'past-simple':{attempts:3,correct:2,lastAt:500}},tenseAwarded:{'past-simple:form':600},errorReviews:{foo:nextReview(undefined,2,500)}});
 assert.equal(v7.tenseStats['past-simple'].correct,2);assert.equal(v7.tenseAwarded['past-simple:form'],600);assert.ok(v7.errorReviews.foo);
 assert.equal(Object.keys(normalizeProfile({tenseReviews:{bad:{due:'wrong'}}}).tenseReviews).length,0);
});
test('daily plan routes to mistakes when due, retains full study budget and originals',()=>{
 const old=normalizeProfile({dailyMinutes:60,errors:[makeTenseError(tenseTasks[1],500)]});
 const plan=dailyPlan(old,2);
 assert.equal(plan.reduce((n,t)=>n+t.minutes,0),60);
 assert.ok(plan.some(t=>t.tab==='errors'));assert.ok(plan.some(t=>t.tab==='work'));assert.ok(plan.some(t=>t.tab==='dialogues'));
 const zero=dailyPlan(normalizeProfile({dailyMinutes:60}),0);
 assert.ok(zero.some(t=>t.tab==='tenses'));
});
test('overview reflects genuine answers and reports no percent for untouched tenses',()=>{
 const rows=masteryOverview({'past-simple':{attempts:4,correct:3,lastAt:600}},{},500);
 assert.equal(rows.find(x=>x.id==='past-simple').percent,75);
 assert.equal(rows.find(x=>x.id==='future-perfect').percent,null);
});
test('interface connects real tenses/error review modules, not canned AI or videos',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 const trainer=readFileSync(new URL('../components/tenses-trainer.tsx',import.meta.url),'utf8');
 const errors=readFileSync(new URL('../components/error-review.tsx',import.meta.url),'utf8');
 assert.match(page,/recordTense/);assert.match(page,/onAnswer=\{recordTense\}/);assert.match(page,/onGrade=\{gradeError\}/);assert.match(page,/tenseAwarded/);
 assert.match(trainer,/checkTenseAnswer/);assert.match(trainer,/getSessionTenseTasks/);assert.match(trainer,/submit\(\)/);
 assert.match(errors,/dueErrors/);assert.match(errors,/onGrade\(selected,ok\)/);
 assert.doesNotMatch(page,/youtube\.com|youtu\.be|\/login|\/signup/);
});

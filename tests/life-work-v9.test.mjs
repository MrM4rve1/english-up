import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {americanUnits,workUnits,scenarioUnits,scenarioResultKey,scenarioDraftKey,scenarioSuccess,validateScenarioUnit} from '../lib/life-work-content.ts';
import {normalizeProfile,mergeSkillResult,skillPass} from '../lib/storage.ts';
import {dailyPlan,weakestLesson} from '../lib/daily-plan.ts';
import {errorKey,dueErrors} from '../lib/tenses.ts';

const levels=['A1','A2','B1','B2'];

test('40 authored America and Work units across all four CEFR groups',()=>{
 assert.equal(americanUnits.length,20);assert.equal(workUnits.length,20);
 assert.equal(new Set(scenarioUnits.map(u=>`${u.category}:${u.id}`)).size,40);
 for(const level of levels){assert.equal(americanUnits.filter(u=>u.level===level).length,5);assert.equal(workUnits.filter(u=>u.level===level).length,5);}
 for(const u of scenarioUnits){assert.ok(validateScenarioUnit(u),u.id);assert.ok(u.culture.length>55,u.id);assert.ok(u.practice.prompt.length>35,u.id);assert.ok(u.practice.translation.length>35,u.id);assert.ok(u.dialogue.every(line=>line.en&&line.ru&&line.speaker),u.id);assert.ok(u.phrases.every(p=>p.en&&p.ru&&p.tip),u.id);}
});
test('120 independently keyed comprehension and phrase questions',()=>{
 assert.equal(scenarioUnits.reduce((n,u)=>n+u.questions.length,0),120);
 for(const unit of scenarioUnits){
  assert.equal(new Set(unit.questions.map(q=>q.q)).size,3,unit.id);
  for(const q of unit.questions){
   assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);
   assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.choices[q.answer]);assert.ok(q.why.length>15);
  }
  assert.equal(unit.questions[1].choices[unit.questions[1].answer],unit.phrases[0].en);
  assert.equal(unit.questions[2].choices[unit.questions[2].answer],unit.phrases[2].ru);
 }
});
test('course result and writing keys are stable and distinct',()=>{
 const keys=new Set(scenarioUnits.map(scenarioResultKey));const drafts=new Set(scenarioUnits.map(scenarioDraftKey));
 assert.equal(keys.size,40);assert.equal(drafts.size,40);
 assert.ok([...keys].every(k=>/^(america|work):[a-z0-9-]+$/.test(k)));
 assert.ok([...drafts].every(k=>/^w-(america|work)-[a-z0-9-]+$/.test(k)));
 assert.equal(scenarioSuccess(2,3),true);assert.equal(scenarioSuccess(1,3),false);
});
test('importing a v8 profile keeps grammar, vocabulary, AI chat and previous work reviews',()=>{
 const old={level:'B2',xp:745,completed:{be:1,'present-simple':12},reviews:{test:{due:100,interval:1,ease:2.5,reps:1,last:50}},savedWords:['test'],skillResults:{'reading:read-a1-1':{score:3,total:3,at:5,attempts:1}},writingDrafts:{'w-old':'draft'},aiHistory:{'teacher:free':[{role:'user',content:'Hello',at:2}]},aiWritingReviews:{'w-work-0':{corrected:'Thank you.',summary:'Fine.',strengths:[],improvements:[],grammarNotes:[],nextStep:'Practice.',at:3}}};
 const loaded=normalizeProfile(old);
 assert.equal(loaded.level,'B2');assert.equal(loaded.xp,745);assert.equal(loaded.completed.be,1);assert.ok(loaded.reviews.test);assert.deepEqual(loaded.savedWords,['test']);assert.equal(loaded.writingDrafts['w-old'],'draft');assert.equal(loaded.aiHistory['teacher:free'][0].content,'Hello');assert.equal(loaded.aiWritingReviews['w-work-0'].corrected,'Thank you.');
 const after=normalizeProfile({...loaded,skillResults:{...loaded.skillResults,'america:intro':mergeSkillResult(undefined,3,3,200),'work:status':mergeSkillResult(undefined,2,3,200)},writingDrafts:{...loaded.writingDrafts,'w-america-intro':'My draft'}});
 assert.equal(after.skillResults['america:intro'].score,3);assert.equal(after.skillResults['work:status'].total,3);assert.equal(after.writingDrafts['w-america-intro'],'My draft');assert.equal(after.xp,745);
});
test('max score remains best on retry and does not give fake passing results',()=>{
 const good=mergeSkillResult(undefined,2,3,100);const retry=mergeSkillResult(good,0,3,200);
 assert.equal(retry.score,2);assert.equal(retry.attempts,2);assert.equal(skillPass(retry.score,retry.total),true);
 assert.equal(skillPass(1,3),false);
});
test('new errors are compatible with the preexisting interval review journal',()=>{
 const unit=americanUnits[0];const e={id:`america:${unit.id}:0`,source:'america',lesson:unit.title,lessonId:unit.id,question:unit.questions[0].q,correctAnswer:unit.questions[0].choices[unit.questions[0].answer],why:unit.questions[0].why,date:100};
 assert.equal(errorKey(e),e.id);assert.equal(dueErrors([e],{}).length,1);
 assert.equal(dueErrors([e],{[e.id]:{due:9999999999999,interval:1,ease:2.5,reps:1,last:100}}).length,0);
 assert.equal(weakestLesson(normalizeProfile({errors:[e]})),null);
});
test('daily plan includes America without losing old required tasks',()=>{
 for(const minutes of [15,30,45,60,90]){
  const plan=dailyPlan(normalizeProfile({dailyMinutes:minutes}),0);
  assert.equal(plan.reduce((total,task)=>total+task.minutes,0),minutes);
  assert.equal(new Set(plan.map(t=>t.id)).size,plan.length);
  if(minutes>=45)assert.ok(plan.some(t=>t.id==='america'));
  if(minutes>=60)for(const id of ['work','tenses','dialogues'])assert.ok(plan.some(t=>t.id===id));
 }
});
test('America/Work routes open local dialogue practice without paid AI or registration',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 const course=readFileSync(new URL('../components/life-work-course.tsx',import.meta.url),'utf8');
 const practice=readFileSync(new URL('../components/dialogue-practice.tsx',import.meta.url),'utf8');
 assert.match(page,/LifeWorkCourse kind="america"/);assert.match(page,/LifeWorkCourse kind="work"/);
 assert.match(page,/onMistakes={saveScenarioMistakes}/);assert.match(page,/legacyCases={support}/);
 assert.match(course,/onStartDialogue/);assert.match(course,/sayEnglish/);assert.match(course,/Прослушать/);
 assert.match(practice,/Открыть|Все диалоги/);assert.match(practice,/Тренажёр/);
 assert.doesNotMatch(page+course,/youtube\.com|youtu\.be|\/login|\/signup|AIWritingReviewPanel/);
});

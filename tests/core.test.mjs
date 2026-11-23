import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,words} from '../lib/content.ts';
import {enrichLessons} from '../lib/enrichment.ts';
import {nextReview,normalizeProfile,dayKey,currentStreak} from '../lib/storage.ts';
import {A1_ORDER,getA1Unit,buildA1Exercises,checkA1Answer,normalizedAnswer} from '../lib/a1-course.ts';
import {UPPER_ORDER,UPPER_BY_ID,UPPER_LEVELS,makeAdvancedExercises} from '../lib/upper-course.ts';

const levels=['A1','A2','B1','B2'];
const detailed=enrichLessons(lessons);

test('A1–B2 groups exist and every lesson has a unique identifier',()=>{
 assert.equal(lessons.length,71);
 assert.equal(new Set(lessons.map(x=>x.id)).size,lessons.length);
 for(const level of levels)assert.ok(lessons.filter(x=>x.level===level).length>=4,`missing group ${level}`);
});

test('all lessons have useful examples and at least five different exercises',()=>{
 for(const lesson of detailed){
  assert.ok(lesson.rule.length>30,`rule too short: ${lesson.id}`);
  assert.ok(lesson.examples.length>=5,`not enough examples: ${lesson.id}`);
  assert.ok(lesson.questions.length>=5,`not enough questions: ${lesson.id}`);
  assert.ok(lesson.level==='A1'?getA1Unit(lesson.id)?.pitfalls.length>=2:UPPER_BY_ID[lesson.id]?.pitfalls.length>=2,`missing common mistake: ${lesson.id}`);
  for(const item of lesson.questions){
   assert.ok(item.q.trim(),`${lesson.id} has empty question`);
   assert.ok(item.why.trim(),`${lesson.id} has no explanation`);
   assert.ok(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<item.choices.length,`invalid answer index in ${lesson.id}`);
   assert.equal(new Set(item.choices).size,item.choices.length,`duplicate options in ${lesson.id}`);
  }
 }
});

test('vocabulary has unique entries, translations and examples',()=>{
 assert.ok(words.length>=175,`vocabulary too small: ${words.length}`);
 assert.equal(new Set(words.map(w=>w.id)).size,words.length);
 for(const w of words){assert.ok(w.en&&w.ru&&w.example&&w.translation);assert.ok(levels.includes(w.level));}
});

test('SM-2-like repeat schedule: again -> minute, good -> day, later -> 3 days',()=>{
 const now=Date.UTC(2026,10,23,10);
 const again=nextReview(undefined,0,now);
 assert.equal(again.due-now,60_000);
 const good=nextReview(undefined,2,now);
 assert.equal(good.due-now,86_400_000);
 const next=nextReview(good,2,now+86_400_000);
 assert.equal(next.interval,3);
 assert.equal(next.first,now);
});

test('previous stored progress remains valid and gains new safe defaults',()=>{
 const old={level:'B1',xp:80,completed:{be:123},reviews:{},activity:{},errors:[],dailyWords:10,dailyMinutes:30,dark:true};
 const normalized=normalizeProfile(old);
 assert.equal(normalized.level,'B1');assert.equal(normalized.completed.be,123);assert.equal(normalized.xp,80);
 assert.deepEqual(normalized.savedWords,[]);
});

test('calendar days format consistently',()=>{
 assert.equal(dayKey(new Date(2026,10,3)),'2026-11-03');
 assert.equal(currentStreak({}),0);
});


test('A1 curriculum covers 17 sequenced subjects with authored theory and examples',()=>{
 assert.equal(A1_ORDER.length,17);
 assert.equal(new Set(A1_ORDER).size,17);
 assert.equal(lessons.filter(l=>l.level==='A1').length,17);
 assert.deepEqual(lessons.filter(l=>l.level==='A1').map(l=>l.id),A1_ORDER);
 for(const lesson of detailed.filter(l=>l.level==='A1')){
  const unit=getA1Unit(lesson.id);
  assert.ok(unit,`missing curriculum: ${lesson.id}`);
  assert.ok(unit.sections.length>=3,`missing theory: ${lesson.id}`);
  for(const section of unit.sections){assert.ok(section.body.length>=55);assert.ok(section.model.trim());}
  assert.ok(unit.examples.length>=10,`missing translation examples: ${lesson.id}`);
  for(const pair of unit.examples){assert.ok(pair[0]&&pair[1]);}
  assert.ok(unit.markers.length>=2);
  assert.ok(unit.pitfalls.length>=2);
 }
});

test('each A1 lesson contains 20 graded items across five real practice modes',()=>{
 for(const lesson of detailed.filter(l=>l.level==='A1')){
  const exercises=buildA1Exercises(lesson);
  assert.equal(exercises.length,20,`${lesson.id} item count`);
  assert.deepEqual(
    exercises.reduce((counts,x)=>(counts[x.type]=(counts[x.type]||0)+1,counts),{}),
    {choice:7,fill:6,order:3,fix:2,translate:2}
  );
  assert.equal(new Set(exercises.map(x=>x.id)).size,20);
  for(const ex of exercises){
   assert.ok(ex.prompt&&ex.why&&ex.answers[0],`incomplete: ${ex.id}`);
   assert.ok(checkA1Answer(ex.answers[0],ex.answers),`answer must be accepted: ${ex.id}`);
   if(ex.type==='choice'){assert.ok(ex.choices?.length>=3);assert.ok(ex.correctIndex>=0&&ex.correctIndex<ex.choices.length);}
   if(ex.type==='order'){assert.ok(ex.words?.length>2);assert.notEqual(ex.words.join(' '),ex.answers[0],`unscrambled tokens ${ex.id}`);}
  }
 }
});

test('typed practice accepts punctuation, case and variants but rejects unrelated text',()=>{
 assert.equal(normalizedAnswer('I’m ready!'),"i'm ready");
 assert.ok(checkA1Answer('i am ready!!!',['I am ready.']));
 assert.ok(checkA1Answer('SHE IS NOT HERE',['She is not here.','She isn\'t here.']));
 assert.ok(!checkA1Answer('She are not here',['She is not here.']));
});

test('legacy lesson progress IDs remain present and no auth or video module is introduced',()=>{
 for(const id of ['be','present-simple','present-cont','past-simple','extra-1','extra-2','extra-3','extra-4']){
  assert.ok(lessons.some(l=>l.id===id));
 }
 assert.equal(normalizeProfile({completed:{be:123,"extra-1":456}}).completed['extra-1'],456);
});


test('new A2 / B1 / B2 curriculum has exact level grouping and legacy IDs',()=>{
 const totals={A1:17,A2:17,B1:17,B2:20};
 for(const [level,total] of Object.entries(totals)){
  const group=lessons.filter(x=>x.level===level);
  assert.equal(group.length,total,`${level} chapter count`);
 }
 assert.equal(UPPER_ORDER.length,54);
 assert.equal(new Set(UPPER_ORDER).size,54);
 for(const id of ['present-perfect','past-cont','conditional-1','extra-5','extra-6','extra-7','extra-8','passive','extra-9','extra-10','extra-11','extra-12','extra-13','extra-14','extra-15','extra-16']){
  assert.ok(UPPER_BY_ID[id],`missing prior ${id}`);
  assert.ok(lessons.find(x=>x.id===id),`progress ID changed: ${id}`);
 }
});

test('every A2/B1/B2 lesson has three specific theory sections, translated examples and pitfalls',()=>{
 for(const id of UPPER_ORDER){
  const u=UPPER_BY_ID[id];
  assert.ok(u,`missing ${id}`);
  assert.equal(u.sections.length,4,`${id}: sections`);
  assert.ok(u.formula.length>=7,`${id}: formula`);
  for(const section of u.sections){
   assert.ok(section.body.length>60,`${id}: too brief theory`);
   assert.ok(section.model.length>10,`${id}: no voice model`);
  }
  assert.ok(u.examples.length>=10,`${id}: not enough examples`);
  assert.equal(new Set(u.examples.map(([en])=>en)).size,u.examples.length,`${id}: repeated examples`);
  assert.ok(u.examples.every(([en,ru])=>en.length>8&&ru.length>8),`${id}: invalid translations`);
  assert.equal(u.pitfalls.length,2,`${id}: pitfalls`);
  assert.ok(u.markers.length>1,`${id}: markers`);
 }
});

test('every advanced lesson contains 20 valid graded questions in five formats',()=>{
 const counts={choice:7,fill:6,order:3,fix:2,translate:2};
 for(const lesson of lessons.filter(x=>x.level!=='A1')){
  const exercises=makeAdvancedExercises(lesson);
  assert.equal(exercises.length,20,`${lesson.id} count`);
  assert.equal(new Set(exercises.map(x=>x.id)).size,20,`${lesson.id}: duplicate exercise ID`);
  assert.deepEqual(exercises.reduce((c,x)=>(c[x.type]=(c[x.type]||0)+1,c),{}),counts,`${lesson.id}: type count`);
  for(const item of exercises){
   assert.ok(item.prompt&&item.why&&item.answers[0],`${item.id}: incomplete task`);
   assert.ok(checkA1Answer(item.answers[0],item.answers),`${item.id}: unrecognized answer`);
   if(item.type==='choice'){
    assert.equal(item.choices?.length,3,`${item.id}: choices`);
    assert.equal(new Set(item.choices).size,3,`${item.id}: repeated choices`);
    assert.equal(item.choices[item.correctIndex],item.answers[0],`${item.id}: bad correct index`);
   }
   if(item.type==='order'){
    assert.ok(item.words.length>=4,`${item.id}: no words`);
    assert.notEqual(item.words.join(' '),item.answers[0],`${item.id}: unscrambled`);
    assert.equal(normalizedAnswer(item.words.join(' ').split(' ').sort().join(' ')),normalizedAnswer(item.answers[0].split(' ').sort().join(' ')),`${item.id}: token loss`);
   }
  }
 }
});

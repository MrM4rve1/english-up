import test from 'node:test';
import assert from 'node:assert/strict';
import {words,lessons} from '../lib/content.ts';
import {initial,nextReview,normalizeProfile} from '../lib/storage.ts';
import {acceptableAnswer,choiceOptions,contextPrompt,getSession,parseVocabularyCsv,sentenceTokens,vocabularyToCsv} from '../lib/vocab-tools.ts';
import {dailyPlan,weakestLesson} from '../lib/daily-plan.ts';

const now=new Date(2026,10,23,14).getTime();
const today='2026-11-23';
test('new curated vocabulary extends the existing dictionary without breaking IDs',()=>{
 assert.ok(words.length>=500,`Expected 500+ genuine entries, got ${words.length}`);
 assert.equal(new Set(words.map(w=>w.id)).size,words.length);
 for(const [level,count] of [['A1',150],['A2',140],['B1',100],['B2',75]])assert.ok(words.filter(w=>w.level===level).length>=count);
 for(const w of words){assert.ok(w.en&&w.ru&&w.example&&w.translation&&w.topic);}
 for(const legacy of ['hello','tomorrow','schedule','chargeback'])assert.ok(words.some(w=>w.id===legacy),`Legacy word ID missing: ${legacy}`);
 assert.equal(lessons.length,71);
});
test('multiple choice contains one right answer and distinct distractors',()=>{
 for(const w of words.slice(0,50)){
  const opts=choiceOptions(w,words);
  assert.equal(opts.length,4);
  assert.equal(new Set(opts).size,4);
  assert.equal(opts.filter(x=>x===w.ru).length,1);
 }
});
test('session prioritizes due reviews and enforces daily introduction count',()=>{
 const fresh=words.find(w=>w.level==='A2');const due=words.filter(w=>w.level==='A2')[1];
 const oldProfile=normalizeProfile({...initial,level:'A2',dailyWords:5,reviews:{[due.id]:{due:now-5000,last:now-86_400_000,first:now-86_400_000,interval:1,ease:2.5,reps:1}}});
 const plan=getSession(words,oldProfile,{level:'A2',topic:'Все'},now,today);
 assert.equal(plan.session[0].id,due.id);
 assert.equal(plan.due.length,1);
 assert.equal(plan.fresh.length,5);
 assert.equal(plan.session.length,6);
 assert.ok(plan.fresh.some(w=>w.id===fresh.id));
 const seen=words.filter(w=>w.level==='A2').slice(0,5);
 const profile=normalizeProfile({...initial,dailyWords:5,reviews:Object.fromEntries(seen.map(w=>[w.id,{first:now,interval:1,ease:2.5,reps:1,due:now+100000,last:now}]))});
 assert.equal(getSession(words,profile,{level:'A2',topic:'Все'},now,today).fresh.length,0);
});
test('answer checker is case-insensitive but does not silently accept incorrect grammar',()=>{
 assert.ok(acceptableAnswer('  I’m here!  ',"I'm here."));
 assert.ok(acceptableAnswer('Hello!!','hello'));
 assert.ok(!acceptableAnswer('I is here', 'I am here'));
});
test('sentence puzzle keeps the tokens and changes order',()=>{
 const phrase='I am learning American English today.';
 const tokens=sentenceTokens(phrase,'practice');
 assert.equal(tokens.length,6);
 assert.notEqual(tokens.join(' '),phrase);
 assert.deepEqual(tokens.slice().sort(),phrase.split(' ').sort());
});
test('context puzzle blanks only the actual expression',()=>{
 const prompt=contextPrompt({id:'x',level:'A1',topic:'Дом',en:'door',ru:'дверь',example:'Close the door, please.',translation:'Закрой дверь, пожалуйста.'});
 assert.deepEqual(prompt,{masked:'Close the ______, please.',answer:'door'});
 assert.equal(contextPrompt({id:'y',level:'A1',topic:'Еда',en:'apple',ru:'яблоко',example:'She likes fruit.',translation:'Она любит фрукты.'}),null);
});
test('personal CSV import and export preserve quoted fields and skip duplicates',()=>{
 const item={id:'custom:follow through',en:'follow through',ru:'доводить до конца',level:'B2',topic:'Мои слова',example:'Please follow through, even if it is difficult.',translation:'Пожалуйста, доведи дело до конца, даже если это трудно.'};
 const source=vocabularyToCsv([item]);
 assert.ok(source.includes('en;ru;level;topic;example;translation'));
 const imported=parseVocabularyCsv(source,words);
 assert.equal(imported.added.length,1);
 assert.equal(imported.added[0].example,item.example);
 assert.deepEqual(parseVocabularyCsv(source,[...words,item]).added,[]);
 assert.deepEqual(parseVocabularyCsv('en;ru;level\n\"yes, please\";\"да, пожалуйста\";A1',words).added[0].ru,'да, пожалуйста');
 assert.throws(()=>parseVocabularyCsv('foo;bar\n1;2',words),/en и ru/);
});
test('previous profile data and progress remain usable, new local dictionary is optional',()=>{
 const old={level:'B1',xp:500,completed:{be:12345,'extra-1':67890},reviews:{hello:{due:now,interval:1,ease:2.5,reps:1,last:now}},savedWords:['hello'],activity:{'2026-11-22':5},errors:[]};
 const p=normalizeProfile(old);
 assert.equal(p.xp,500);assert.deepEqual(p.completed,old.completed);assert.ok(p.reviews.hello);assert.deepEqual(p.savedWords,['hello']);
 assert.deepEqual(p.customWords,[]);assert.deepEqual(p.dailyDone,{});
});
test('daily study plan respects the time setting and uses learning errors',()=>{
 for(const minutes of [15,30,45,60,90]){
  const plan=dailyPlan({...initial,dailyMinutes:minutes},3);
  assert.equal(plan.reduce((sum,x)=>sum+x.minutes,0),minutes);
  assert.equal(new Set(plan.map(x=>x.id)).size,plan.length);
  assert.ok(plan.every(x=>x.title&&x.description&&x.minutes>0));
 }
 const withErrors={...initial,errors:[{lesson:'Present Simple',lessonId:'present-simple',question:'q',why:'why',date:now}]};
 assert.equal(weakestLesson(withErrors),'present-simple');
 assert.match(dailyPlan(withErrors,2).find(x=>x.id==='grammar').title,/слабую/i);
});

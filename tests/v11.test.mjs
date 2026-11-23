import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {words,lessons} from '../lib/content.ts';
import {v11Vocabulary} from '../lib/vocab-v11.ts';
import {placementItems,b2ExamItems,assess,assessmentRate,isAssessmentResult} from '../lib/assessments.ts';
import {initial,normalizeProfile,nextReview} from '../lib/storage.ts';
import {achievements} from '../lib/achievements.ts';

test('v11 keeps 71 lessons, legacy identifiers and raises editorial vocabulary',()=>{
 assert.equal(lessons.length,71);
 assert.ok(words.length>=1000,`actual ${words.length}`);
 assert.equal(new Set(words.map(w=>w.en.toLowerCase())).size,words.length);
 for(const id of ['hello','transaction','chargeback','schedule'])assert.ok(words.some(w=>w.id===id));
 assert.ok(v11Vocabulary.length>=330);
 const retained=v11Vocabulary.filter(entry=>words.some(w=>w.en.toLowerCase()===entry.en.toLowerCase()));
 assert.equal(retained.length,v11Vocabulary.length);
});
test('each editorial entry has authored bilingual example and stable ID',()=>{
 for(const w of v11Vocabulary){assert.match(w.id,/^editorial-v11:/);assert.ok(w.ru.length>2&&w.en.length>1);
  assert.ok(w.example.length>=15,w.en);assert.ok(w.translation.length>=9,w.en);assert.ok(w.topic.length>=2);assert.ok(['A1','A2','B1','B2'].includes(w.level));}
 assert.equal(new Set(v11Vocabulary.map(w=>w.en.toLowerCase())).size,v11Vocabulary.length);
});
test('placement covers grammar, vocabulary, reading and listening across all four CEFR levels',()=>{
 assert.equal(placementItems.length,48);assert.equal(b2ExamItems.length,24);
 for(const level of ['A1','A2','B1','B2'])for(const kind of ['grammar','vocabulary','reading','listening'])assert.ok(placementItems.some(q=>q.level===level&&q.kind===kind));
 assert.ok(b2ExamItems.every(q=>q.level==='B2'));
});
test('all assessment questions have one valid answer and nonempty grounded context',()=>{
 for(const q of [...placementItems,...b2ExamItems]){
  assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4,`duplicate options: ${q.id}`);assert.ok(q.answer>=0&&q.answer<4);
  assert.ok(q.explanation.trim().length>=12);assert.ok(q.prompt.trim().length>=9);
  if(q.kind==='reading')assert.ok(q.passage?.length>50);if(q.kind==='listening')assert.ok(q.audio?.length>40);
 }
});
test('assessment scoring uses correct answer keys and never automatically certifies B2',()=>{
 const answers=Object.fromEntries(placementItems.map(q=>[q.id,q.answer]));
 const perfect=assess('placement',placementItems,answers,false,1700000000000);
 assert.equal(perfect.correct,48);assert.equal(perfect.total,48);assert.equal(perfect.estimatedLevel,'B2');
 assert.equal(perfect.byKind.grammar.correct,perfect.byKind.grammar.total);
 assert.ok(!('officialCertificate' in perfect));assert.equal(assessmentRate(perfect),100);
 const zero=assess('placement',placementItems,{},false,1700000000000);
 assert.equal(zero.correct,0);assert.equal(zero.estimatedLevel,'A1');
});
test('level recommendation follows progression, not isolated advanced answers',()=>{
 const onlyB2=Object.fromEntries(placementItems.filter(q=>q.level==='B2').map(q=>[q.id,q.answer]));
 assert.equal(assess('placement',placementItems,onlyB2).estimatedLevel,'A1');
 const a1a2=Object.fromEntries(placementItems.filter(q=>['A1','A2'].includes(q.level)).map(q=>[q.id,q.answer]));
 assert.equal(assess('placement',placementItems,a1a2).estimatedLevel,'A2');
});
test('B2 exam records listening transcript access and receptive score only',()=>{
 const answers=Object.fromEntries(b2ExamItems.map(q=>[q.id,q.answer]));
 const result=assess('b2',b2ExamItems,answers,true,1700000000000);
 assert.equal(result.correct,24);assert.equal(result.estimatedLevel,undefined);assert.equal(result.transcriptOpened,true);
 assert.equal(result.byKind.listening.total,4);
});
test('v11 profile migration preserves vocabulary reviews, lessons and AI history',()=>{
 const original=normalizeProfile({...initial,level:'B1',xp:1450,completed:{be:1234,'extra-1':5678},reviews:{hello:nextReview(undefined,2,1700000000000)},savedWords:['hello'],assessmentDrafts:{'b2-writing':'Draft email'},assessments:{placement:assess('placement',placementItems,{})}});
 const restored=normalizeProfile(JSON.parse(JSON.stringify(original)));
 assert.equal(restored.xp,1450);assert.equal(restored.level,'B1');assert.equal(restored.completed.be,1234);assert.equal(restored.reviews.hello.reps,1);
 assert.equal(restored.assessments.placement.total,48);assert.equal(restored.assessmentDrafts['b2-writing'],'Draft email');
 const old=normalizeProfile({xp:500,level:'A2',reviews:{hello:nextReview(undefined,2,1700000000000)}});
 assert.deepEqual(old.assessments,{});assert.deepEqual(old.assessmentDrafts,{});assert.equal(old.xp,500);
});
test('achievements are derived from real learning progress without duplicating XP',()=>{
 const blank=achievements(initial);assert.ok(blank.length>=10);assert.ok(blank.every(a=>!a.achieved));
 const done=achievements({...initial,completed:{be:1},reviews:{hello:nextReview(undefined,2,1700000000000)},assessments:{placement:assess('placement',placementItems,{})}});
 assert.equal(done.find(a=>a.id==='first-lesson')?.achieved,true);assert.equal(done.find(a=>a.id==='assessment')?.achieved,true);
 assert.equal(done.find(a=>a.id==='words-20')?.achieved,false);
});
test('PWA manifest icons and worker are present and avoid caching AI endpoints',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../public/manifest.webmanifest',import.meta.url),'utf8'));
 assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
 assert.ok(manifest.icons.some(i=>i.sizes==='192x192'));assert.ok(manifest.icons.some(i=>i.sizes==='512x512'));
 for(const file of ['icon-192.png','icon-512.png'])assert.ok(statSync(new URL(`../public/${file}`,import.meta.url)).size>200);
 const worker=readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');assert.match(worker,/self\.registration\.scope/);assert.match(worker,/req\.method!=='GET'/);
 assert.doesNotMatch(worker,/OPENAI_API_KEY|localStorage/);
});

test('corrupt assessment data is discarded on import without losing legacy progress',()=>{
 const clean=assess('placement',placementItems,{});
 assert.equal(isAssessmentResult(clean,'placement'),true);
 assert.equal(isAssessmentResult({...clean,byKind:{}},'placement'),false);
 assert.equal(isAssessmentResult({...clean,correct:999},'placement'),false);
 const restored=normalizeProfile({xp:740,completed:{be:50},assessments:{placement:{...clean,byKind:{}}}});
 assert.equal(restored.xp,740);assert.equal(restored.completed.be,50);assert.deepEqual(restored.assessments,{});
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {performance} from 'node:perf_hooks';
import {mergeUniqueWords} from '../lib/vocab-tools.ts';
import {getSessionTenseTasks,tenses} from '../lib/tenses.ts';
import {offlineNextLine,offlineProgress,offlineFollowUps,offlineCourseFollowUps} from '../lib/offline-speaking.ts';
import {normalizeProfile} from '../lib/storage.ts';

const src=(file)=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
test('merging more than 5,000 imported words is linear and preserves reviewed originals',()=>{
 const original=[{id:'old',en:'Handle',ru:'обрабатывать'}];
 const bulk=Array.from({length:5500},(_,i)=>({id:'external:'+i,en:'term '+i,ru:'значение '+i}));
 const start=performance.now();
 const merged=mergeUniqueWords([original,bulk,[{id:'new',en:'handle',ru:'другое значение'},...bulk]]);
 assert.equal(merged.length,5501);
 assert.equal(merged[0].id,'old');
 assert.equal(merged[1].id,'external:0');
 assert.ok(performance.now()-start<1500,'5,500 words must not trigger a quadratic UI freeze');
});
test('focus practice opens six tasks even when another level was selected',()=>{
 const tasks=getSessionTenseTasks('mixed','B2','present-simple',{});
 assert.equal(tasks.length,6);
 assert.deepEqual(tasks.map(t=>t.mode),['identify','form','fix','fill','translate','order']);
 assert.ok(tasks.every(t=>t.tenseId==='present-simple'));
});
test('all-level and specific-level Tenses trainer sessions have coherent content',()=>{
 const mixed=getSessionTenseTasks('mixed','all',null,{});
 assert.equal(mixed.length,24);
 assert.equal(new Set(mixed.map(t=>t.tenseId)).size,12);
 const b2=getSessionTenseTasks('mixed','B2',null,{});
 assert.ok(b2.length>0);
 assert.ok(b2.every(t=>t.tenseId&&tenses.find(x=>x.id===t.tenseId)?.level==='B2'));
});
test('overdue tenses show scheduled revision, future reviews are excluded',()=>{
 const now=100000;
 const task=getSessionTenseTasks('review','all',null,{
  'present-simple':{due:now-1,interval:1,ease:2.5,reps:1,last:now-2000},
  'future-simple':{due:now+5000,interval:1,ease:2.5,reps:1,last:now}
 },now);
 assert.equal(task.length,3);
 assert.ok(task.every(x=>x.tenseId==='present-simple'));
});
test('offline conversations have real steps and are explicitly scripted, not fabricated AI replies',()=>{
 assert.equal(Object.keys(offlineFollowUps).length,11);
 for(const [id,turns] of Object.entries(offlineFollowUps)){
  assert.equal(turns.length,3,id);
  assert.equal(new Set(turns).size,3,id);
  for(let i=0;i<3;i++)assert.equal(offlineNextLine(id,i),turns[i]);
  assert.equal(offlineNextLine(id,3),null);
  assert.deepEqual(offlineProgress(id,4),{total:4,finished:true});
 }
 assert.ok(offlineCourseFollowUps.work.length===3&&offlineCourseFollowUps.america.length===3);
});
test('new guided conversations work without AI and grade authored choices',()=>{
 const code=src('components/dialogue-practice.tsx');
 assert.match(code,/dialogueScore/);assert.match(code,/setChoice/);assert.match(code,/onComplete\('dialogue:'/);
 assert.match(code,/Это не ИИ/);assert.match(code,/SpeechRecognition/);
 assert.doesNotMatch(code,/fetch\(|OPENAI_API_KEY/);
});
test('Listening selection now identifies each actual line and updates dictation target',()=>{
 const code=src('components/listening-v13.tsx');
 assert.match(code,/spokenLine\(v\)\.slice/);
 assert.match(code,/Выбрана реплика \{line\+1\}/);
 assert.match(code,/const current=spokenLine\(unit\.lines\[line\]/);
 assert.match(code,/function switchLine\(i:number\)/);
 assert.match(code,/setScore\(null\)/);
});
test('Writing and API panels are removed while Listening stays usable',()=>{
 const code=src('components/skills.tsx');const page=src('app/page.tsx');
 assert.doesNotMatch(code,/export function WritingSkills|AIWritingReviewPanel/);
 assert.doesNotMatch(page,/tab==='writing'|tab==='ai'/);
 assert.match(code,/ListeningLab/);
});
test('grammar and tenses reveal the newly opened training on click',()=>{
 assert.match(src('components/a1-lesson.tsx'),/window\.scrollTo\(\{top:0,behavior:'smooth'\}\)/);
 assert.match(src('components/tenses-trainer.tsx'),/practiceRef\.current\?\.scrollIntoView/);
});
test('local progress key is unchanged and legacy profile is normalized',()=>{
 const original={level:'A2',completed:{'a1-present-simple':1733445544551},xp:345,reviews:{old:{due:1,interval:1,ease:2.5,reps:1,last:1}},savedWords:['old'],aiHistory:{'teacher:free':[{role:'user',content:'Hello',at:1},{role:'assistant',content:'Hi!',at:2}]}};
 const restored=normalizeProfile(original);
 assert.equal(restored.xp,345);
 assert.equal(restored.completed['a1-present-simple'],1733445544551);
 assert.equal(restored.reviews.old.interval,1);
 assert.deepEqual(restored.savedWords,['old']);
 assert.equal(restored.aiHistory['teacher:free'].length,2);
 assert.match(src('lib/storage.ts'),/english-up-profile-v1/);
 assert.match(src('app/page.tsx'),/setTimeout\(\(\)=>\{try\{persist\(profile\)/);
});
test('source contains neither user secrets nor remote API routes',()=>{
 const page=src('app/page.tsx');
 assert.doesNotMatch(page,/youtube\.com|youtu\.be|register|signup|login/i);
 assert.equal(existsSync(new URL('../app/api/ai/route.ts',import.meta.url)),false);
 assert.equal(existsSync(new URL('../app/api/audio/route.ts',import.meta.url)),false);
 assert.equal(existsSync(new URL('../.env.local',import.meta.url)),false);
});

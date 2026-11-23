import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {dialogues,dialogueScore,dialoguePassed,dialogueById} from '../lib/dialogues.ts';
import {dailyPlan} from '../lib/daily-plan.ts';
import {normalizeProfile,mergeSkillResult} from '../lib/storage.ts';
const src=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('12 curated conversations cover all levels and two practical domains',()=>{
 assert.equal(dialogues.length,12);
 assert.equal(new Set(dialogues.map(d=>d.id)).size,dialogues.length);
 for(const level of ['A1','A2','B1','B2'])assert.ok(dialogues.some(d=>d.level===level));
 for(const domain of ['america','work'])assert.ok(dialogues.some(d=>d.kind===domain));
 for(const d of dialogues){
  assert.ok(d.goal.length>20&&d.title.length>5);
  assert.equal(d.steps.length,3);
  for(const s of d.steps){
   assert.ok(s.partner.length>15&&s.ru.length>12);
   assert.equal(s.choices.length,3);
   assert.equal(new Set(s.choices.map(c=>c.en)).size,3);
   assert.ok(s.choices.every(c=>c.en.length>=8&&c.reason.length>=12));
   assert.ok([0,1,2].includes(s.answer));
  }
  assert.equal(dialogueScore(d,d.steps.map(s=>s.answer)),3);
  assert.equal(dialogueScore(d,d.steps.map(s=>(s.answer+1)%3)),0);
  assert.equal(dialogueById(d.id)?.id,d.id);
 }
 assert.equal(dialoguePassed(2,3),true);assert.equal(dialoguePassed(1,3),false);
});
test('dialogue score persists in legacy profile with independent local user data',()=>{
 const old=normalizeProfile({xp:550,level:'B1',completed:{be:1700000000000},reviews:{hello:{due:1,interval:1,ease:2.5,reps:2,last:1}}});
 const next=normalizeProfile({...old,skillResults:{'dialogue:support-pending':mergeSkillResult(undefined,2,3,1700000000000)}});
 assert.equal(next.xp,550);assert.equal(next.completed.be,1700000000000);
 assert.equal(next.skillResults['dialogue:support-pending'].score,2);
 assert.ok(next.reviews.hello);
});
test('15–90 minute plans replace Writing with conversational practice and preserve totals',()=>{
 for(const budget of [15,30,45,60,90]){
  const tasks=dailyPlan(normalizeProfile({dailyMinutes:budget}),0);
  assert.equal(tasks.reduce((sum,t)=>sum+t.minutes,0),budget);
  assert.ok(tasks.every(t=>t.tab!=='writing'));
  if(budget>=30)assert.ok(tasks.some(t=>t.tab==='dialogues'));
 }
});
test('pages deployment source is static, scope aware, and has no API routes',()=>{
 const config=src('next.config.mjs'),workflow=src('.github/workflows/pages.yml');
 assert.match(config,/output:'export'/);
 assert.match(config,/basePath/);assert.match(config,/GITHUB_REPOSITORY/);
 assert.match(workflow,/npm run build/);assert.match(workflow,/actions\/deploy-pages/);
 assert.match(workflow,/npm test/);
 assert.equal(existsSync(new URL('../app/api/ai/route.ts',import.meta.url)),false);
 assert.equal(existsSync(new URL('../app/api/audio/route.ts',import.meta.url)),false);
 assert.equal(existsSync(new URL('../.env.local',import.meta.url)),false);
 assert.match(src('public/sw.js'),/self\.registration\.scope/);
 assert.equal(JSON.parse(src('public/manifest.webmanifest')).start_url,'./');
});
test('navigation contains Conversations but neither paid AI Teacher nor Writing',()=>{
 const page=src('app/page.tsx'),dialogue=src('components/dialogue-practice.tsx');
 assert.match(page,/title:'Диалоги'/);assert.match(page,/tab==='dialogues'/);
 assert.doesNotMatch(page,/id:'writing'|id:'ai'|tab==='ai'|tab==='writing'/);
 assert.doesNotMatch(dialogue,/fetch\(|api\.openai\.com|OPENAI_API_KEY/);
 assert.match(dialogue,/speechSynthesis|sayEnglish/);
});

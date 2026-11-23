import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GRAMMAR_RULES,RULE_TOTALS,isRuleTaskCorrect,normalizeRuleAnswer,shuffleRuleTokens} from '../lib/grammar-reference.ts';
import {extraContexts} from '../lib/rule-deep-context.ts';
import {initial,normalizeProfile,mergeSkillResult} from '../lib/storage.ts';

const breakdown={choice:6,fill:2,fix:1,translate:4,order:3,dictation:2};
test('All 49 topics now have 18 actual exercises and 882 total tasks',()=>{
 assert.equal(GRAMMAR_RULES.length,49);assert.equal(RULE_TOTALS.tasks,882);
 for(const rule of GRAMMAR_RULES)assert.equal(rule.tasks.length,18,rule.id);
});
test('Each topic covers five skill phases with 3 new original contextual problems',()=>{
 for(const r of GRAMMAR_RULES){
  const types=r.tasks.reduce((a,t)=>({...a,[t.type]:(a[t.type]||0)+1}),{});
  assert.deepEqual(types,breakdown,r.id);
  const extra=extraContexts[r.id];assert.equal(extra?.length,3,r.id);
  assert.equal(r.tasks.slice(0,6).map(t=>t.id).length,6);
  for(const t of extra)assert.ok(/[А-Яа-яЁё]/.test(t.why),t.id);
 }
});
test('No exercise has reused a task ID; answers validate; wrong ones fail',()=>{
 const ids=[];
 for(const r of GRAMMAR_RULES)for(const t of r.tasks){
  ids.push(t.id);assert.ok(t.answer.trim(),t.id);assert.ok(t.why.length>(t.id.includes("-deep-")?18:5),t.id);
  assert.ok(isRuleTaskCorrect(t,t.answer),t.id);
  assert.ok(!isRuleTaskCorrect(t,'gibberish-123'),t.id);
 }
 assert.equal(new Set(ids).size,ids.length);
});
test('Original six task IDs never change, preserving previous error keys',()=>{
 const r=GRAMMAR_RULES.find(r=>r.id==='articles-a-an');
 assert.deepEqual(r.tasks.slice(0,6).map(t=>t.id),['articles-a-an-c1','articles-a-an-c2','articles-a-an-c3','articles-a-an-f1','articles-a-an-f2','articles-a-an-fix']);
});
test('Order tasks use exact word multiset, are shuffled and can be reconstructed',()=>{
 for(const r of GRAMMAR_RULES)for(const t of r.tasks.filter(t=>t.type==='order')){
  assert.deepEqual([...t.tokens].sort(),t.answer.trim().split(/\s+/).sort(),t.id);
  assert.notDeepEqual(t.tokens,t.answer.trim().split(/\s+/),t.id);
  assert.ok(isRuleTaskCorrect(t,t.answer),t.id);
 }
});
test('Shuffle is deterministic and preserves duplicate words individually',()=>{
 assert.deepEqual(shuffleRuleTokens('we work and we learn','example'),shuffleRuleTokens('we work and we learn','example'));
 assert.deepEqual(shuffleRuleTokens('we work and we learn','example').sort(),['we','work','and','we','learn'].sort());
});
test('Dictations do not expose the original English audio text in the question',()=>{
 for(const r of GRAMMAR_RULES)for(const t of r.tasks.filter(t=>t.type==='dictation')){
  assert.ok(!t.prompt.includes(t.answer),t.id);
  assert.ok(t.hint?.includes('Перевод'),t.id);
 }
});
test('Transfers are grounded in the rule examples and distinguish different skills',()=>{
 for(const r of GRAMMAR_RULES){
  const translations=r.tasks.filter(t=>t.type==='translate');
  assert.deepEqual(translations.map(t=>normalizeRuleAnswer(t.answer)),r.examples.map(e=>normalizeRuleAnswer(e.en)));
  assert.equal(new Set(translations.map(t=>t.prompt)).size,4,r.id);
 }
});
test('Whole sentence checks ignore capitalization and end punctuation',()=>{
 const t=GRAMMAR_RULES.find(r=>r.id==='say-tell-speak-talk').tasks.find(t=>t.type==='translate');
 assert.ok(isRuleTaskCorrect(t,t.answer.toUpperCase().replace(/\.$/,'!!!')));
});
test('Contractions and full forms accepted for unambiguous cases',()=>{
 assert.equal(normalizeRuleAnswer("I don't know."),normalizeRuleAnswer('I do not know'));
 assert.equal(normalizeRuleAnswer('We’ll help!'),normalizeRuleAnswer('We will help'));
});
test('Old six-question success is not reset by new 18-question lessons',()=>{
 const old=normalizeProfile({...initial,ruleResults:{'articles-a-an':{score:5,total:6,at:12,attempts:2}},xp:240,completed:{'present-simple':12},ruleFavorites:['articles-a-an']});
 assert.deepEqual(old.ruleResults['articles-a-an'],{score:5,total:6,at:12,attempts:2});
 const fresh=mergeSkillResult(old.ruleResults['articles-a-an'],16,18,13);
 assert.equal(fresh.attempts,3);assert.equal(fresh.score,16);assert.equal(fresh.total,18);
 assert.equal(old.xp,240);assert.deepEqual(old.ruleFavorites,['articles-a-an']);
});
test('UI implements word chips, translation self-check, audio, mistake-only practice',()=>{
 const ui=fs.readFileSync(new URL('../components/grammar-reference.tsx',import.meta.url),'utf8');
 for(const token of ['orderSelected','removeOrderPart','startMistakeReview','acceptAlternative','task.type===\'dictation\'','sayEnglish(task.answer)','onMistake(rule,task)','onFinish(rule,score,tasks.length)'])assert.ok(ui.includes(token),token);
});
test('No new account or YouTube introduced',()=>{
 const ui=fs.readFileSync(new URL('../components/grammar-reference.tsx',import.meta.url),'utf8').toLowerCase();
 assert.ok(!ui.includes('youtube.com'));assert.ok(!ui.includes('sign up'));
});

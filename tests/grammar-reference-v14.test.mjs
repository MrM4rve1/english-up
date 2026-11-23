import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GRAMMAR_RULES,RULE_CATEGORIES,RULE_TOTALS,filterGrammarRules,normalizeRuleAnswer,isRuleTaskCorrect} from '../lib/grammar-reference.ts';
import {initial,normalizeProfile,mergeSkillResult} from '../lib/storage.ts';

test('Reference consists of 49 original Russian-language topical rules with stable unique ids',()=>{
 assert.equal(GRAMMAR_RULES.length,49);
 assert.equal(new Set(GRAMMAR_RULES.map(r=>r.id)).size,49);
 assert.ok(GRAMMAR_RULES.every(r=>/^[a-z0-9-]+$/.test(r.id)));
 assert.deepEqual([...new Set(GRAMMAR_RULES.map(r=>r.level))].sort(),['A1','A2','B1','B2']);
});
test('Every rule has teachable notes, comparisons, translations and typical errors',()=>{
 for(const r of GRAMMAR_RULES){
  assert.ok(r.brief.length>20,r.id);
  assert.ok(r.notes.length>=2 && r.notes.every(n=>n.length>30),r.id);
  assert.ok(r.uses.length>=3,r.id);
  assert.equal(r.examples.length,4,r.id);
  assert.ok(r.examples.every(e=>e.en.length>10&&e.ru.length>9),r.id);
  assert.ok(r.mistake.wrong!==r.mistake.right,r.id);
  assert.ok(r.mistake.why.length>15,r.id);
 }
});
test('All tasks carry valid unique keys and real explanations',()=>{
 const ids=[];
 for(const rule of GRAMMAR_RULES){
  assert.equal(rule.tasks.length,18,rule.id);
  assert.deepEqual(rule.tasks.slice(0,6).map(t=>t.type),['choice','choice','choice','fill','fill','fix']);
  for(const item of rule.tasks){
   ids.push(item.id);assert.ok(item.prompt.length>8,item.id);
   assert.ok(item.why.length>10,item.id);
   assert.ok(item.answer.length>0,item.id);
   assert.ok(isRuleTaskCorrect(item,item.answer),item.id);
   if(item.type==='choice'){
    assert.equal(item.options.length,3,item.id);
    assert.equal(new Set(item.options).size,3,item.id);
    assert.equal(item.options.filter(o=>o===item.answer).length,1,item.id);
   }
  }
 }
 assert.equal(new Set(ids).size,ids.length);
 assert.equal(RULE_TOTALS.tasks,882);assert.equal(RULE_TOTALS.examples,196);
});
test('Important foundational rules appear in the reference',()=>{
 const ids=new Set(GRAMMAR_RULES.map(r=>r.id));
 ['articles-a-an','articles-the-zero','personal-pronouns','possessive-pronouns','much-many','few-little','in-on-at-time','in-on-at-place','verb-prepositions','say-tell-speak-talk','make-do','do-does','indirect-questions','reported-speech','modal-perfect','causative'].forEach(id=>assert.ok(ids.has(id),id));
});
test('Search and filters include English terms, Russian terms and usage phrases',()=>{
 assert.ok(filterGrammarRules({search:'say'}).some(r=>r.id==='say-tell-speak-talk'));
 assert.ok(filterGrammarRules({search:'местоимения'}).some(r=>r.id==='personal-pronouns'));
 assert.ok(filterGrammarRules({search:'good at'}).some(r=>r.id==='adjective-prepositions'));
 assert.ok(filterGrammarRules({level:'B2'}).length>=4);
 assert.ok(filterGrammarRules({category:'Предлоги'}).length>=5);
 assert.equal(filterGrammarRules({level:'A1',category:'Предлоги'}).length>=2,true);
 assert.deepEqual(filterGrammarRules({search:'no_such_topic'}),[]);
 assert.equal(RULE_CATEGORIES.length,10);
});
test('Answers are checked with case, whitespace, punctuation and straight/smart apostrophes normalized',()=>{
 assert.equal(normalizeRuleAnswer('  SHE   doesn’t WORK. '),'she does not work');
 const t=GRAMMAR_RULES.find(r=>r.id==='say-tell-speak-talk').tasks[0];
 assert.ok(isRuleTaskCorrect(t,t.answer.toUpperCase()+'!'));
 assert.ok(!isRuleTaskCorrect(t,'this is definitely wrong'));
});
test('Previous v13.1 progress is unchanged after migration to reference fields',()=>{
 const old={...initial,completed:{be:123456,'present-simple':123456},savedWords:['word-x'],xp:970,activity:{'2026-11-22':35},errors:[{lesson:'Old',question:'How?',why:'Reason',date:0}],aiHistory:{},ruleResults:undefined,ruleFavorites:undefined};
 const migrated=normalizeProfile(old);
 assert.equal(migrated.xp,970);assert.equal(migrated.completed.be,123456);
 assert.deepEqual(migrated.savedWords,['word-x']);
 assert.deepEqual(migrated.ruleResults,{});assert.deepEqual(migrated.ruleFavorites,[]);
 assert.equal(migrated.errors.length,1);
});
test('Reference results survive export/import and retain the best score',()=>{
 const old=normalizeProfile({...initial,ruleResults:{'say-tell-speak-talk':{score:5,total:6,at:1700,attempts:1}},ruleFavorites:['say-tell-speak-talk']});
 const imported=normalizeProfile(JSON.parse(JSON.stringify(old)));
 assert.ok(imported.ruleFavorites.includes('say-tell-speak-talk'));
 const result=mergeSkillResult(imported.ruleResults['say-tell-speak-talk'],2,6,2000);
 assert.equal(result.score,5);assert.equal(result.attempts,2);
 const better=mergeSkillResult(result,6,6,2500);assert.equal(better.score,6);
});
test('Malformed rule results and favorites are cleaned without touching other profile data',()=>{
 const p=normalizeProfile({...initial,xp:33,ruleFavorites:['say-tell-speak-talk','say-tell-speak-talk',12,'!!!'],ruleResults:{'say-tell-speak-talk':{score:3,total:6,at:10,attempts:1},'bad!':{score:9,total:6,at:10,attempts:1}}});
 assert.equal(p.ruleFavorites.length,1);assert.equal(p.xp,33);assert.equal(Object.keys(p.ruleResults).length,1);
});
test('Reference is linked into grammar, navigation, dashboard, and errors',()=>{
 const page=fs.readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 const grammar=fs.readFileSync(new URL('../components/grammar.tsx',import.meta.url),'utf8');
 const errors=fs.readFileSync(new URL('../components/error-review.tsx',import.meta.url),'utf8');
 assert.ok(page.includes("id:'reference' as Tab"));assert.ok(page.includes('<GrammarReference results={profile.ruleResults}'));
 assert.ok(grammar.includes('onOpenReference'));assert.ok(errors.includes("source==='reference'"));
});
test('The project does not restore YouTube or sign-up workflows',()=>{
 const page=fs.readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8').toLowerCase();
 assert.ok(!page.includes('youtube.com'));
 assert.ok(!page.includes('register('));
});

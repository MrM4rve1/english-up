import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {words,lessons} from '../lib/content.ts';
import {v10Vocabulary,scenarioVocabulary} from '../lib/vocab-v10.ts';
import {PUBLIC_VOCAB_URL,parsePublicVocabulary,countVocabulary,approximateLevel} from '../lib/public-vocabulary.ts';
import {normalizeProfile,initial,nextReview} from '../lib/storage.ts';
import {getSession} from '../lib/vocab-tools.ts';
import {usIpa} from '../lib/us-ipa.ts';

const now=new Date(2026,10,23,14).getTime();
test('v10 editorial additions preserve all old vocabulary and lesson IDs',()=>{
 assert.ok(words.length>=750,`expected 750+, got ${words.length}`);
 assert.equal(new Set(words.map(w=>w.en.toLowerCase())).size,words.length);
 assert.ok(v10Vocabulary.length>=170);
 assert.equal(scenarioVocabulary.length,120);
 for(const id of ['hello','chargeback','schedule','transaction'])assert.ok(words.some(w=>w.id===id));
 for(const level of ['A1','A2','B1','B2'])assert.ok(words.filter(w=>w.level===level).length>=100);
 assert.equal(lessons.length,71);
});
test('every new self-authored card has explanatory example and translation',()=>{
 for(const w of v10Vocabulary){
  assert.ok(w.en&&w.ru&&w.example&&w.translation&&w.topic);
  assert.ok(w.example.length>=8&&w.translation.length>=8);
 }
 for(const w of scenarioVocabulary)assert.ok(w.example&&w.translation);
});
test('General American pronunciation hints do not fabricate unavailable entries',()=>{
 for(const w of words.slice(0,40))assert.ok(usIpa(w.en));
 assert.ok(usIpa('hello')?.includes('ˈ'));
 assert.equal(usIpa('this is not present in dictionary xyzzy'),null);
});
test('public dictionary import parses en - ru, preserves hyphens, filters invalid and duplicates',()=>{
 const sample=['hello - привет','two-factor - двухфакторный','service desk - служба поддержки',
  'no translation','password - —','<script> - уязвимость','good - хороший',
  'two-factor - двухфакторный','white - белый',''].join('\n');
 const parsed=parsePublicVocabulary(sample,words);
 assert.ok(parsed.duplicates>=1);
 assert.ok(parsed.words.some(w=>w.en==='two-factor'));
 assert.ok(parsed.words.some(w=>w.en==='service desk'));
 assert.ok(parsed.skipped>=3);
 assert.ok(parsed.words.every(w=>w.id.startsWith('public-v10:')&&w.source==='external'&&!w.example));
 assert.ok(PUBLIC_VOCAB_URL.startsWith('https://raw.githubusercontent.com/'));
});
test('full external import can hold 5 000 unique cards, without changing legacy reviews',()=>{
 const lemma=i=>{let s='';i+=1;while(i){s=String.fromCharCode(97+i%26)+s;i=Math.floor(i/26);}return 'vocab'+s;};
 const corpus=Array.from({length:5312},(_,i)=>`${lemma(i)} - дополнительное слово ${i}`).join('\n');
 const imported=parsePublicVocabulary(corpus,words);
 assert.equal(imported.words.length,5312);
 assert.ok(countVocabulary(words,imported.words)>=5000);
 assert.equal(new Set(imported.words.map(w=>w.id)).size,imported.words.length);
 const legacy=normalizeProfile({...initial,level:'B1',xp:1400,completed:{'be':1000},
  reviews:{hello:nextReview(undefined,2,now)},savedWords:['hello'],customWords:[],aiHistory:{},externalWords:imported.words});
 const restored=normalizeProfile(JSON.parse(JSON.stringify(legacy)));
 assert.equal(restored.externalWords.length,5312);
 assert.equal(restored.xp,1400);
 assert.deepEqual(restored.completed,{'be':1000});
 assert.deepEqual(restored.savedWords,['hello']);
 assert.ok(restored.reviews.hello);
 const sampleWords=imported.words.slice(0,10);
 const learning=normalizeProfile({...initial,level:'A1',dailyWords:5,externalWords:sampleWords});
 const session=getSession(sampleWords,learning,{level:'A1',topic:'Все'},now,'2026-11-23');
 assert.equal(session.fresh.length,5);
});
test('public vocabulary import enforces maximum size, rejects unsafe strings and shows level disclaimer',()=>{
 assert.throws(()=>parsePublicVocabulary('x'.repeat(1_500_001),[]),/максимум/);
 assert.deepEqual(['A1','A2','B1','B2'].map((_,i)=>approximateLevel([0,750,1950,3450][i])),['A1','A2','B1','B2']);
 const component=readFileSync(new URL('../components/vocabulary.tsx',import.meta.url),'utf8');
 assert.match(component,/Подключить большую базу/);
 assert.match(component,/примерно|приблизительн/);
 assert.match(component,/CC BY-NC 4\.0/);
 assert.match(component,/visibleWords\.map/);
 assert.match(component,/onChange\(\{externalWords:imported\.words\}\)/);
});
test('legacy v9 validation code still supports profile without externalWords',()=>{
 const p=normalizeProfile({level:'A2',completed:{'present-simple':100},savedWords:['schedule'],reviews:{},errors:[],xp:122});
 assert.deepEqual(p.externalWords,[]);
 assert.equal(p.xp,122);
 assert.equal(p.completed['present-simple'],100);
 assert.deepEqual(p.savedWords,['schedule']);
});

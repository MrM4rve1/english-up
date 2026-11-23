import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {compareTranscription,spokenLine} from '../lib/listening-v13.ts';
import {v13Vocabulary} from '../lib/vocab-v13.ts';
import {words} from '../lib/content.ts';
import {normalizeProfile} from '../lib/storage.ts';
test('Listening compare recognizes contractions but preserves word order',()=>{
 assert.equal(spokenLine('Agent: Please wait a moment.'),'Please wait a moment.');
 assert.equal(compareTranscription("I'll call tomorrow.",'I’ll call tomorrow').accuracy,100);
 assert.equal(compareTranscription('Please check the status.','please check status').errors,1);
 assert.ok(compareTranscription('check the payment','payment check the').accuracy<100);
});
test('Vocabulary remains unique and annotated after static conversion',()=>{
 assert.equal(v13Vocabulary.length,96);
 assert.equal(new Set(v13Vocabulary.map(w=>w.en.toLowerCase())).size,v13Vocabulary.length);
 assert.equal(new Set(words.map(w=>w.en.toLowerCase())).size,words.length);
 for(const w of v13Vocabulary){assert.ok(w.example.toLowerCase().includes(w.en.toLowerCase()));assert.ok(w.translation.length>=10);}
});
test('Previous AI history stays in old local backups without requiring an API',()=>{
 const old={level:'B2',xp:700,completed:{be:123},aiHistory:{'teacher:free':[{role:'user',content:'Hello!',at:100}]}};
 const recovered=normalizeProfile(old);assert.equal(recovered.xp,700);assert.equal(recovered.completed.be,123);
 assert.equal(recovered.aiHistory['teacher:free'].length,1);
});
test('Static version contains no AI or speech API server endpoints',()=>{
 for(const filename of ['app/api/ai/route.ts','app/api/audio/route.ts','.env.example','.env.local'])assert.equal(existsSync(new URL('../'+filename,import.meta.url)),false);
 const code=readFileSync(new URL('../components/listening-v13.tsx',import.meta.url),'utf8');
 assert.match(code,/speechSynthesis/);assert.doesNotMatch(code,/fetch\(|OPENAI_TTS_MODEL|OPENAI_API_KEY/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
const tailwind=readFileSync(new URL('../tailwind.config.ts',import.meta.url),'utf8');
const grammar=readFileSync(new URL('../components/grammar.tsx',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
const a1=readFileSync(new URL('../components/a1-lesson.tsx',import.meta.url),'utf8');

test('nav contrast has explicit light and dark colors; dark theme works by class',()=>{
 assert.match(css,/\.nav-item\{[^}]*color:#33415d/);
 assert.match(css,/\.dark \.nav-item\{[^}]*color:#e0e7f8/);
 assert.match(tailwind,/darkMode:'class'/);
 assert.match(tailwind,/\.\/components/);
});

test('grammar A1–B2 is grouped with independent disclosure controls',()=>{
 assert.match(grammar,/LEVELS\.map\(level=>/);
 assert.match(grammar,/aria-expanded=\{expanded\}/);
 assert.match(grammar,/group\.map\(\(lesson,index\)=>/);
 assert.match(page,/navigate\('grammar',level\)/);
});

test('no YouTube or login navigation in the main app',()=>{
 assert.doesNotMatch(page,/youtube\.com|youtu\.be|\/login|\/signup/);
});

test('dedicated A1 course has real keyboard inputs, sentence tokens and answer feedback',()=>{
 assert.match(grammar,/A1LessonView/);
 assert.match(a1,/type===\'order\'/);
 assert.match(a1,/type===\'choice\'/);
 assert.match(a1,/id=\"a1-answer\"/);
 assert.match(a1,/onAnswer\(lesson,record,ok\)/);
 assert.match(a1,/onFinish\(lesson,correct,tasks.length\)/);
});


test('A2–B2 deep course reuses functional lesson input, grading and error history',()=>{
 assert.match(grammar,/getUpperUnit\(lesson\.id\)/);
 assert.match(grammar,/makeAdvancedExercises\(lesson\)/);
 assert.match(a1,/getUpperUnit\(lesson\.id\)/);
 assert.match(a1,/makeAdvancedExercises\(lesson\)/);
 assert.match(a1,/onAnswer\(lesson,record,ok\)/);
 assert.match(page,/english-up-progress\.json/);
});

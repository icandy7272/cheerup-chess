import test from 'node:test';
import assert from 'node:assert/strict';
import {puzzleDifficulty,comparePuzzles} from '../src/difficulty.js';
test('book points are independent of stars and support legacy imported references',()=>{
 assert.equal(puzzleDifficulty({bookRef:'第 23 题 · 书中难度 12',stars:3}),12);
 assert.equal(puzzleDifficulty({difficulty:2,bookRef:'难度 4'}),2);
 assert.equal(puzzleDifficulty({}),1);
});
test('same points proceed across chapters before higher points, with natural book order',()=>{
 const ps=[{chapter:1,difficulty:2,title:'1'},{chapter:2,difficulty:1,title:'1'},{chapter:1,difficulty:1,title:'10'},{chapter:1,difficulty:1,title:'2'}];
 assert.deepEqual([...ps].sort(comparePuzzles).map(p=>[p.chapter,p.title]),[[1,'2'],[1,'10'],[2,'1'],[1,'1']]);
});

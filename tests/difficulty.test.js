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

test('chapter browsing puts originals first, then book number and white before black regardless of points',async()=>{
 const {chapterPuzzles}=await import('../src/difficulty.js');
 const originals=[{id:'original-b',chapter:1},{id:'original-a',chapter:1}];
 const book=(n,side,points)=>({id:`book-${n}-${side}`,chapter:1,title:`原书第 ${n} 题`,bookRef:`第一章 · 第 ${n} 题 · 书中难度 ${points}`,fen:`8/8/8/8/8/8/8/8 ${side} - - 0 1`});
 const ps=[book(10,'w',1),book(2,'b',1),originals[1],book(2,'w',8),originals[0],{id:'other',chapter:2}];const before=[...ps];
 assert.deepEqual(chapterPuzzles(ps,1,originals).map(p=>p.id),['original-b','original-a','book-2-w','book-2-b','book-10-w']);
 assert.deepEqual(ps,before);
});

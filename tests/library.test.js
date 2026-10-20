import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeLibrary,guidingQuestion,loadSharedPuzzles} from '../src/library.js';
import {puzzles} from '../src/content.js';
test('shared exercises deduplicate with device edits and retain stable progress IDs',()=>{
 const o={id:'original'},s={id:'book',title:'cloud'},p={id:'book',title:'edited'};
 assert.deepEqual(mergeLibrary([o],[s],[p]),[o,p]);
 assert.deepEqual(mergeLibrary([o],[s],[]),[o,s]);
 assert.deepEqual(mergeLibrary([o],[],[{id:'original',title:'override'}]),[o]);
});
test('question keeps the clue without demanding a square click',()=>{
 assert.equal(guidingQuestion('谁在保护 d8 的黑后？点一点那个守卫。'),'谁在保护 d8 的黑后？');
 assert.equal(guidingQuestion('谁在保护黑后？'),'谁在保护黑后？');
});
test('shared loader validates answers, handles absent local deployment, and rejects bad responses',async()=>{
 const example={...puzzles[0],id:'shared-example'};
 assert.equal((await loadSharedPuzzles(async()=>new Response(JSON.stringify({puzzles:[example]})),puzzles))[0].id,example.id);
 assert.deepEqual(await loadSharedPuzzles(async()=>new Response('',{status:404}),puzzles),[]);
 await assert.rejects(loadSharedPuzzles(async()=>new Response('',{status:500}),puzzles));
 await assert.rejects(loadSharedPuzzles(async()=>new Response(JSON.stringify({puzzles:[{...example,lines:[['???']]}]})),puzzles));
});

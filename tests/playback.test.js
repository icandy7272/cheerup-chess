import test from 'node:test';
import assert from 'node:assert/strict';
import {playSequence} from '../src/playback.js';
test('shows each landing before pausing and animating the opponent',async()=>{
 const events=[];const a={before:'a',after:'b'},b={before:'b',after:'c'};
 await playSequence({move:a,reply:b},{show:(fen)=>events.push(fen),animate:async m=>events.push(m===a?'own':'opponent'),pause:async()=>events.push('pause')});
 assert.deepEqual(events,['a','own','b','pause','b','opponent','c']);
});
test('cancelling while waiting prevents opponent playback',async()=>{
 const controller=new AbortController(),events=[];
 await assert.rejects(playSequence({move:{before:'a',after:'b'},reply:{before:'b',after:'c'}},{signal:controller.signal,show:fen=>events.push(fen),animate:async()=>{},pause:async()=>controller.abort()}),{name:'AbortError'});
 assert.deepEqual(events,['a','b']);
});
test('native board movement is not rewound or animated twice',async()=>{
 const events=[];const a={before:'a',after:'b'},b={before:'b',after:'c'};
 await playSequence({move:a,reply:b},{alreadyMoved:true,show:fen=>events.push(fen),animate:async()=>events.push('reply animation'),pause:async ms=>events.push(ms)});
 assert.deepEqual(events,['b',420,'b',450,'b','reply animation','c']);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePuzzles} from '../src/import.js';
import {PuzzleRunner} from '../src/runner.js';
import {puzzles} from '../src/content.js';
test('a printed book line can end after the final automatic reply without requesting an extra move',()=>{
 const p=validatePuzzles([{...puzzles[0],id:'book-reply-end',lines:[puzzles[0].lines[0].slice(0,2)]}])[0];
 const runner=new PuzzleRunner(p);const first=runner.chess.moves({verbose:true}).find(m=>m.san===p.lines[0][0]);
 const result=runner.play(first.from,first.to);
 assert.equal(result.kind,'complete');assert.ok(result.reply);assert.equal(runner.done,true);assert.equal(runner.ply,2);assert.equal(runner.chess.fen(),result.reply.after);assert.equal(runner.nextMove(),undefined);
});
test('a response-ending line cannot be a prefix that hides required later moves',()=>{
 const line=puzzles[0].lines[0];assert.throws(()=>validatePuzzles([{...puzzles[0],lines:[line.slice(0,2),line]}]),/前缀|提前结束/);
});

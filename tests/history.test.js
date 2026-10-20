import test from 'node:test';
import assert from 'node:assert/strict';
import {Chess} from 'chess.js';
import {moveEntry,historyRows,feedbackShapes,figurineSan} from '../src/history.js';
import {PuzzleRunner} from '../src/runner.js';
import {puzzles} from '../src/content.js';
test('feedback directly uses official Chessground glyph SVGs',()=>{
 assert.deepEqual(feedbackShapes(null),[]);
 const good=feedbackShapes({square:'f6',verdict:'good'})[0],bad=feedbackShapes({square:'f6',verdict:'fail'})[0];
 assert.equal(good.orig,'f6');assert.match(good.customSvg.html,/#22ac38/);assert.notEqual(good.customSvg.html,bad.customSvg.html);
});
test('history groups white and black, keeps wrong attempts separate, and supports black to move',()=>{
 const chess=new Chess();const first=moveEntry(chess.move('e4'),'good'),reply=moveEntry(chess.move('e5'),'reply');
 assert.deepEqual(historyRows([first,reply]),[{turn:1,white:0,black:1}]);
 assert.deepEqual(historyRows([reply]),[{turn:1,black:0}]);
 assert.deepEqual(historyRows([{...first,verdict:'fail'},first,reply]),[{turn:1,white:0},{turn:1,white:1,black:2}]);
 assert.equal(first.before,new Chess().fen());assert.equal(figurineSan('Nxf7+'),'♘xf7+');
});
test('wrong legal move exposes attempted snapshot without advancing the answer or board',()=>{
 const runner=new PuzzleRunner(puzzles[0]),before=runner.chess.fen();
 const wrong=runner.chess.moves({verbose:true}).find(m=>m.san!==runner.nextMove());
 const result=runner.play(wrong.from,wrong.to,wrong.promotion);
 assert.equal(result.kind,'retry');assert.equal(result.move.before,before);assert.notEqual(result.move.after,before);assert.equal(runner.chess.fen(),before);assert.equal(runner.ply,0);
});
test('official badges stay visible along cropped board edges for both orientations',()=>{
 assert.match(feedbackShapes({square:'h8',verdict:'good'})[0].customSvg.html,/translate\(-12 12\)/);
 assert.match(feedbackShapes({square:'d4',verdict:'fail'},{orientation:'b',diagram:true})[0].customSvg.html,/translate\(-12 12\)/);
});

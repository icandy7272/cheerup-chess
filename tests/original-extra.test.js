import test from 'node:test';
import assert from 'node:assert/strict';
import {Chess} from 'chess.js';
import {extraPuzzles} from '../src/original-extra.js';
import {validatePuzzles} from '../src/import.js';
import {PuzzleRunner} from '../src/runner.js';

function finish(p){const c=new Chess(p.fen);for(const move of p.lines[0])c.move(move);return c;}
test('chapters 5–16 each contain six unique, legal, original exercises',()=>{
 assert.equal(extraPuzzles.length,72);
 assert.equal(validatePuzzles(extraPuzzles).length,72);
 assert.equal(new Set(extraPuzzles.map(p=>p.id)).size,72);
 assert.equal(new Set(extraPuzzles.map(p=>p.fen)).size,72);
 for(let chapter=5;chapter<=16;chapter++)assert.equal(extraPuzzles.filter(p=>p.chapter===chapter).length,6);
 for(const p of extraPuzzles){assert.equal(new Chess(p.fen).turn(),'w');assert.match(p.source,/原创/);assert.equal(p.bookRef,'');}
});
test('every added exercise completes through the interactive runner and resets',()=>{
 for(const p of extraPuzzles){
  const runner=new PuzzleRunner(p);
  while(!runner.done){const move=runner.chess.moves({verbose:true}).find(m=>m.san===runner.nextMove());assert.ok(move,p.id);assert.ok(['correct','complete'].includes(runner.play(move.from,move.to,move.promotion).kind),p.id);}
  runner.reset();assert.equal(runner.chess.fen(),p.fen);assert.equal(runner.done,false);
 }
});
test('blocking sacrifices force the rook to plug the exit',()=>{
 for(const p of extraPuzzles.filter(p=>p.chapter===9)){const c=new Chess(p.fen);c.move(p.lines[0][0]);assert.deepEqual(c.moves(),[p.lines[0][1]],p.id);}
});
test('blocking and broken-pawn-wall examples really end in checkmate',()=>{
 for(const p of extraPuzzles.filter(p=>[9,10].includes(p.chapter)))assert.equal(finish(p).isCheckmate(),true,p.id);
});
test('stalemate examples have no check and no legal move',()=>{
 for(const p of extraPuzzles.filter(p=>p.chapter===13)){const c=finish(p);assert.equal(c.isStalemate(),true,p.id);assert.equal(c.isCheck(),false,p.id);assert.equal(c.moves().length,0,p.id);}
});
test('repetition examples end with the third occurrence, and explain the limited branch',()=>{
 for(const p of extraPuzzles.filter(p=>p.chapter===15)){
  const c=new Chess(p.fen);for(const move of p.lines[0].slice(0,-1))c.move(move);
  assert.equal(c.isThreefoldRepetition(),false,p.id);c.move(p.lines[0].at(-1));assert.equal(c.isThreefoldRepetition(),true,p.id);
  assert.match(p.explanation,/其他应手/);assert.match(p.explanation,/不宣称/);
 }
});
test('promotion actually creates a queen; tactical captures leave an unrecapturable attacker',()=>{
 for(const p of extraPuzzles.filter(p=>p.chapter===11)){const c=new Chess(p.fen);const m=c.move(p.lines[0][0]);assert.equal(m.promotion,'q',p.id);assert.equal(c.get(m.to).type,'q',p.id);}
 for(const p of extraPuzzles.filter(p=>[5,6,7,8,11,12,14,16].includes(p.chapter))){const c=finish(p);const last=c.history({verbose:true}).at(-1);assert.ok(last.captured,p.id);assert.equal(c.isAttacked(last.to,c.turn()),false,p.id+' final capturing piece must be safe');}
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {chapters,puzzles} from '../src/content.js';
import {validatePuzzles} from '../src/import.js';
import {PuzzleRunner} from '../src/runner.js';
test('sixteen chapters and 24 legal original exercises',()=>{assert.equal(chapters.length,16);assert.equal(puzzles.length,24);assert.equal(validatePuzzles(puzzles).length,24);for(let ch=1;ch<=4;ch++)assert.equal(puzzles.filter(p=>p.chapter===ch).length,6);});
test('every exercise can be completed and reset',()=>{for(const p of puzzles){const r=new PuzzleRunner(p);while(!r.done){const m=r.chess.moves({verbose:true}).find(m=>m.san===r.nextMove());assert.ok(m,p.id);const result=r.play(m.from,m.to,m.promotion);assert.ok(['correct','complete'].includes(result.kind),p.id);}r.reset();assert.equal(r.chess.fen(),p.fen);}});
test('deflection really removes defense from the captured queen',()=>{for(const p of puzzles.filter(p=>p.chapter===2)){const r=new PuzzleRunner(p);while(!r.done){const m=r.chess.moves({verbose:true}).find(m=>m.san===r.nextMove());r.play(m.from,m.to,m.promotion);}const last=r.chess.history({verbose:true}).at(-1);assert.equal(r.chess.isAttacked(last.to,r.chess.turn()),false,p.id+' queen must not be recaptured');}});

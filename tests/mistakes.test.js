import test from 'node:test';
import assert from 'node:assert/strict';
import {recordMistake,recordResult,parseBackup} from '../src/storage.js';
test('mistake persists before completion and survives same-day three stars and backup',()=>{
 const mistakes=recordMistake(undefined,'test',100);
 const state={version:1,puzzles:[],progress:recordResult({},'test',{},200),mistakes};
 assert.equal(state.progress.test.stars,3);
 assert.deepEqual(parseBackup(JSON.stringify(state)).mistakes,mistakes);
 assert.deepEqual(recordMistake(mistakes,'test',300).test,{firstWrong:100,lastWrong:300,count:2});
 assert.equal(mistakes.test.count,1);
});
test('legacy backup remains compatible and malformed mistake entries are rejected',()=>{
 assert.deepEqual(parseBackup('{"version":1,"puzzles":[],"progress":{}}'),{version:1,puzzles:[],progress:{}});
 assert.throws(()=>parseBackup(JSON.stringify({version:1,puzzles:[],progress:{},mistakes:{constructor:{firstWrong:1,lastWrong:1,count:1}}})));
});

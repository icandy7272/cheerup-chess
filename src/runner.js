import { Chess } from 'chess.js';
export class PuzzleRunner {
  constructor(puzzle){this.puzzle=puzzle;this.reset();}
  reset(){this.chess=new Chess(this.puzzle.fen);this.ply=0;this.lines=this.puzzle.lines.map(l=>[...l]);this.done=false;}
  play(from,to,promotion='q'){
    if(this.done)return {kind:'complete'};
    let move;try{move=this.chess.move({from,to,promotion});}catch{return {kind:'illegal'};}
    const choices=this.lines.filter(l=>l[this.ply]===move.san);
    if(!choices.length){this.chess.undo();return {kind:'retry'};}
    this.lines=choices;this.ply++;
    if(this.lines.every(l=>l.length===this.ply)){this.done=true;return {kind:'complete',move};}
    const reply=this.chess.move(this.lines[0][this.ply]);this.ply++;
    return {kind:'correct',move,reply};
  }
  nextMove(){return this.lines[0][this.ply];}
}

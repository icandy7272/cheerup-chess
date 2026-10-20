import {Chessground} from '@lichess-org/chessground';
import '@lichess-org/chessground/assets/chessground.base.css';
import '@lichess-org/chessground/assets/chessground.cburnett.css';
export const moveDuration=420;
export function legalDestinations(chess,diagram=false){
 const dests=new Map();
 for(const m of chess.moves({verbose:true})){
  if(diagram&&(!/^[d-h][4-8]$/.test(m.from)||!/^[d-h][4-8]$/.test(m.to)))continue;
  if(!dests.has(m.from))dests.set(m.from,[]);
  if(!dests.get(m.from).includes(m.to))dests.get(m.from).push(m.to);
 }
 return dests;
}
export function lessonBoard(host,chess,{orientation,diagram,onMove,onSquare}){
 host.className='lesson-board'+(diagram?' cropped-board':'')+(orientation==='b'?' black-view':'');
 const inner=document.createElement('div');inner.className='cg-wrap';host.append(inner);
 const color=c=>c==='w'?'white':'black';
 const ground=Chessground(inner,{
  fen:chess.fen(),orientation:color(orientation),coordinates:!diagram,coordinatesOnSquares:false,
  animation:{enabled:!matchMedia('(prefers-reduced-motion: reduce)').matches,duration:moveDuration},
  movable:{free:false,color:color(chess.turn()),dests:legalDestinations(chess,diagram),rookCastle:false,events:{after:onMove}},
  premovable:{enabled:false},draggable:{enabled:true,showGhost:true},selectable:{enabled:true},
  drawable:{enabled:false},disableContextMenu:true,blockTouchScroll:true,
 });
 const access=document.createElement('div');access.className='board-access';host.append(access);
 const files=diagram?(orientation==='b'?'hgfed':'defgh'):(orientation==='b'?'hgfedcba':'abcdefgh');
 const ranks=diagram?(orientation==='b'?[4,5,6,7,8]:[8,7,6,5,4]):(orientation==='b'?[1,2,3,4,5,6,7,8]:[8,7,6,5,4,3,2,1]);
 if(diagram){
  for(const [i,file] of [...files].entries()){const label=document.createElement('span');label.className='crop-file';label.textContent=file;label.style.left=`${i*20+17}%`;host.append(label);}
  for(const [i,rank] of ranks.entries()){const label=document.createElement('span');label.className='crop-rank';label.textContent=rank;label.style.top=`${i*20+1}%`;host.append(label);}
 }
 return {
  update(position,{busy,lastMove,selected,done}){
   ground.set({fen:position.fen(),turnColor:color(position.turn()),lastMove:lastMove?[lastMove.from,lastMove.to]:[],
    movable:{color:busy||done?undefined:color(position.turn()),dests:busy||done?new Map():legalDestinations(position,diagram)},
    draggable:{enabled:!busy&&!done},selectable:{enabled:!busy&&!done}});
   access.replaceChildren();
   for(const rank of ranks)for(const file of files){const key=file+rank,piece=position.get(key),button=document.createElement('button');
    button.type='button';button.textContent=key+(piece?` ${piece.color==='w'?'白':'黑'}${({k:'王',q:'后',r:'车',b:'象',n:'马',p:'兵'})[piece.type]}`:' 空格');
    button.disabled=!!busy||!!done;button.onclick=()=>onSquare(key);access.append(button);
   }
   if(selected&&!busy)ground.selectSquare(selected);
  },
  move(move){ground.set({fen:move.after,lastMove:[move.from,move.to]});},
  destroy(){ground.destroy();},
 };
}

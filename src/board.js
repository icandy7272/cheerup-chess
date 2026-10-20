export const glyphs={wk:'♚',wq:'♛',wr:'♜',wb:'♝',wn:'♞',wp:'♟',bk:'♚',bq:'♛',br:'♜',bb:'♝',bn:'♞',bp:'♟'};
const names={k:'王',q:'后',r:'车',b:'象',n:'马',p:'兵'};
export function renderBoard(container,chess,{selected=null,targets=[],marked=[],onSquare,orientation=chess.turn(),lastMove=null}={}){
 container.replaceChildren();container.className='chessboard';container.setAttribute('aria-label','国际象棋棋盘，点选棋子，再点目标格');
 const files=orientation==='b'?'hgfedcba':'abcdefgh';const ranks=orientation==='b'?[1,2,3,4,5,6,7,8]:[8,7,6,5,4,3,2,1];
 for(const rank of ranks)for(const file of files){
  const square=file+rank;const piece=chess.get(square);const button=document.createElement('button');button.type='button';button.className='square '+((file.charCodeAt(0)-97+rank)%2?'light':'dark');button.dataset.square=square;
  if(selected===square)button.classList.add('selected');if(marked.includes(square))button.classList.add('marked');if(lastMove&&[lastMove.from,lastMove.to].includes(square))button.classList.add('last');
  button.setAttribute('aria-label',square+(piece?` ${piece.color==='w'?'白':'黑'}${names[piece.type]}`:' 空格'));button.title=button.getAttribute('aria-label');
  if(piece){const span=document.createElement('span');span.className='piece '+(piece.color==='w'?'white-piece':'black-piece');span.textContent=glyphs[piece.color+piece.type];button.append(span);}
  if(targets.includes(square)){const dot=document.createElement('span');dot.className=piece?'capture-dot':'move-dot';button.append(dot);}
  if(file===files[0]){const coordinate=document.createElement('small');coordinate.className='rank';coordinate.textContent=rank;button.append(coordinate);}
  if(rank===ranks[7]){const coordinate=document.createElement('small');coordinate.className='file';coordinate.textContent=file;button.append(coordinate);}
  button.addEventListener('click',()=>onSquare?.(square));container.append(button);
 }
}

import {Chess,validateFen} from 'chess.js';
export const diagramSquare=s=>typeof s==='string'&&/^[d-h][4-8]$/.test(s);
export function createPosition(puzzle){
 const {fen,diagram}=puzzle;
 if(diagram!==undefined&&typeof diagram!=='boolean')throw Error('局部示意图标记必须是布尔值。');
 const result=validateFen(fen);
 if(!diagram)return new Chess(fen);
 const fields=fen.split(' ');
 if(fields[2]!=='-'||fields[3]!=='-')throw Error('局部示意图不支持王车易位或吃过路兵权限。');
 // Syntax and move-counter checks precede king validation in chess.js.
 // Permit only the intentional missing-white-king case; never invent a king.
 if(!result.ok&&result.error!=='Invalid FEN: missing white king')throw Error('局部示意图 FEN 不合法。');
 const pieces=fields[0];
 if((pieces.match(/k/g)||[]).length!==1||(pieces.match(/K/g)||[]).length>1)throw Error('局部示意图需要一个黑王，最多一个白王。');
 if(/[pP]/.test(pieces.split('/')[0]))throw Error('兵不能摆在第八排。');
 const chess=new Chess(fen,{skipValidation:!result.ok});
 for(const row of chess.board())for(const p of row)if(p&&!diagramSquare(p.square))throw Error('局部示意图只能包含 d4～h8 范围内的棋子。');
 return chess;
}

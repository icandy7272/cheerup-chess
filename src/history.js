import {glyphToSvg} from '@lichess-org/chessground/glyph';
const officialGlyphs=glyphToSvg(4);
export function feedbackShapes(annotation,{orientation='w',diagram=false}={}){
 if(!annotation)return [];
 const symbol=annotation.verdict==='good'?'✓':'✗';
 const [file,rank]=annotation.square;
 const right=orientation==='w'?file==='h':file===(diagram?'d':'a');
 const top=orientation==='w'?rank==='8':rank===(diagram?'4':'1');
 const svg=officialGlyphs[symbol](0);
 // Keep the official badge inside the cropped board at its top/right edges.
 const html=right||top?`<g transform="translate(${right?-12:0} ${top?12:0})">${svg}</g>`:svg;
 return [{orig:annotation.square,brush:'',customSvg:{html}}];
}
export function moveEntry(move,verdict){
 return {from:move.from,to:move.to,san:move.san,color:move.color,before:move.before,after:move.after,
  turn:Number(move.before.split(' ')[5]),verdict};
}
export function figurineSan(san){return san.replace(/[KQRBN]/g,p=>({K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘'})[p]);}
export function historyRows(entries){
 const rows=[];
 entries.forEach((entry,index)=>{
  const prev=rows.at(-1);
  if(entry.color==='b'&&entry.verdict!=='fail'&&prev?.white!==undefined&&prev.black===undefined&&prev.turn===entry.turn&&entries[prev.white].verdict!=='fail')prev.black=index;
  else rows.push({turn:entry.turn,[entry.color==='w'?'white':'black']:index});
 });return rows;
}

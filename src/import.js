import {createPosition,diagramSquare} from './position.js';
const square=/^[a-h][1-8]$/;
export const validId=id=>typeof id==='string'&&/^[-a-zA-Z0-9_]{1,80}$/.test(id)&&!Object.hasOwn(Object.prototype,id)&&id!=='prototype';
function text(v,max=500){return typeof v==='string'&&v.trim().length>0&&v.length<=max;}
export function validatePuzzles(input,existingIds=[]){
 if(!Array.isArray(input)||!input.length||input.length>500)throw Error('每次请导入 1～500 道题。');
 const ids=new Set(existingIds);
 return input.map((p,i)=>{
  const fail=m=>{throw Error(`第 ${i+1} 题：${m}`);};
  if(!p||!validId(p.id)||ids.has(p.id))fail('题号重复或格式不正确。');ids.add(p.id);
  if(!Number.isInteger(p.chapter)||p.chapter<1||p.chapter>16)fail('章节应为 1～16。');
  for(const k of ['title','question','explanation','source'])if(!text(p[k]))fail(`缺少有效的 ${k}。`);
  if(!Array.isArray(p.answers)||!p.answers.length||p.answers.length>64||!p.answers.every(x=>typeof x==='string'&&square.test(x)))fail('请填写棋盘上的引导答案格子。');
  if(!Array.isArray(p.hints)||!p.hints.length||p.hints.length>5||!p.hints.every(x=>text(x)))fail('请填写 1～5 条提示。');
  if(!text(p.fen,150))fail('缺少有效 FEN。');
  if(!Array.isArray(p.lines)||!p.lines.length||p.lines.length>16)fail('需要 1～16 条正确解答。');
  if(p.diagram===true&&!p.answers.every(diagramSquare))fail('引导答案必须在 d4～h8 局部棋盘内。');
  const nodes=new Map();
  for(const line of p.lines){
   if(!Array.isArray(line)||!line.length||line.length>31)fail('解答需要 1～31 个半回合。');
   let c;try{c=createPosition(p);}catch{fail('起始局面不合法。');}
   // Side not to move must not already be in check.
   const fields=c.fen().split(' ');fields[1]=fields[1]==='w'?'b':'w';fields[3]='-';
   try{if(createPosition({...p,fen:fields.join(' ')}).isCheck())fail('未轮到走的一方已被将军。');}catch(e){fail(e.message);}
   for(let j=0;j<line.length;j++){
    if(!text(line[j],20))fail('解答走法不正确。');
    const key=JSON.stringify(line.slice(0,j));const n=nodes.get(key)||{end:false,moves:new Set()};
    if(n.end)fail('较短解答不能是另一条解答的前缀。');n.moves.add(line[j]);
    if(j%2===1&&n.moves.size>1)fail('同一局面的自动应手必须一致。');nodes.set(key,n);
    try{const m=c.move(line[j]);if(p.diagram&&(!diagramSquare(m.from)||!diagramSquare(m.to)))fail('解答走出了局部棋盘。');if(m.san!==line[j])fail(`走法请使用标准 SAN：${m.san}`);}catch{fail(`非法走法：${line[j]}`);}
    if(j<line.length-1&&(p.diagram?(c.isCheckmate()||c.isStalemate()):c.isGameOver()))fail('解答在棋局结束后仍有走法。');
   }
   const key=JSON.stringify(line);if(nodes.has(key)&&nodes.get(key).moves.size)fail('较短解答不能提前结束。');nodes.set(key,{end:true,moves:new Set()});
  }
  return {...(p.diagram===true?{diagram:true}:{}),id:p.id,chapter:p.chapter,title:p.title,fen:p.fen,lines:p.lines.map(l=>[...l]),question:p.question,answers:[...p.answers],hints:[...p.hints],explanation:p.explanation,source:p.source,bookRef:typeof p.bookRef==='string'?p.bookRef.slice(0,100):''};
 });
}
export function parsePuzzleFile(raw,existingIds=[]){if(new TextEncoder().encode(raw).byteLength>2_000_000)throw Error('文件过大，请控制在 2 MB 以内。');let data;try{data=JSON.parse(raw);}catch{throw Error('文件不是有效的 JSON。');}return validatePuzzles(Array.isArray(data)?data:data.puzzles,existingIds);}

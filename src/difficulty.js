export function puzzleDifficulty(p){
 if(Number.isInteger(p.difficulty)&&p.difficulty>=1&&p.difficulty<=100)return p.difficulty;
 const match=String(p.bookRef||'').match(/(?:书中)?难度\s*(\d+)/);
 return match&&Number(match[1])>=1&&Number(match[1])<=100?Number(match[1]):1;
}
export function comparePuzzles(a,b){return puzzleDifficulty(a)-puzzleDifficulty(b)||a.chapter-b.chapter||String(a.bookRef||a.title||a.id).localeCompare(String(b.bookRef||b.title||b.id),'zh-CN',{numeric:true});}

// Keep chapter browsing in teaching/book order, independently of difficulty.
export function chapterPuzzles(puzzles,chapter,originals){
 const originalOrder=new Map(originals.map((p,i)=>[p.id,i]));
 const bookNumber=p=>Number(String(p.bookRef||p.title||'').match(/第\s*(\d+)\s*题/)?.[1]||Infinity);
 return puzzles.filter(p=>p.chapter===chapter).sort((a,b)=>{
  const ao=originalOrder.get(a.id),bo=originalOrder.get(b.id);
  if(ao!==undefined||bo!==undefined)return ao===undefined?1:bo===undefined?-1:ao-bo;
  const an=bookNumber(a),bn=bookNumber(b);
  if(an!==bn)return an<bn?-1:1;
  if(Number.isFinite(an)){const side=p=>String(p.fen||'').split(' ')[1]==='b'?1:0;const diff=side(a)-side(b);if(diff)return diff;}
  return String(a.title||a.id).localeCompare(String(b.title||b.id),'zh-CN',{numeric:true});
 });
}

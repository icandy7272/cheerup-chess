export function puzzleDifficulty(p){
 if(Number.isInteger(p.difficulty)&&p.difficulty>=1&&p.difficulty<=100)return p.difficulty;
 const match=String(p.bookRef||'').match(/(?:书中)?难度\s*(\d+)/);
 return match&&Number(match[1])>=1&&Number(match[1])<=100?Number(match[1]):1;
}
export function comparePuzzles(a,b){return puzzleDifficulty(a)-puzzleDifficulty(b)||a.chapter-b.chapter||String(a.bookRef||a.title||a.id).localeCompare(String(b.bookRef||b.title||b.id),'zh-CN',{numeric:true});}

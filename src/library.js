import {validatePuzzles} from './import.js';
// Device edits take precedence over a server exercise with the same stable ID.
export function mergeLibrary(originals,shared,personal){
 const result=new Map(originals.map(p=>[p.id,p]));
 for(const p of [...shared,...personal])if(!originals.some(o=>o.id===p.id))result.set(p.id,p);
 return [...result.values()];
}
export function guidingQuestion(question){
 return question.replace(/点一点那个守卫[。！]?/g,'').replace(/(?:请)?点(?:一)?下?(?:它|那个棋子)[。！]?/g,'').trim();
}
export async function loadSharedPuzzles(fetcher,originals){
 const response=await fetcher('/site-data/puzzles.json',{cache:'no-cache',signal:AbortSignal.timeout(8000)});
 if(response.status===404)return [];
 if(!response.ok)throw Error('云端书题暂时无法加载，请刷新重试。');
 const body=await response.text();if(new TextEncoder().encode(body).length>10*1024*1024)throw Error('云端题目文件过大。');
 const data=JSON.parse(body);
 if(!Array.isArray(data.puzzles)||data.puzzles.length>5000)throw Error('云端题库格式不正确。');
 const result=[],ids=originals.map(p=>p.id);
 for(let i=0;i<data.puzzles.length;i+=500){
  const batch=validatePuzzles(data.puzzles.slice(i,i+500),ids);
  result.push(...batch);ids.push(...batch.map(p=>p.id));
 }
 return result;
}

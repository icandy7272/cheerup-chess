import {validatePuzzles,validId} from './import.js';
export const backupBytes=raw=>new TextEncoder().encode(raw).byteLength;
export function serializeBackup(state){const raw=JSON.stringify(state);if(backupBytes(raw)>3_000_000)throw Error('备份超过 3 MB，请减少自录题目。');return raw;}
export const STORAGE_KEY='cheerup-chess-v1';
export const emptyState=()=>({version:1,progress:{},puzzles:[]});
export function recordResult(progress,id,{mistakes=0,hints=0},now=Date.now()){
 const old=progress[id];const stars=mistakes>0?1:hints>0?2:3;
 return {...progress,[id]:{stars:Math.max(old?.stars||0,stars),attempts:(old?.attempts||0)+1,lastStars:stars,lastPlayed:now,due:now+(stars<3?1:3)*86400000}};
}
export function reviewQueue(progress,now=Date.now()){return Object.entries(progress).filter(([,p])=>p.due<=now).sort((a,b)=>a[1].due-b[1].due).map(([id])=>id);}
export function parseBackup(raw){
 if(typeof raw!=='string'||backupBytes(raw)>3_000_000)throw Error('备份文件过大。');
 let x;try{x=JSON.parse(raw);}catch{throw Error('备份文件不是有效 JSON。');}
 if(!x||x.version!==1||!x.progress||Array.isArray(x.progress)||typeof x.progress!=='object'||!Array.isArray(x.puzzles))throw Error('备份格式不正确。');
 const progress={};
 for(const [id,p]of Object.entries(x.progress)){
  if(!validId(id)||!p||!Number.isInteger(p.stars)||p.stars<1||p.stars>3||!Number.isInteger(p.lastStars)||p.lastStars<1||p.lastStars>3||!Number.isInteger(p.attempts)||p.attempts<1||!Number.isFinite(p.due)||!Number.isFinite(p.lastPlayed)||p.due<0||p.lastPlayed<0)throw Error('备份中的进度数据不正确。');
  progress[id]={stars:p.stars,lastStars:p.lastStars,attempts:p.attempts,due:p.due,lastPlayed:p.lastPlayed};
 }
 const puzzles=x.puzzles.length?validatePuzzles(x.puzzles):[];
 if(backupBytes(JSON.stringify(puzzles))>2_500_000)throw Error('自录题库总大小超过 2.5 MB。');
 if(Object.keys(progress).length>1024)throw Error('备份进度条数超过上限。');
 return {version:1,progress,puzzles};
}
export function loadState(storage){try{const raw=storage.getItem(STORAGE_KEY);return raw?{state:parseBackup(raw),error:null}:{state:emptyState(),error:null};}catch{return {state:emptyState(),error:'暂时无法读取已存进度。原数据没有被覆盖，请先导出备份或检查浏览器设置。'};}}
export function saveState(storage,state){try{storage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{return false;}}

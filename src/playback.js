// Lichess normal preference: 250ms; puzzle replies start after 1.5 animation durations.
export const moveDuration=250;
export const retryDuration=300;
// Play snapshots in order even though the answer runner has already checked both plies.
export async function playSequence(result,{show,animate,pause,signal,alreadyMoved=false}){
 const check=()=>signal?.throwIfAborted();
 check();
 for(const [index,move] of [result.move,result.reply].filter(Boolean).entries()){
  if(index){await pause(moveDuration/2,signal);check();}
  show(alreadyMoved&&index===0?move.after:move.before,index?'reply':'move',move);check();
  if(alreadyMoved&&index===0)await pause(moveDuration,signal);else await animate(move,signal);check();
  show(move.after,index?'reply-landed':'landed',move);
 }
}
export function waitForMove(ms,signal){return new Promise((resolve,reject)=>{
 signal?.throwIfAborted();
 const abort=()=>{clearTimeout(timer);reject(signal.reason);};
 const timer=setTimeout(()=>{signal?.removeEventListener('abort',abort);resolve();},ms);
 signal?.addEventListener('abort',abort,{once:true});
});}

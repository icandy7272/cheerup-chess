import {Chess} from 'chess.js';

// Authored teaching positions, never transcribed from the family's books.
// Each theme has three starting-square variations and their file mirrors.
const mirror=s=>String.fromCharCode(104-(s.charCodeAt(0)-97))+s[1];
function exercise(chapter,v,pieces,moves,answer,question,hints,explanation){
 const sq=s=>v>=3?mirror(s):s;
 const words=t=>t.replace(/\b[a-h][1-8]\b/g,sq);
 const board=new Chess();board.clear();
 for(const [s,p] of Object.entries(pieces))board.put({type:p.toLowerCase(),color:p===p.toUpperCase()?'w':'b'},sq(s));
 const fen=board.fen();
 const line=moves.map(([from,to,promotion])=>board.move({from:sq(from),to:sq(to),promotion:promotion||'q'}).san);
 return {id:`original-${chapter}-${v+1}`,chapter,title:['打开眼睛找一找','换个位置试一试','自己想出小办法','镜子里的小发现','另一边也能做到','我会解释妙招'][v],fen,lines:[line],answers:[sq(answer)],question:words(question),hints:hints.map(words),explanation:words(explanation),source:'CheerUp Chess 原创 · 同主题变式练习',bookRef:''};
}
export const extraPuzzles=[];
for(let v=0;v<6;v++){
 const n=v%3;const add=(ch,p,m,a,q,h,e)=>extraPuzzles.push(exercise(ch,v,p,m,a,q,h,e));
 const r=['e1','e2','e3'][n];
 add(5,{a1:'K',h8:'k',e8:'q',e4:'P',d5:'p',[r]:'R'},[['e4','d5'],['h8','h7'],[r,'e8']],'e4','谁挡在白车去 e8 的路上？',['看看白车前面的 e4 白兵。','白兵吃到 d5，就打开了 e 线。'],'白兵吃 d5，打开白车的通道。本题黑王走 h7 后，白车吃 e8 的后。这里练习开线；黑方也可能选择别的应手。');
 const b='d5';const knight=['f4','b4','c3'][n];
 add(6,{a1:'K',e8:'k',b6:'q',[knight]:'N',[b]:'B'},[[b,'f7'],['e8','e7'],[knight,'d5'],['e7','f8'],['d5','b6']],'d5','小马想跳到哪个格子，同时攻击王和后？',['看看 d5。小马到那里能攻击 e7 和 b6。','先把象走到 f7 将军，给小马腾出 d5 的位置。'],'象走 f7 将军。本题黑王走 e7 后，马跳 d5 将军并攻击 b6 的后，随后吃后。象腾出 d5，小马就能站到这个格子，使出双重攻击。');
 const skewer=['a1','a2','a3'][n];
 add(7,{h1:'K',d7:'k',d8:'q',[skewer]:'R'},[[skewer,`d${n+1}`],['d7','e6'],[`d${n+1}`,'d8']],'d8','黑王身后，同一条直线上藏着谁？点它的格子。',['沿着 d 线，看看黑王后面的 d8。','车走到 d 线将军，黑王移开后就露出了后。'],'车沿 d 线将军。黑王走 e6 后，车吃 d8 的后。这叫串击：先攻击前面的王，再吃后面的棋子，车没有穿过任何棋子。');
 const intercept=['b4','c4','d4'][n];
 add(8,{h2:'K',h6:'k',a8:'r',a1:'q',c3:'B',[intercept]:'R'},[[intercept,'a4'],['h6','h7'],['c3','a1']],'a4','把白车放在哪里，能切断 a8 黑车对 a1 黑后的保护？',['黑车和黑后之间，是整条 a 线。','让白车站到 a4，黑车就不能直接吃回 a1。'],'车到 a4，拦住 a8 黑车的保护线。本题黑王走 h7 后，象吃 a1 的后，黑车不能穿过 a4 的白车吃回。这个应手用于看清拦截；并非唯一应手。');
 const block=['g1','g2','g3'][n];
 add(9,{a1:'K',h8:'k',f8:'r',h7:'p',h6:'Q',b1:'B',c4:'B',[block]:'R'},[[block,'g8'],['f8','g8'],['h6','h7']],'g8','先把黑车引到哪里，堵住黑王的出口？',['黑王在 h8，看看它旁边的 g8。','白车到 g8 将军。黑车吃回后，就占住黑王的门口。'],'白车到 g8 将军，黑车吃回后堵住 g8。白后吃 h7 将死：象保护白后，黑王的 g8 出口被自己的车堵住了。');
 const bishop=['c4','b3','a2'][n];
 add(10,{a1:'K',g8:'k',f8:'r',f7:'p',g7:'p',h7:'p',e2:'Q',b4:'B',[bishop]:'B'},[[bishop,'f7'],['f8','f7'],['e2','e8'],['f7','f8'],['e8','f8']],'f7','白象可以吃哪个兵，打开黑王前面的缺口？',['看看 f7 的小兵墙。','象吃 f7 将军；本题黑车吃回，f8 就空了。'],'象吃 f7，破坏王前的小兵墙。本题黑车吃回后，白后到 e8 将军，利用刚空出的 f8 通道。黑车回 f8 挡将，白后吃车将死；b4 的象保护 f8。黑方第一步也可以躲王，这里展示吃回后的配合。');
 const king=['c3','d3','e3'][n];
 add(11,{[king]:'K',h8:'k',a7:'P',a5:'r'},[['a7','a8','q'],['h8','h7'],['a8','a5']],'a8','小兵走到哪个格子，就能变成白后？',['白兵从第七排向第八排走。','走到 a8 选后，先将军，再寻找 a5 的黑车。'],'a 兵到 a8 升变成后并将军。本题黑王走 h7 后，白后沿 a 线吃黑车。升变时要选择新棋子；这一题选后即可。');
 const rook=['e1','e2','e3'][n];
 add(12,{a1:'K',g8:'k',e8:'n',d4:'r',d1:'Q',[rook]:'R'},[[rook,'e8'],['g8','h7'],['d1','d4']],'e8','别急着吃 d4 的车！先吃哪里，还能将军？',['看看 e8 的黑马。','先用车吃马将军，让黑王处理急事，再用后吃车。'],'白车先吃 e8 的马并将军，这是中间着。本题黑王走 h7 后，白后再吃 d4 的车。先做紧急而有利的事，再完成原来的吃回计划。');
 const queen=['b3','c2','d2'][n];
 add(13,{h1:'K',f1:'k',a3:'R',a2:'r',[queen]:'q'},[['a3','a2'],[queen,'a2']],'a2','白车吃哪里，黑后吃回后会出现逼和？',['看看 a2。白车离开后，白方只剩国王。','黑后吃回 a2 后，白王没有被将军，却没有合法走法。'],'车吃 a2。本题黑后吃回后，白王 h1 没有被将军；g1、g2 被黑王控制，h2 被黑后控制。白方没棋可走，是真正的逼和平局。本题只展示这个吃回分支。');
 const restrict=['d1','d2','d3'][n];
 add(14,{h1:'K',h7:'k',a8:'n',a5:'P',b5:'P',[restrict]:'R'},[['b5','b6'],['h7','g6'],[restrict,'d8'],['g6','g5'],['d8','a8']],'b6','白兵走到哪里，能看住小马想跳去的 c7？',['白兵斜着看前面一格。b6 的白兵能看住 c7。','a5 的兵保护 b6；这样小马的两个跳出格子都不安全。'],'兵到 b6，和 a5 的兵一起限制 a8 的马：跳 c7 会被 b6 兵吃，吃 b6 会被 a5 兵吃。本题黑王走开后，白车到 d8，再吃掉受困的马。这是围住马的示范分支。');
 const qstart=['e1','e2','e3'][n];
 add(15,{a1:'K',g8:'k',b3:'q',[qstart]:'Q'},[[qstart,'e8'],['g8','h7'],['e8','h5'],['h7','g8'],['h5','e8'],['g8','h7'],['e8','h5'],['h7','g8'],['h5','e8']],'e8','白后先到哪里将军，开始观察重复局面？',['后到 e8，将军后再到 h5 将军。','留意棋子位置和轮到谁走；不是数三声“将军”。'],'这一条示范线里，白后在 e8 和 h5 来回将军，黑王在 g8 和 h7 来回。走完后，同一局面第三次出现，可以按三次重复规则求和。黑王也有其他应手；这题练习观察重复，不宣称白方能强迫所有分支都和棋。');
 const lure=['g6','h5','e6'][n];
 add(16,{a1:'K',g8:'k',d7:'q',h8:'r',f8:'b',f7:'p',g7:'p',h7:'p',c4:'N',[lure]:'B'},[[lure,'f7'],['g8','f7'],['c4','e5'],['f7','g8'],['e5','d7']],'f7','先把黑王引到哪里，小马才能跳 e5 同时攻击王和后？',['马在 e5 能同时攻击 f7 的王和 d7 的后。','象先吃 f7 将军；本题黑王吃象后，马跳 e5 将军。'],'象吃 f7 将军，把黑王引入 f7 的示范应手。接着马跳 e5，一边将军，一边攻击 d7 的后，最后吃后。这把引入和马的双重攻击连成了组合；本题展示黑王吃象的分支。');
}

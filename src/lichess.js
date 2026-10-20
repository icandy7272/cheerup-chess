// Theme destinations verified against https://lichess.org/training/themes.
// Related topics are explicitly distinguished from a chapter-equivalent theme.
const link=(theme,label)=>({url:'https://lichess.org/training'+(theme?'/'+theme:''),label});
export const lichessPractice=[
 {related:false,note:'先解决守卫，再寻找失去保护的目标。',links:[link('capturingDefender','消除保护')]},
 {related:false,note:'让对方棋子离开原来负责保护的位置。',links:[link('deflection','引离')]},
 {related:false,note:'把对方棋子引到可以使用后续妙招的格子。',links:[link('attraction','引入')]},
 {related:false,note:'棋子让开，露出身后朋友的攻击；也可以练闪将。',links:[link('discoveredAttack','闪击'),link('discoveredCheck','闪将')]},
 {related:true,note:'Lichess 没有单独的“开线”分类。腾挪包含让出直线、斜线的练习，与本章部分相关。',links:[link('clearance','相关练习：腾挪与让路')]},
 {related:false,note:'腾出一个格子或一条通道，为下一步做好准备。',links:[link('clearance','腾挪')]},
 {related:false,note:'沿着直线或斜线，留意前后棋子的联系。',links:[link('xRayAttack','射线攻击')]},
 {related:false,note:'站到中间，切断对方棋子之间的保护路线。',links:[link('interference','拦截')]},
 {related:true,note:'闷杀是阻塞逃跑格的一类应用，这里只练本章的一部分。',links:[link('smotheredMate','相关练习：闷杀')]},
 {related:true,note:'这里练王失去兵墙掩护后的攻王机会，不专门限定用破坏兵形的方式。',links:[link('exposedKing','相关练习：暴露的王')]},
 {related:false,note:'先练小兵升变，再试试变成后以外的棋子。',links:[link('promotion','兵升变'),link('underpromotion','低升变')]},
 {related:false,note:'先插入一个需要对方回应的威胁，再继续原来的计划。',links:[link('intermezzo','中间着')]},
 {related:true,note:'Lichess 的“争取均势”包含争取和棋的题，并不全是逼和。请和大朋友一起挑选。',links:[link('equality','相关练习：争取均势与和棋')]},
 {related:false,note:'练习限制对方棋子的安全去处，找到困子机会。',links:[link('trappedPiece','困子')]},
 {related:true,note:'这里练争取均势或和棋，不是专门的长将、长捉题库。',links:[link('equality','相关练习：争取均势与和棋')]},
 {related:false,note:'综合题不提前告诉你主题，可以练习把不同小妙招连接起来。',links:[link('','综合战术')]}
];

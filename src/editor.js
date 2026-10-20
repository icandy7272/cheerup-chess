export function recordingFen(chess,turn,setupChanged=false){
 const fields=chess.fen().split(' ');
 if(setupChanged||fields[1]!==turn){fields[2]='-';fields[3]='-';}
 fields[1]=turn;
 return fields.join(' ');
}

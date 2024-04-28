import "./Pieces.css"
import { useAppContext } from "./context/context";

import arbitar from "./arbitar/arbitar";
import { generateCandidateMove } from "./reducer/actions/move";
const Piece=({rank,file,piece})=>{
  const { appState, dispatch } = useAppContext();
    const { turn,castleDirection ,position : currentPosition } = appState

    const onDragStart =e=>{
     
        e.dataTransfer.effectAllowed='move';
       e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
       setTimeout(()=>{
        e.target.style.display='none'
       },0);
    
       if (turn === piece[0]){
        const candidateMoves = 
            arbitar.getValidMoves({
                position : currentPosition[currentPosition.length - 1],
                prevPosition : currentPosition[currentPosition.length - 2],
                castleDirection:castleDirection[turn],
                piece,
                file,
                rank
            })
        dispatch(generateCandidateMove({candidateMoves}))
    }
    }
  const onDragEnd=e=>{
    e.target.style.display='block';
  }
return (
    <div 
   
    className={`piece ${piece} p-${file}${rank}`} 
    draggable={true}
    onDragEnd={onDragEnd}
    onDragStart={onDragStart}
    >

    </div>
)
}
export default Piece;
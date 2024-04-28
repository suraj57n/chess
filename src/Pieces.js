import "./Pieces.css";
import React, { useRef } from "react";
import Piece from "./Piece";
import { useAppContext } from "./context/context";
import { clearCandidates, makeNewMove } from "./reducer/actions/move";
import { copyPosition } from "./helper";
import { openPromotion } from "./reducer/popup";
import {getCastlingDirections} from "./arbitar/getMoves"
import arbitar from "./arbitar/arbitar";
import { updateCastling ,detectStalemate,detectInsufficientMaterial,detectCheckmate} from "./reducer/actions/game";
import PromotionBox from "./Popup/Promotion/PromotionBox";
import {getNewMoveNotation} from "./helper";
// const Pieces = () => {
//   const ref = useRef();
//   const { appState, dispatch } = useAppContext();
//   const currentPosition = appState.position[appState.position.length - 1];

//   const calculateCoords = (e) => {
//     const { top, left, width } = ref.current.getBoundingClientRect();
//     const size = width / 8;
//     const y = Math.floor((e.clientX - left) / size);
//     const x = 7 - Math.floor((e.clientY - top) / size);

//     return { x, y };
//   };
//   const openPromotionBox=({rank,file,x,y})=>{
// dispatch(openPromotion({
//   rank,file,x:Number(x),y:Number(y)
// }))
//   }
//   const updateCastlingState = ({piece,file,rank}) => {
//     const direction = getCastlingDirections({
//         castleDirection:appState.castleDirection,
//         piece,
//         file,
//         rank
//     })
//     if (direction){
//         dispatch(updateCastling(direction))
//     }
// }

// const move=e=>{
//   const { x, y } = calculateCoords(e);
//     const [piece, rank, file] = e.dataTransfer.getData("text").split(",");
//     if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
//      const opponent=piece.startsWith("w")?'b':'w';
//      const castleDirection=appState.castleDirection[`${piece.startsWith('w')?'b':'w'}`];
//      if ((piece==='wp' && x === 7) || (piece==='bp' && x === 0)){
//       openPromotionBox({rank,file,x,y})
//       return
//   }
//       if (piece.endsWith('r') || piece.endsWith('k')){
//         updateCastlingState({piece,file,rank})
//     }
//       const newPosition=arbitar.performMove({
//         position:currentPosition,piece,rank,file,x,y
//       })
//       dispatch(makeNewMove({newPosition}))
//       if(arbitar.insufficientMaterial(newPosition)){
//         dispatch(detectInsufficientMaterial())
//       }
//       else if(arbitar.isStalemate(newPosition,opponent,castleDirection)){
//       dispatch(detectStalemate())
//     }
//     } 
//     dispatch(clearCandidates());
// } 
//   const onDrop = (e) => {
//     e.preventDefault();
//     move(e);
//     const newPosition = copyPosition(currentPosition);
   

    
//     dispatch(clearCandidates());
//   };

//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       ref={ref}
//       onDragOver={onDragOver}
//       onDrop={onDrop}
//       className="pieces"
//     >
//       {currentPosition.map((r, rank) =>
//         r.map((f, file) =>
//           currentPosition[rank][file] ? (
//             <Piece
//               key={`${rank}-${file}`}
//               rank={rank}
//               file={file}
//               piece={currentPosition[rank][file]}
//             />
//           ) : null
//         )
//       )}
//     </div>
//   );
// };

const Pieces = () => {

    const { appState , dispatch } = useAppContext();
    const currentPosition = appState.position[appState.position.length-1]

    const ref = useRef()

    const updateCastlingState = ({piece,file,rank}) => {
        const direction = getCastlingDirections({
            castleDirection:appState.castleDirection,
            piece,
            file,
            rank
        })
        if (direction){
            dispatch(updateCastling(direction))
        }
    }

    const openPromotionBox = ({rank,file,x,y}) => {
        dispatch(openPromotion({
            rank:Number(rank),
            file:Number(file),
            x,
            y
        }))
    }

    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)

        return {x,y}
    }

    const move = e => {
        const {x,y} = calculateCoords(e)
        const [piece,rank,file] = e.dataTransfer.getData("text").split(',')

        if(appState.candidateMoves.find(m => m[0] === x && m[1] === y)){
            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'white' : 'black'}`]

            if ((piece==='wp' && x === 7) || (piece==='bp' && x === 0)){
                console.log("Promotion required")
                openPromotionBox({rank,file,x,y})
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece,file,rank})
            }
            const newPosition = arbitar.performMove({
                position:currentPosition,
                piece,rank,file,
                x,y
            })
            const newMove = getNewMoveNotation({
                piece,
                rank,
                file,
                x,
                y,
                position:currentPosition,
            })
            dispatch(makeNewMove({newPosition,newMove}))

            if (arbitar.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            else if (arbitar.isStalemate(newPosition,opponent,castleDirection)){
                dispatch(detectStalemate())
            }
            else if (arbitar.isCheckMate(newPosition,opponent,castleDirection)){
                dispatch(detectCheckmate(piece[0]))
            }
        }
        dispatch(clearCandidates())
    }

    const onDrop = e => {
        e.preventDefault()
        
        move (e)
    }
    
    const onDragOver = e => {e.preventDefault()}

    return <div 
        className='pieces' 
        ref={ref} 
        onDrop={onDrop} 
        onDragOver={onDragOver} > 
        {currentPosition.map((r,rank) => 
            r.map((f,file) => 
                currentPosition[rank][file]
                ?   <Piece 
                        key={rank+'-'+file} 
                        rank = {rank}
                        file = {file}
                        piece = {currentPosition[rank][file]}
                    />
                :   null
            )   
        )}
    </div>
}


export default Pieces;

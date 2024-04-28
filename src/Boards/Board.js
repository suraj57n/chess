import "./Board.css";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
import Pieces from "../Pieces";

import { useAppContext } from "../context/context";
import { Popup } from "../Popup/Popup";
import arbitar from "../arbitar/arbitar";
import { getKingPosition } from "../arbitar/getMoves";
import PromotionBox from "../Popup/Promotion/PromotionBox";
import GameEnds from "../Popup/Promotion/GameEnds";
const Board = () => {
    const {appState}=useAppContext()
   
    const position=appState.position[appState.position.length-1];
    const checkTile = (() => {
      
        const isInCheck =  (arbitar.isPlayerInCheck({
            positionAfterMove : position,
            player : appState.turn
        }))

        if (isInCheck)
            return getKingPosition (position, appState.turn)

        return null
    })()
    const getClassName = (i, j) => {
        let c = 'tile';
        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light';
        if(appState.candidateMoves?.find(m=>m[0]===i &&m[1]==j )){
            // console.log(position[i][j]);
            if(position?.[i]?.[j]){
                c+=' attacking'
            }
            else{
                c+=' highlight'
            }
           
        }
        if (checkTile && checkTile[0] === i && checkTile[1] === j) {
          
            c+= ' checked'
        }
        return c; // Added return statement
    }
    const ranks = Array(8).fill().map((x, i) => 8 - i);
    const files = Array(8).fill().map((x, i) => (i+1));
   
    return (
        <div className="board">
           <Ranks ranks={ranks}/>
           <div className='tiles'>
            {ranks.map((rank,i) => 
                files.map((file,j) => 
                    <div 
                        key={file+''+rank} 
                        i={i}
                        j={j}
                        className={`${getClassName(7-i,j)}`}>
                    </div>
                ))}
        </div>
            <Pieces/>
            <Popup>
                <PromotionBox/>
                <GameEnds/>
            </Popup>
            <Files files={files}/>
        </div>
    );
};
export default Board;
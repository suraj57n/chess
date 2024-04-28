import "./PromotionBox.css";
import { useAppContext } from "../../context/context";
import { copyPosition } from "../../helper";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import { Status } from "../../constant";
import { getNewMoveNotation } from "../../helper";


// const PromotionBox = ({onClosePopup}) => {
//     const{appState,dispatch}=useAppContext();
//     const {promotionSquare} = appState;
   
//     const options = ['q', 'r', 'b', 'n'];
//     const color = 'w';
   
//     const onClick = option => {
//         onClosePopup()

//         console.log("this being called")
//         const newPosition = copyPosition (appState.position[appState.position.length - 1])
        
//         newPosition[promotionSquare.rank][promotionSquare.file] = ''
//         newPosition[promotionSquare.x][promotionSquare.y] = color+option
//         const newMove = getNewMoveNotation({
//             ...appState.selectedPiece,
//             x : promotionSquare.rank,
//             y : promotionSquare.file,
//             position:appState.position[appState.position.length - 1],
//             promotesTo : option
//         })
//         dispatch(clearCandidates())

//         dispatch(makeNewMove({newPosition,newMove}))

//     }
//     const getPromotionBoxPosition=()=>{
//     const style={}
 

//     if(!promotionSquare) return null;
//     const color=promotionSquare.x==7?'w':'b';
//     const y=promotionSquare.y;
//     const x=promotionSquare.x;
//     if(x===7)  
//         style.top='-12.5%'
//     else {
//         style.top='97.5%'
//     }
//     if(y<=1)
//     {
//         style.left='0%'
//     }
//     else if(y>=6)
//     {
//         style.right='0%'
//     } 
//     else{
//         style.left=`${12.5*y -20}%`
//     }
//     return style
// }

//     return (
     
//         <div className="popup-inner promotion-choices" style={getPromotionBoxPosition()}>
      
//       {options.map(option => (
//   <div className={`piece ${color}${option}`} onClick={() => onClick(option)} key={option}>
//     {option}
//   </div>
// ))}
      
//         </div>
//     );
      
      
// };




const PromotionBox = ({onClosePopup}) => {

    const { appState , dispatch } = useAppContext();
    const {promotionSquare} = appState;

    if (!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'
    const options = ['q','r','b','n']

    const getPromotionBoxPosition = () => {
        let style = {}

        if (promotionSquare.x === 7) {
            style.top = '-12.5%'
        }
        else{
            style.top = '97.5%'
        }

        if (promotionSquare.y <= 1){
            style.left = '0%'
        }
        else if (promotionSquare.y >= 5){
            style.right = '0%'
        }
        else {
            style.left = `${12.5*promotionSquare.y - 20}%`
        }

        return style
    }

    const fun = option => {
        onClosePopup()
        console.log("promotion option called")
        const newPosition = copyPosition (appState.position[appState.position.length - 1])
        
        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color+option
        dispatch(clearCandidates())
        dispatch(makeNewMove({newPosition}))

    }

    return <div className="popup--inner promotion-choices" style={getPromotionBoxPosition()}>
        {options.map (option => 
            <div key={option}
            onClick={() => fun(option)}
                className={`piece ${color}${option}`}
            />
        )}
    </div>

}

export default PromotionBox



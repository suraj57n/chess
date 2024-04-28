import { useAppContext } from "../../context/context"
import "./MovesList.css"
// const MovesList=()=>{
//     const {appState:{movesList}}=useAppContext();
//     return (
//         <div className="moves-list">
//             {movesList.map((move,i)=>{
//                 {console.log(move)}
//                 <div key={i} data-number={Math.floor((i/2)+1)}>{move}</div>
//             })}
//         </div>
//     )
// }
const MovesList = () => {

    const { appState : {movesList} } = useAppContext();
console.log(movesList)
    return <div className='moves-list'>
        {movesList.map((move,i) => 
            <div key={i} data-number={Math.floor(i/2)+1}>{move}</div>
        )}
    </div>
}

export default MovesList
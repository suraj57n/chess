// import { Status } from "../constant";
// import React from "react";
// import { useAppContext } from "../context/context"
// import "./Popup.css"
// import { closePopup } from "../reducer/popup";
// import PromotionBox from "./Promotion/PromotionBox"
// import GameEnds from "./Promotion/GameEnds";

// export const Popup = ({children}) => {

//     const { appState : {status}, dispatch } = useAppContext();

//     const onClosePopup = () => {
//         dispatch(closePopup())
//     }

//     if (status === Status.ongoing)
//         return null

//     return <div className="popup">
//         {React.Children
//             .toArray(children)
//             .map (child => React.cloneElement(child, { onClosePopup }))}
//     </div>
// }


import { Status } from "../constant";
import React from "react";
import { useAppContext } from "../context/context";
import "./Popup.css"; // Assuming CSS file exists
import { closePopup } from "../reducer/popup"; // Assuming action is defined
import PromotionBox from "./Promotion/PromotionBox";
import GameEnds from "./Promotion/GameEnds";

export const Popup = ({ children }) => {
  const { appState: { status } } = useAppContext();

  const onClose = () => closePopup(); // More descriptive name

  // Conditional rendering based on status and presence of children
  if (status === Status.ongoing || !children) {
    return null;
  }

  // Efficiently handle multiple children using spread operator
  return (
    <div className="popup">
  {React.Children.toArray(children).map((child) => (
    React.cloneElement(child, { onClose })
  ))}
</div>
  );
};


// export const Popup=({children})=>{
//     const{appState,dispatch}=useAppContext();
//     if(appState.status===Status.ongoing)
//     {
//         return null;
//     } 
//     const onClosePopup=()=>{
//         dispatch(closePopup())
//     }
//     return(
//         <div className="popup">
//             {/* <PromotionBox onClosePopup={onClosePopup}/> */}
//             {Status.promotion ? ( 
//       <PromotionBox onClosePopup={onClosePopup} />
//     ) : (
//       <GameEnds />
//     )}
//         </div>
//     )
// }


// export const Popup = ({children}) => {

//     const { appState : {status}, dispatch } = useAppContext();

//     const onClosePopup = () => {
//         dispatch(closePopup())
//     }

//     if (status === Status.ongoing)
//         return null

//     return <div className="popup">
//         {React.Children
//             .toArray(children)
//             .map (child => React.cloneElement(child, { onClosePopup }))}
//     </div>
// }

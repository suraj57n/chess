import "./Pieces.css";

import React, { useState } from 'react';
import Piece from "./Piece"
import {createPosition} from "./helper";
const Pieces = () => {
    const[state,setState]=useState(createPosition());
  
    // console.log(state);
    return (
        <div className="pieces">
            {state.map((r, rank) => 
               
                    r.map((f, file) => 
                       
                       state[rank][file] ? <Piece
                       file={file}
                       rank={rank}
                       piece={state[rank][file]}
                       />: null
                     
                    )
               
            )}
        </div>
    );
   
}

export default Pieces;


import { useReducer } from 'react';
import './App.css';
import Board from "./Boards/Board"
import { initGameState } from './constant';
import AppContext from './context/context';
import MovesList from './Control/bits/MovesList';
import TakeBack from './Control/bits/TakeBack';
import Control from './Control/Control';
import { Popup } from './Popup/Popup';
import { reducer } from './reducer/reducer';

function App() {
 const[appState,dispatch]= useReducer(reducer,initGameState)
 const providerState={
  appState,
  dispatch
 }
  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board/>
        <Control>
          <TakeBack/>
          {/* <MovesList/> */}
        </Control>
        <Popup/>
      </div>
    </AppContext.Provider>
  );
}

export default App;

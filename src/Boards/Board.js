import "./Board.css";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
import Pieces from "../Pieces";
const Board = () => {
    const convertToAlphabet = (num) => {
        if (num < 0 || num > 25) {
            throw new Error("Input must be between 0 and 25");
        }
        return String.fromCharCode(num + 96);
    };
    const getClassName = (i, j) => {
        let c = 'tile';
        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light';
        return c; // Added return statement
    }
    const ranks = Array(8).fill().map((x, i) => 8 - i);
    const files = Array(8).fill().map((x, i) => convertToAlphabet(i+1));
    return (
        <div className="board">
           <Ranks ranks={ranks}/>
            <div className="tiles">
                {ranks.map((rank, i) =>
                
                    files.map((file, j) => (
                        
                        <div key={`${file}-${rank}`} className={getClassName(9-i,j)}>
                            {rank}
                            {file}
                        </div>
                    ))
                )}
            </div>
            <Pieces/>
            <Files files={files}/>
        </div>
    );
};
export default Board;

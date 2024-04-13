import "./Pieces.css"
const Piece=({rank,file,piece})=>{
    const onDragStart =e=>{
        console.log(e);
    }
return (
    <div className={`piece ${piece} p-${file}${rank}`} 
    draggable={true}
    onDragStart={onDragStart}
    >

    </div>
)
}
export default Piece;
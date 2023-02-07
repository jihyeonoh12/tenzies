
export default function Start(props) {
   
    const ascendingOrder = props.recordBoard.sort(function(a, b){return a-b});
     const recordList =  ascendingOrder.map((list, index) => {
            if ( index < 5) {
                return <div className="game-list"><h2>{index + 1 + '. '}</h2> <h2>{list} <span className="seconds"> seconds</span></h2></div>
            } else {
                return 
            }
        })
    
    return (
        <div className="start-screen">
        <h1 className="dice-emoji">🎲</h1>
            <h1 className="start-title">Tenzie</h1>
            <h2>The world's fastest game!</h2>
            <button onClick={props.handleClick} className="start-button">Start Rolling</button>

            <div className='game-board' style={ props.recordBoard[0] ? {display: 'block'} : {display: 'none'}}>
                <h1>Top 5 Record</h1>
                <div>{recordList}</div>
            </div>
        </div>

        
    )
}
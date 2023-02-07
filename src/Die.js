
export default function Die(props) {
    const color = props.held ? 'lightgreen' : 'white'
    return (
        <div className='die' onClick={props.handleClick} style={{backgroundColor: color }}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}
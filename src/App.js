import './App.css';
import {useState, useEffect} from 'react';
import Die from './Die'
import Start from './Start'

import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [timer, setTimer] = useState(0)
  const [start, setStart] = useState(false);
  const [record, setRecord] = useState(() => {
   return  JSON.parse(localStorage.getItem("Time")) === null ? [] : JSON.parse(localStorage.getItem("Time"));
  })

  useEffect(() => {
    const checkIsHeld = dice.every(die => die.isHeld)
    const checkValue = dice.every(die => die.isHeld === dice[0].isHeld)
 
    if(checkIsHeld && checkValue) {
      setTenzies(true)
      setStart(false)

       setRecord(prevRecord => [...prevRecord, timer])
       localStorage.setItem("Time", JSON.stringify(record))
      
    }
  },[dice, tenzies])

//timer
  useEffect(() => {
    let interval = null
    if (start) {
      interval = setInterval(() => {
        setTimer((timer) =>  timer + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  },[start])
//timer end

  function generateDie() { 
    return {
        value : Math.ceil(Math.random() * 6),
        isHeld : false,
        id : nanoid()
      }
    
  }

  function allNewDice() {
    const newArray = []
    for (let i = 0 ; i < 10; i++) {
      newArray.push(generateDie())
    }
    return newArray
  }

  const generateDiceComp = dice.map(die => {
    return <Die value={die.value} held={die.isHeld} key={die.id} handleClick={() => holdDice(die.id)}/>
  })

  function rollDice () {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setTimer(0)
    } else {
    setDice( oldDice => oldDice.map( die => {
      return  !die.isHeld ? generateDie() : die
    }))
  }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map( die => {
      return ( 
      id === die.id ?
      {...die, isHeld: !die.isHeld} :
      die
      )
    }))
  }

function startTimer() {
  setStart(true)
}

function backToScreen() {
  setTimer(0)
}



  return (
    <main>
      { timer < 1 && <Start handleClick={startTimer} recordBoard={record}/>}
      <div className='body' style={ timer < 1 ? {display: 'none'} : {display: 'block'}}>
      {tenzies && <Confetti />}
      <h1 className='game-title'>🎲 Timer : {timer} 🎲</h1>
      <div className='game-container'>{generateDiceComp}</div>
      <div className='button-container'>
      <button className='button button-roll' onClick={rollDice}>{tenzies ? 'restart' : 'Roll Dice'}</button>
      {tenzies && <button className='button button-back' onClick={backToScreen}>Back to Home</button>}
      </div>    

      </div>
    </main>
  );
}

export default App;

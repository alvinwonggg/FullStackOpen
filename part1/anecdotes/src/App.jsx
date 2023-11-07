import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return (
      <button onClick = {props.clickFunc}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <div>
      <p id ='heading'>{props.anecdotes[props.selected]}</p>
      <p>has {props.votes[props.selected]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const randomNum = () => {
    let r = Math.floor(Math.random() * 8);
    return r
  }

  const changeVotes = () => {
    //react does not re render components unless the refernce to the use
    //state changes, meaning you have to change the state address
    const copy = [...votes];
    console.log("copy", copy)
    copy[selected] += 1
    setVotes(copy)
    console.log("votes", votes)
    return
  }
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(8))

  return (
    <div>
      <Display anecdotes={anecdotes} votes={votes} selected = {selected}/>
      <Button clickFunc = {changeVotes} text='vote'/>
      <Button clickFunc = {() => setSelected(randomNum())} text='next anecdote'/>
    </div>
  )
}

export default App
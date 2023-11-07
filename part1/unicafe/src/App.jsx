import { useState } from 'react'
//import useState to keep track of states and update website on the fly

//Button raect component, takes in clickFunc and renders text on button
const Button = (props) => {
  return (
    <button onClick={props.clickFunc}>{props.text}</button>
  )
}

//staistic line, return one element that is a row, renders two cells
//a cell is td, row is tr element, renders text and value
const StatisticLine = (props) => {
  console.log(props)
  return (
    <tr>
        <td>{props.text} </td>
        <td>{props.value} </td>
    </tr>
  )
}

//renders all the statistics using the stats line component, takes in
//all the good bad and neutral count to make stats
//returns no feedback given if a button has not been pressed
const Statistics = (props) => {
  let total = props.goodCount + props.badCount + props.neutralCount
  if(total === 0) {
    return (
      <div>
        <h1>
        statistics
      </h1>
      <p>No feedback given.</p>
      </div>
    )
  }
  
  //other wise create all the stats using the statsline component
  //put them in a table as all stats line return one element of a row
  return (
    <div>
      <h1>
        statistics
      </h1>
      <div>
        <table>
        <StatisticLine text ='good' value={props.goodCount}/> 
        <StatisticLine text ='neutral' value={props.neutralCount}/>
        <StatisticLine text ='bad' value={props.badCount}/>

        <StatisticLine text ='all' value={total}/>
        <StatisticLine text ='average' value={(props.goodCount - props.badCount)/total}/>
        <StatisticLine text ='positive' value={(props.goodCount/total*100) + "%"}/>
        </table>
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good)

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button clickFunc ={() => setGood(good+1)} text='good'/>
      <Button clickFunc ={() => setNeutral(neutral+1)} text='neutral'/>
      <Button clickFunc ={() => setBad(bad+1)} text='bad'/>
      <Statistics goodCount = {good} neutralCount = {neutral} badCount = {bad}/>
    </div>
  )
}

export default App
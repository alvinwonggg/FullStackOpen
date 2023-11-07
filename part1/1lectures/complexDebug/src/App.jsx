import {useState} from 'react'

//rending of the clicking history is handled by a new History component

const History = (props) => {
  //if no clicks = 0, meaning no input, do not show button press history
  //this is called conditional rendering
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  //if there have been clicks, render the button press history
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

//now defining our own button component to return a button element in html
//destructuring the props into handleClick and text immediately
const Button = ({ handleClick, text}) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const App = () => {

  //use state is a function that returns two variables
  //a var that stores a state, and a var that stores a function that sets
  //the state. the value passed to useState is what is the type of var
  //passed to click. setclicks modifies it
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  //arrow functions, handleleftClick is set as a function using setClicks
  //note click and setClicks are constant but modified by setClicks
  //click and SetClicks are not meant to be modified directly but copied
  //then returned as a new object
  //conside this function, it creates a new object to pass
  const handleLeftClick2 = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  //uses ...destructoring, the ...click represents all other clicks
  //that r not specified or used
  const handleLeftClick3 = () => {
    const newClicks = { 
      ...clicks, 
      left: clicks.left + 1 
    }
    setClicks(newClicks)
  }

  //can simplify previous function to this, the {} around ...clicks
  //represents that its creating a new obj
  //must create new object
  const handleLeftClick4 = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

  const handleRightClick5 = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  //concat creates new array object
  //console.log shows that state update in react happens asynchrously
  //i.e set left does not update left immediately
  //not immediately, to fix this we make a new var updated left
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left+1;
    setLeft(updatedLeft)
    setTotal(updatedLeft+right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R')) 
    const updatedRight = right+1;
    setRight(updatedRight)
    setTotal(left+updatedRight)
 }

  //cant add comments in the html doc
  //onClick attribute is the event handler, must incase function in {}
  //left and right represent the counters
  //allClicks.join(' ') joins all the strings seperated by a space
  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks} />
      <p>Total: {total}</p>
    </div>
  )
}
export default App
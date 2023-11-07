// const Hello = ({name, age}) => {
  
//   const bornYear = () => new Date().getFullYear()-age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
  // const name = 'Peter'
  // const age = 10

  // return (
  //   <div>
  //     <h1>Greetings</h1>
  //     <Hello name="Maya" age={26 + 10} />
  //     <Hello name={name} age={age} />
  //   </div>
  // )
// }

// const App = (props) => {
//   const {counter} = props
//   return (
//     <div>{counter}</div>
//   )
// }

// export default App

import { useState } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
    //use states passes back two things, the state, and a function to modify the state

  // setTimeout( //this is a global function, good to know
  //   () => setCounter(counter + 1), //every time setCounter moidifeis states it causes component to re render
  //   1000
  // )
  // console.log('rendering...', counter)

  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter+1)
  const decreaseByOne = () => setCounter(counter-1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick = {increaseByOne} text ='plus'/>
      <Button handleClick = {setToZero} text ='zero'/>
      <Button handleClick = {decreaseByOne} text ='minus'/>
    </div>
  )
}

export default App
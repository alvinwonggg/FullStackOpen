const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old!
      </p>
    </div>
  )
}


const App = () => {
  // const now = new Date()
  // const a = 10
  // const b = 20
  // console.log(now,a+b)
  // return (
  //   <div>
  //     <p>Hello world, it is now {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a+b}
  //     </p>
  //   </div>
  // )

//   const name = "Rei Chen"
//   const age = 19
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Alvin" age="20"/>
//       <Hello name={name} age={age}/>
//     </div>
//   )

  const friends = [
    { name: "Peter", age: 18},
    { name: "Maya", age: 19}
  ]

  const names = ["Peter", "Maya"]

  return (
    <div>
      {/* <p>{friends[0].name} { friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p> */}
      <p>{names}</p>
    </div>
  )
}

export default App
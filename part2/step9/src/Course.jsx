const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log("course parts",props.course.parts)
    return(
      <div>
        {
          props.course.parts.map(part => <Part part={part}/>)
        }
        
      </div>
    )
  }
  
  const Total = (props) => {
    const accumulator = 0;
    const total = props.course.parts.reduce((accumulator,currentValue) => {
      return accumulator + currentValue.exercises
    }, 0)
    console.log("total",total)
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    )
  }
  
  
  
  const Part = (props) => {
    console.log("Part props",props)
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  }

const Course = ( {course} ) => {
  return (
    <div>

      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default Course

  
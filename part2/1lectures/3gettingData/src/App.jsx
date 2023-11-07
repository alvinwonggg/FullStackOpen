import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened')

  // // runs everytime the frame is rednered, so axios.get initiates fetching of data
  // //
  // useEffect(() => {
  //   console.log('effect') 
  //   axios
  //     .get('http://localhost:3001/notes')
  //     //when data arrives from server, javascript runtime calls the function registered
  //     //as event handler, which runs the code below
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       console.log(response.data)
  //       setNotes(response.data)
  //     })
  // }, [])
  // console.log('render', notes.length, 'notes')

  //rewriting above code differenrtly
  const hook = () => {
    // console.log('effect')
    // axios
    //   .get('http://localhost:3001/notes')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setNotes(response.data)
    //   })
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
    })
  }
  
  //can easily see that useEffect takes in two parameters, first is afunction, the effect
  //itself. Effects run after every completed render but you can choose to fire
  //it only when certain values have changed. Second parameter of useEffect specifies
  //how often effect is run
  //if empty vector effect only runs along with first render of component
  useEffect(hook, [])

 //addNote listens to event, on submission of the form element, this func is called
 const addNote = (event) => {
  event.preventDefault()
  console.log("this is our new note: ",newNote)
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    // id: notes.length + 1,
  }
  // setNotes(notes.concat(noteObject))
  // setNewNote('')
  // console.log('button clicker', event.target)
  // commented these out to let id property be server geneerated

  //axios posts to notes the note object, response logs the re
  // axios
  //     .post('http://localhost:3001/notes', noteObject)
  //     .then(response => {
  //       console.log(response)
  //       setNotes(notes.concat(response.data))
  //       setNewNote('')
  //     })

  noteService
  .create(noteObject)
  .then(response => {
    setNotes(notes.concat(response.data))
    setNewNote("")
  })
 }

//event handler is called every time a change in input element occurs
//function recieves the event object as it event parameter
const handleNoteChange = (event) => { 
  console.log(event.target.value)
  setNewNote(event.target.value)
}

const toggleImportanceOf = (id) => {
  //defines unique URL for each note resource based on ID
  const url = `http://localhost:3001/notes/${id}`

  //find note we want to modify and set it to note
  const note = notes.find(n => n.id === id)

  //create new note object by setting the important to opposite of what it was
  //never want to mutate state directly in React, wont rerender because it wont notice
  const changedNote = { ...note, important: !note.important }

  //new note is sent with a PUT request to the backend where it will replace old obj
  // axios.put(url, changedNote).then(response => {
    //map method creates new array by mapping every item from old array into new one
    //if condition is false, then the note object returned by the server is added
    //into the array instead
    // setNotes(notes.map(n => n.id !== id ? n : response.data))
  // })
  noteService
  .update(id,changedNote)
  .then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
  .catch(error => {
    setErrorMessage(
      `the note '${note.content}' was already deleted from server`
    )
    setNotes(notes.filter(n => n.id !== id))
  })
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
  console.log(`importance of ${id} needs to be toggled`)
}

//chooses which notes to show, imporatnt ones or all, using var ? val1 : val 2 format
const noteToShow = showAll
  ? notes
  : notes.filter(note => note.important)

return (
  <div>
    <h1>Notes</h1>
    <Notification message={errorMessage}/>
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
      </button>
    </div>
    <ul>
      {noteToShow.map(note => 
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
      )}
    </ul>
    
    {/* onSubmit is function when form is submitted 
     Form is a container element for different types of input elements*/}
    <form onSubmit={addNote}>
      {/* input element is most used form element */}
      <input 
        value= {newNote}
        // onChange event occurs when we modify the element's (input's) value
        onChange={handleNoteChange}
      />
      <button type="submit">Save</button>
    </form>
    
  </div>
)
}

export default App
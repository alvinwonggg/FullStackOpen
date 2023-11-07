import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  //multiple useStates, some for storing notes, some for adding additional info
  //some for showing all
  const [notes,setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  //addNote listens to event, on submission of the form element, this func is called
  const addNote = (event) => {
    event.preventDefault()

    console.log("this is our new note: ",newNote)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
    console.log('button clicker', event.target)
  }

  //event handler is called every time a change in input element occurs
  //function recieves the event object as it event parameter
  const handleNoteChange = (event) => { 
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  //chooses which notes to show, imporatnt ones or all, using var ? val1 : val 2 format
  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {noteToShow.map(note => 
          <Note key={note.id} note={note} />
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
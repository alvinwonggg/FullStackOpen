import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

//note front end


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    
    //rewriting above code differenrtly
    const hook = () => {
        noteService
        .getAll()
        .then(response => {
            setNotes(response.data)
        })
    }
    useEffect(hook, [])
    
    //addNote listens to event, on submission of the form element, this func is called
    const addNote = (event) => {
        event.preventDefault()
        console.log("this is our new note: ",newNote)
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }
        
        
        noteService
        .create(noteObject)
        .then(response => {
            setNotes(notes.concat(response.data))
            setNewNote("")
        })
    }
    
    //function recieves the event object as it event parameter
    const handleNoteChange = (event) => { 
        console.log(event.target.value)
        setNewNote(event.target.value)
    }
    
    const toggleImportanceOf = (id) => {
        //defines unique URL for each note resource based on ID
        const url = `http://localhost:3001/api/notes/${id}`
        
        //find note we want to modify and set it to note
        const note = notes.find(n => n.id === id)
        
        //create new note object by setting the important to opposite of what it was
        const changedNote = { ...note, important: !note.important }
        
        //new note is sent with a PUT request to the backend where it will replace old obj
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
                {noteToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/> )}
            </ul>  
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
        export default App
import Note from './Note'

//Destructure the props into a notes object
const App = ( {notes} ) => {
  // const { notes } = props
  // no longer need above code because props is not used

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}

        {/* we can use mapping notation here instead of listing everything out
        {notes.map(note => 
          // every object should unique attribute called key, must do this to rerender
          <li key={note.id}>
            {note.content}
          </li>
        )} */}

        {notes.map(note => <Note key={note.id} note ={note} />)}


      </ul>
    </div>
  )
}

export default App
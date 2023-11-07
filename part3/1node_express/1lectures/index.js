//note backend

//import express to create express application stored in app var
const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())
app.use(express.static('dist')) //in order to make express 


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

//event handler used to handle HTTP GET requests made to the application's / root
app.get('/api/notes/:id', (request, response) => { //request contains all info of HTTP request, response is used to define how request is responded to
  // response.send('<h1>Hello World!</h1>') //request is answered by sending string

  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//event handler that handles HTTP GET requests made to the notes path of the application:
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

//delete event handler request
app.delete('api/motes/:id', (request, response) => {
  const id = Number(request.params.id)
  
  notes = note.filter(note => note.id !== id)
  response.status(204).end
})


const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

//event handler for doing post request
app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
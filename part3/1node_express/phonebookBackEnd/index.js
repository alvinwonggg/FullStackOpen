const express = require('express') //import express module
const morgan = require('morgan') //import morgan module
const cors = require('cors') //import cors for cross origin communication

const app = express() //create express object stored in app
app.use(express.static('dist'))


//json parser for stuff, takes raw data from requests
//that are stored in request object, parses it into a javascript object and
//assigns it to the request object as a new property body
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

//use middleware functions for each request, cors allows cross origin communication
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => {
    console.log(request.params)
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response) => {
    console.log("HELLO")
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/api/info', (request,response) => {
    const date = new Date();
    response.send(
        `
        <p>Phone book has info for ${persons.length} people</p>
        <p>${date}</p>
        `
        )
})

app.post('/api/persons',(request,response) => {
    const id = Math.floor(Math.random() * 1000);
    const name = request.body.name
    const number = request.body.number

    if (!name || !number) {
        return response.status(400).json({ 
          error: 'name or number is missing' 
        })
    }

    if(persons.find(person => person.name === name)) {
        console.log("Person already found")
        return response.status(400).json({
            error: 'Name already in phonebook',
        })
    }

    const person = {
        id: id,
        name: name,
        number: number,
    }

    persons = persons.concat(person)
    response.json(persons)
})

//middleware runs based on order of the app.use. Middleware runs every time a request
//is made
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
    
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
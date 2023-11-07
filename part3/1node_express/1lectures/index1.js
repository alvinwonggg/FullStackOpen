// Old index using basic modules

//import Node's built in web server module
const http = require('http')


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

//new App method to offer raw JSON data to frontend
//sends using JSON stringify method
const newApp = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

//uses create server method of the http module to create a new web server
//event handler is registered to the server that is called every time an HTTP request 
//is made to the server's address http://localhost:3001.
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})


//bind http server assigned to the app variable, listen to HTTP requests sent to Port 3001
const PORT = 3001
newApp.listen(PORT)
console.log(`Server running on port ${PORT}`)
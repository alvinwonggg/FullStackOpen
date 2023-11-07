import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/person'


const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setNewFilter] = useState('')


	//Add New Person Funciton Event Handler for Form Submit
	const addNewPerson= (event) => {
		console.log("button pressed")
		event.preventDefault()

		const names = persons.map(person => person.name)
		//New name and New number are from useStates being updated
		const newPerson = {
			name: newName,
			number: newNumber
		}

		//if name is already added to thing
		if(names.includes(newName)) {
			// alert (newName + ' is already added to the phonebook.');
			if(window.confirm(`${newName} is already added to the phonebook, do you want to replace the old phone number?`)) {
				const id = (persons.find(person => person.name === newName)).id
				personService
				.update(id,newPerson)
				.then(response => {
					console.log(response.data)
					setPersons(persons.map(person => person.id === id ? response.data : person))
					setNewName("")
					setNewNumber("")
				})
				.catch(error => {
					alert("something wrong")
				})
				return
			} else {
				return
			}
		}

		personService
		.create(newPerson)
		.then(response => {
			setPersons(persons.concat(response.data))
			setNewName("")
			setNewNumber("")
		})
	}


	//HandleNameChange input change function event handler
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	//HanldeNumberChange input change function event handler
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	//HandleFilterChange input change function event handler
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	//Filter for showing who is shown, returns new array with every object that passes the bool test
	const peopleShown = persons.filter(person => person.name.includes(filter))


	const deleteEntry = (id) => {
		// template literal
		const url = `http://localhost:3001/notes/${id}`
		const person = persons.find(n => n.id === id)

		//if cant confirm the delete return
		if (!window.confirm(`Do you want to delete ${person.name} from the phone book?`)) {
			return
		}

		//deleting people code
		personService
		.deleteEntry(id)
		.then(response => {
			setPersons(persons.filter(person => person.id != id))
		})
		.catch(error => {
			alert(`Something has gone wrong!`)
		})
		console.log(`deleted entry ${id}`)
	}


	//hook function passed into useEffect hook, performs GET REQUEST to persons and then sets person based on response data
	const hook = () => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}
	//useEffect used here, hook function passed from above, empty array signifies it runs on first render of component only
	useEffect(hook,[])
	//useEffect runs hook (first parameter) on first render of component but also when second parameter changes


	//HTML Code Returned Here
	return (
		<div>
			<h2>Phonebook</h2>
			<p>Filter shown with:</p>
			<input onChange={handleFilterChange}></input>
			<h2>Add a new person:</h2>
			<form onSubmit ={addNewPerson}>
				<div> name: <input value={newName} onChange={handleNameChange}/> </div>
				<div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
				<div> <button type="submit">add</button> </div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{peopleShown.map(person => <Person key={person.id} person={person} deleteEntry={() => deleteEntry(person.id)}/>)}
			</ul>
		</div>
	)
}

export default App
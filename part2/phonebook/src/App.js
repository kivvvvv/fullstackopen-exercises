import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

export default function App () {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [searchKeyword, setSearchKeyword] = useState('')

	useEffect(() => {
		Axios.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const handleFormSubmit = event => {
		event.preventDefault()
		if (persons.map(person => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		setPersons(persons.concat({
			name: newName,
			number: newPhoneNumber
		}))
		setNewName('')
		setNewPhoneNumber('')
	}

	const handleSearchKeywordChange = event => {
		setSearchKeyword(event.target.value.toLowerCase())
	}

	const handleNameChange = event => {
		setNewName(event.target.value)
	}

	const handlePhoneNumberChange = event => {
		setNewPhoneNumber(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleChange={handleSearchKeywordChange} searchKeyword={searchKeyword}/>
			<h2>add a new</h2>
			<PersonForm
				handleSubmit={handleFormSubmit}
				handleNameChange={handleNameChange}
				newName={newName}
				handlePhoneNumberChange={handlePhoneNumberChange}
				newPhoneNumber={newPhoneNumber}/>
			<h2>Numbers</h2>
			<Persons persons={persons} searchKeyword={searchKeyword}/>
		</div>
	)
}

import React, {useState, useEffect} from 'react'

import PersonService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

export default function App () {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [searchKeyword, setSearchKeyword] = useState('')
	const [successMessage, setSuccessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		PersonService.fetchAll()
			.then(fetchedPersons => {
				setPersons(fetchedPersons)
			})
	}, [])

	const handleFormSubmit = event => {
		event.preventDefault()

		const newPerson = {
			name: newName,
			number: newPhoneNumber
		}

		if (persons.map(person => person.name).includes(newPerson.name)) {
			if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new on`)) {
				return
			}

			const person = persons.find(person => person.name === newPerson.name)
			PersonService.updateOnById(person.id, newPerson)
				.then(updatedPerson => {
					setPersons(prevState => prevState.map(person => (
						person.id === updatedPerson.id ? updatedPerson : person
					)))
					setNewName('')
					setNewPhoneNumber('')
				})
			return
		}

		PersonService.create(newPerson)
			.then(createdPerson => {
				setPersons(persons.concat(createdPerson))
				setSuccessMessage(`Added ${createdPerson.name}`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)
			})

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

	const handleDeletePersonByIdClick = (id, name) => () => {
		if (!window.confirm(`Delete ${name} ?`)) {
			return
		}

		PersonService.deleteOneById(id)
			.then(() => {
				setPersons(persons.filter(person => person.id !== id))
			})
			.catch(() => {
				const person = persons.find(person => person.id === id)
				setPersons(prevState => prevState.filter(person => person.id !== id))
				setErrorMessage(`Information of ${person.name} has been removed from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	return (
		<div>
			<h2>Phonebook</h2>
			{successMessage && (
				<div className="alert-message success">{successMessage}</div>
			)}
			{errorMessage && (
				<div className="alert-message error">{errorMessage}</div>
			)}
			<Filter
				handleChange={handleSearchKeywordChange}
				searchKeyword={searchKeyword}/>
			<h2>add a new</h2>
			<PersonForm
				handleSubmit={handleFormSubmit}
				handleNameChange={handleNameChange}
				newName={newName}
				handlePhoneNumberChange={handlePhoneNumberChange}
				newPhoneNumber={newPhoneNumber}/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				searchKeyword={searchKeyword}
				onDeletePersonByIdClick={handleDeletePersonByIdClick}/>
		</div>
	)
}

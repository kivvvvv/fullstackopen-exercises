import React from 'react'

export default function Persons ({persons, searchKeyword, onDeletePersonByIdClick}) {
	return (
		<div>
			{persons
				.filter(person => person.name.toLowerCase().includes(searchKeyword))
				.map(person => (
					<div>
						<span key={person.name}>{person.name} {person.number}</span>
						<button onClick={onDeletePersonByIdClick(person.id, person.name)}>delete</button>
					</div>
				))
			}
		</div>
	)
}
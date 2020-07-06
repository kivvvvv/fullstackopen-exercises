import React from 'react'

export default function Persons ({persons, searchKeyword, onDeletePersonByIdClick}) {
	return (
		<div>
			{persons
				.filter(person => person.name.toLowerCase().includes(searchKeyword))
				.map(person => (
					<div key={person.id}>
						<span>{person.name} {person.number}</span>
						<button onClick={onDeletePersonByIdClick(person.id, person.name)}>delete</button>
					</div>
				))
			}
		</div>
	)
}
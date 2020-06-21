import React from 'react'

export default function Persons ({persons, searchKeyword}) {
	return (
		<div>
			{persons
				.filter(person => person.name.toLowerCase().includes(searchKeyword))
				.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
		</div>
	)
}
import React from 'react'
import FormField from './FormField'

export default function PersonForm ({handleSubmit, handleNameChange, newName, handlePhoneNumberChange, newPhoneNumber}) {
	return (
		<form onSubmit={handleSubmit}>
			<FormField text="name: " handleChange={handleNameChange} value={newName} />
			<FormField text="number: " handleChange={handlePhoneNumberChange} value={newPhoneNumber}/>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}
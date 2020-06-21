import React from 'react'

export default function FormField ({text, handleChange, value}) {
	return (
		<div>
			{text}<input type="text" onChange={handleChange} value={value}/>
		</div>
	)
}
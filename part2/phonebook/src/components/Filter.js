import React from 'react'

export default function Filter ({handleChange, searchKeyword}) {
	return (
		<div>
			filter shown with<input type="text" onChange={handleChange} value={searchKeyword}/>
		</div>
	)
}

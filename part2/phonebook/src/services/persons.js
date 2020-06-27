import Axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

function fetchAll () {
	return Axios.get(baseUrl)
		.then(response => response.data)
}

function create (newPerson) {
	return Axios.post(baseUrl, newPerson)
		.then(response => response.data)
}

function deleteOneById (id) {
	return Axios.delete(`${baseUrl}/${id}`)
}

function updateOnById (id, newPerson) {
	return Axios.put(`${baseUrl}/${id}`, newPerson)
		.then(response => response.data)
}

export default {
	fetchAll,
	create,
	deleteOneById,
	updateOnById
}
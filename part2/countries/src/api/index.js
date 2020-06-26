import Axios from 'axios'

export function fetchCountriesDataBySearchKeyword (searchKeyword) {
	return Axios.get(`https://restcountries.eu/rest/v2/name/${searchKeyword}`)
		.then(response => response.data)
}

export function fetchWeatherDataByCountryName (countryName) {
	const apiKey = process.env.REACT_APP_API_KEY
	const queryParams = `?access_key=${apiKey}&query=${countryName}`
	return Axios.get(`http://api.weatherstack.com/current${queryParams}`)
		.then(response => {
			return response.data
		})
}
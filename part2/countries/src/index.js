import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import * as Api from './api'

import './index.css'

function App () {
	const [searchKeyword, setSearchKeyword] = useState('')
	const [countriesData, setCountriesData] = useState([])
	const [weatherData, setWeatherData] = useState(null)
	const [viewCountryIndex, setViewCountryIndex] = useState(null)

	const handleFormSubmit = async event => {
		event.preventDefault()
		setViewCountryIndex(null)
		setSearchKeyword('')

		const countriesData = await Api.fetchCountriesDataBySearchKeyword(searchKeyword)
		setCountriesData(countriesData)
		if (countriesData.length === 1) {
			const countryName = countriesData[0].name
			const weatherData = await Api.fetchWeatherDataByCountryName(countryName)
			setWeatherData(weatherData.current)
		}
	}

	const handleSearchKeywordChange = event => {
		setSearchKeyword(event.target.value)
	}

	const handleViewCountryClick = async event => {
		const countryViewKey = Number(event.target.dataset.countryViewKey)
		setViewCountryIndex(countryViewKey)

		const countryName = countriesData[countryViewKey].name
		const weatherData = await Api.fetchWeatherDataByCountryName(countryName)
		setWeatherData(weatherData.current)
	}

	const renderCountryData = countryData => {
		console.log('render country data')
		return (
			<div>
				<section>
					<h2>{countryData.name}</h2>
					<div>{`capital ${countryData.capital}`}</div>
					<div>{`population ${countryData.population}`}</div>
				</section>
				<section>
					<h3>languages</h3>
					<ul>
						{countryData.languages.map(language => (
							<li key={language.name}>{language.name}</li>
						))}
					</ul>
					<div>
						<img src={countryData.flag} alt={`${countryData.name} flag`}/>
					</div>
				</section>
				{weatherData && (
					<section>
						<h3>{`Weather in ${countryData.capital}`}</h3>
						<div>
							<b>temperature: </b>
							<span>{`${weatherData.temperature} Celcius`}</span>
						</div>
						<div>
							<img src={weatherData.weather_icons} alt="weather icon"/>
						</div>
						<div>
							<b>wind: </b>
							<span>{`${weatherData.wind_speed} mph direction ${weatherData.wind_dir}`}</span>
						</div>
					</section>
				)}
			</div>
		)
	}

	const renderCountryList = countriesData => {
		console.log('render country list')
		if (countriesData.length >= 10) {
			return (
				<div>Too many matches, specify another filter</div>
			)
		}

		if (countriesData.length === 1) {
			return renderCountryData(countriesData[0])
		}

		return countriesData.map((countryData, index) => (
			<div key={countryData.name}>
				<span>{countryData.name}</span>
				<button data-country-view-key={index} onClick={handleViewCountryClick}>show</button>
			</div>
		))
	}

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				find countries <input type="text" value={searchKeyword} onChange={handleSearchKeywordChange}/>
			</form>
			<div>
				{renderCountryList(countriesData)}
			</div>
			<div>
				{(viewCountryIndex != null) && renderCountryData(countriesData[viewCountryIndex])}
			</div>
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
)

import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Statistic ({text, value} = {}) {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

function Statistics ({stats} = {}) {
	const {good, neutral, bad} = stats
	const totalFeedbackQuantity = good + neutral + bad

	function getAverage () {
		const goodFeedbackValue = 1
		const neutralFeedbackValue = 0
		const badFeedbackValue = -1
		const totalFeedbackValue = good * goodFeedbackValue + neutral * neutralFeedbackValue + bad * badFeedbackValue

		return totalFeedbackValue / totalFeedbackQuantity
	}

	function getPositivePercentage () {
		return good / totalFeedbackQuantity * 100
	}

	if (totalFeedbackQuantity === 0) {
		return (
			<section>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</section>
		)
	}

	return (
		<section>
			<h1>statistics</h1>
			<table>
				<tbody>
				<Statistic text="good" value={good}/>
				<Statistic text="neutral" value={neutral}/>
				<Statistic text="bad" value={bad}/>
				<Statistic text="average" value={getAverage()}/>
				<Statistic text="positive" value={`${getPositivePercentage()}%`}/>
				</tbody>
			</table>
		</section>
	)
}

function Button ({text, handleClick} = {}) {
	return <button onClick={handleClick}>{text}</button>
}

function App () {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	function addFeedbackToCategory (category, setToCategory) {
		return () => {
			setToCategory(category + 1)
		}
	}

	return (
		<div>
			<section>
				<h1>give feedback</h1>
				<Button text="good" handleClick={addFeedbackToCategory(good, setGood)} />
				<Button text="neutral" handleClick={addFeedbackToCategory(neutral, setNeutral)} />
				<Button text="bad" handleClick={addFeedbackToCategory(bad, setBad)} />
			</section>
			<Statistics stats={{good, neutral, bad}}/>
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
)

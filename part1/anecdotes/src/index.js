import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function App ({anecdotes} = {}) {
	const [selected, setSelected] = useState(0)
	const [anecdote, setAnecdote] = useState(anecdotes[0])
	const [anecdoteVotes, setAnecdoteVotes] = useState(Array(anecdotes.length).fill(0))

	function upVoteAnecdote () {
		const votes = anecdoteVotes.slice()
		votes[selected]++
		setAnecdoteVotes(votes)
	}

	function handleUpVoteAnecdoteClick () {
		upVoteAnecdote()
	}

	function handleNextAnecdoteClick () {
		const randomNumber = getRandomArbitrary(0, anecdotes.length - 1)
		setSelected(randomNumber)
		setAnecdote(anecdotes[randomNumber])
	}

	function findIndexAnecdoteHighestVote () {
		const highestVote = Math.max(...anecdoteVotes)
		return anecdoteVotes.indexOf(highestVote)
	}

	const indexAnecdoteHighestVote = findIndexAnecdoteHighestVote()

	return (
		<div>
			<section>
				<h1>Anecdote of the day</h1>
				<p>{anecdote}</p>
				<p>has {anecdoteVotes[selected]} votes</p>
				<div>
					<button onClick={handleUpVoteAnecdoteClick}>vote</button>
					<button onClick={handleNextAnecdoteClick}>next anecdote</button>
				</div>
			</section>
			<section>
				<h1>Anecdote with most votes</h1>
				<p>{anecdotes[indexAnecdoteHighestVote]}</p>
				<p>has {anecdoteVotes[indexAnecdoteHighestVote]} votes</p>
			</section>
		</div>
	)
}

function getRandomArbitrary (min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<React.StrictMode>
		<App anecdotes={anecdotes}/>
	</React.StrictMode>,
	document.getElementById('root')
)

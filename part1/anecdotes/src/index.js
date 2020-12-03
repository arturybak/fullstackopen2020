import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const anecdotesNum = anecdotes.length

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {

  const pickAtRandom = () => Math.floor(Math.random() * anecdotesNum)

  const [selected, setSelected] = useState(pickAtRandom)
  const [scores, updateScores] = useState(new Array(anecdotesNum).fill(0))

  const handleNextAnecdote = () => setSelected(pickAtRandom)
  
  const handleVote = () => {
    const copy = [...scores]
    copy[selected] += 1
    updateScores(copy)
  }

  const maxIndex = scores.indexOf(Math.max(...scores))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {scores[selected]} votes</p>
      <Button onClick={handleVote} text='Vote' />
      <Button onClick={handleNextAnecdote} text='Next Anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxIndex]}</p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
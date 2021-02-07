import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

  const handleVote = async (anecdote) => {
    props.voteFor(anecdote)
    props.setNotification(`Voted for ${anecdote.content}`, 5)
  }
  return(
    <div>
    {props.anecdotes
    .sort((a ,b) => b.votes > a.votes ? 1 : -1)
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>

  )
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }
}

const mapDispatchToProps = {
  voteFor,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes

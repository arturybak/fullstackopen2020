
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, FAV_GENRE, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()



  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const favGenre = useQuery(FAV_GENRE)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('library-user-token')
    if (loggedUser) {
      setToken(loggedUser)
    }
  }, [])

  const buttons = () => {
    if (token) {
      return (
        <span>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={logout}>logout</button>
        </span>
      )
    } else {
      return (
        <button onClick={() => setPage('login')}>login</button>
      )
    }
  }
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const added = subscriptionData.data.bookAdded
      window.alert(`New book added! ${added.title} by ${added.author.name}`)
    }
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {buttons()}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors} setError={notify}
      />

      <Books
        show={page === 'books'} books={books.data.allBooks}
      />

      {token && <Recommended
        show={page === 'recommended'} books={books.data.allBooks} genre={favGenre.data.me.favoriteGenre} setError={notify}
      />}


      <NewBook
        show={page === 'add'} setError={notify} updateCacheWith={updateCacheWith}
      />

      {!token && <LoginForm
        show={page === 'login'} setToken={setToken} setError={notify}
      />}


    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}


export default App
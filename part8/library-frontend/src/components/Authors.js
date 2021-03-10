  
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'



const Authors = ({ show, authors, setError }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ changeBornDate, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const options = []

  Object.entries(authors).forEach(([key, value]) => {
    options.push({value: value.name, label: value.name})
  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('person not found')
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }
  
  const submit = (event) => {
    event.preventDefault()

    changeBornDate({ variables: { name, setBornTo: born } })

    setBorn('')
  }

  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birth year</h2>

      <form onSubmit={submit}>
        <div>
          <Select 
            value={{label : name }}
            onChange={(event) => setName(event.value)}
            options={options}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors

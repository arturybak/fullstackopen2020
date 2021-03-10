import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [bookList, setBookList] = useState(books)

  if (!show) {
    return null
  }

  const addGenre = (genre) => {
    if (genres.includes(genre)) {
      return null
    } else {
      setGenres(genres.concat(genre))
    }
  }

  const handleGenreChange = (genre) => {
    if (genre == null) {
      setGenre(null)
      setBookList(books)
    } else {
      setGenre(genre)
      setBookList(books.filter(b => b.genres.includes(genre)))
    }
  }


  return (
    <div>
      <h2>books</h2>
      {genre ? <p>in genre <strong>{genre}</strong></p> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookList.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              {b.genres.map(g => addGenre(g))}
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => <button key={g} onClick={() => handleGenreChange(g)}>{g}</button>)}
      <button onClick={() => handleGenreChange(null)}>all genres</button>
    </div>
  )
}

export default Books

import React from 'react'

const Recommended = ({ setError, books, genre, show }) => {
    if (!show) {
        return null
      } 
  return (
    <div>
      <h2>recommendations</h2>
      {genre ? <p>books in your favorite genre <strong>{genre}</strong></p> : null}
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
          {books.filter(b => b.genres.includes(genre)).map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended

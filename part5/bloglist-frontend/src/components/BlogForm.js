import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id="submitBlog" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
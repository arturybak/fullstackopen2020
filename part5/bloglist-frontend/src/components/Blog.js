import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5
  }

  const toggleDetailed = () => {
    setDetailed(!detailed)
  }

  const hideWhenVisible = { display: detailed ? 'none' : '' }
  const showWhenVisible = { display: detailed ? '' : 'none' }

  return (
    <div class="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button class="viewButton" onClick={toggleDetailed}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} by {blog.author}
        <button onClick={toggleDetailed}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} likes <button onClick={handleLike}>like</button> <br />
        {blog.user.name} <br />
        {user !== undefined ? (blog.user.name === user.name ? <button onClick={handleRemove}>remove</button> : null) : null}
      </div>
    </div>
  )
}

export default Blog

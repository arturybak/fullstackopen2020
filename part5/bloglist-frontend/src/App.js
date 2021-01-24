import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  const fetchBlogs = async () => {
    const res = await blogService.getAll()
    setBlogs(res.sort((a,b) => b.likes - a.likes))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      notifyWith(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch(error) {
      console.log(error.response.data.error)
      notifyWith(`${error.response.data.error} `, 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      blog.likes += 1
      await blogService.update(blog.id, blog)
      //setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
      fetchBlogs()
      notifyWith(`Blog ${blog.title} now has ${blog.likes} likes`)
    } catch(error) {
      setNotification(
        `Blog '${blog.title}' was already removed from server`, 'error'
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        //setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
        fetchBlogs()
        notifyWith(`Blog ${blog.title} has been removed`)
      } catch(error) {
        setNotification(
          `Blog '${blog.title}' was already removed from server`, 'error'
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')

    console.log('logged out')
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification notification={notification} />
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => handleRemove(blog)} user={user}/>
          )}
        </div>
      }

    </div>
  )
}

export default App
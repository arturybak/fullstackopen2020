import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import UserList from './components/UserList'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NavBarR from './components/Navbar'
import NotificationR from './components/Notification'
import Togglable from './components/Togglable'
import {
  Switch, Route
} from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Container, Columns, Hero, Heading, Section, Box } from 'react-bulma-components'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, logout } from './reducers/userReducer'





const App = () => {
  const dispatch = useDispatch()
  let user = useSelector(({ user }) => {
    return user.user
  })
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(logout())

    dispatch(setNotification('Logged out successfully'))
    console.log('logged out')
  }

  const blogFormRef = useRef()

  return (
    <div>
      <div>
        <NavBarR user={user} handleLogout={handleLogout} />

        <Hero color="primary" className="is-bold">
          <Hero.Body>
            <Container>
              <Heading>
                blogs, blogs blogs on the menu
                    </Heading>
            </Container>
          </Hero.Body>
        </Hero>

        <NotificationR />

        <Container>
          <Columns>
            <Columns.Column size={8} offset={2} className='has-text-centered'>
              <Section>
                <Box>
                  <Switch>
                    <Route path="/users/:id">
                      <User />
                    </Route>

                    <Route path="/blogs/:id">
                      <Blog detailed user={user}/>
                    </Route>

                    <Route path="/users">

                      <UserList />

                    </Route>
                    <Route path="/">
                      {user == null ?
                        <LoginForm /> :
                        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                          <BlogForm />
                        </Togglable>
                      }
                    </Route>

                  </Switch>
                </Box>
              </Section>
              <Switch>
                <Route exact path="/">
                  {user == null ?
                    null :
                    <div>
                      {blogs && blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} user={user} />
                      )}
                    </div>
                  }

                </Route>
              </Switch>
            </Columns.Column>
          </Columns>
        </Container>
      </div>

    </div>
  )
}

export default App
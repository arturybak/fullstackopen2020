import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { like, remove } from '../reducers/blogReducer'
import Comments from './Comments'
import { setNotification } from '../reducers/notificationReducer'
import { Link, useHistory } from "react-router-dom"
import { Box, Icon, Level, Button } from 'react-bulma-components'

const Blog = ({ blog = null, user, detailed = false }) => {

  const dispatch = useDispatch()
  const history = useHistory()


  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  try {
    const match = useRouteMatch('/blogs/:id')
    if (blog == null) {
      blog = blogs.find(u => u.id === match.params.id)
    }

    const handleLike = async () => {
      try {
        dispatch(like(blog))
        dispatch(setNotification(`You liked ${blog.title}`))
      } catch (error) {
        dispatch(setNotification(`Like unsuccessful`, 'danger'))
        console.log(error)
      }
    }

    const handleRemove = async () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        try {
          dispatch(remove(blog.id))
          history.push('/')
          dispatch(setNotification(`Blog ${blog.title} has been removed`))
        } catch (error) {
          dispatch(setNotification(`Blog '${blog.title}' was already removed from server`, 'danger'))
        }
      }

    }

    if (!blog) {
      return <h2 className="has-text-danger title is-3">blog not found</h2>
    }

    let comments = []
    if (blog.comments) {
      comments = blog.comments
    }

    return (
      <div>
        {detailed ?
          <div>
            <Level>
              <Level.Side align="left">
                <Level.Item >
                  <strong>{blog.title} by {blog.author}</strong>
                </Level.Item>
              </Level.Side>
              <Level.Side align="right">
                <Level.Item>
                  {user !== undefined ? (blog.user.name === user.name ? <Button color='danger' className='is-light' onClick={handleRemove}>remove</Button> : null) : null}
                </Level.Item>
              </Level.Side>
            </Level>
            <Level>
              <Level.Item >
                <Icon className="fas fa-link" />
                <i>{blog.url}</i>
              </Level.Item>
              <Level.Item>
                <Icon className="fas fa-user" />{blog.user.name}
              </Level.Item>
              <Level.Item>
                <Button rounded color='danger' onClick={handleLike}>
                  <strong>{blog.likes} </strong>
                  <Icon className="fas fa-heart" />
                </Button>
              </Level.Item>
            </Level>
            <Comments id={blog.id} comments={comments} />
          </div>

          :
          <Box >
            <Level>
              <Level.Side align="left">
                <Level.Item>
                  {blog.title} by {blog.author}
                </Level.Item>
              </Level.Side>
              <Level.Side align="right">
                <Level.Item>
                  <Link to={`/blogs/${blog.id}`}><Button color='success' className='is-light' >view</Button></Link>
                </Level.Item>
              </Level.Side>
            </Level>
          </Box>
        }
        <br />
      </div>

    )

  } catch (error) {
    console.log(error)
    return null
  }

}

export default Blog

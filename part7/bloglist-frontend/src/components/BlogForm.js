import React from 'react'
import { useTemplate } from '../stateHelper'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Button, Form, Icon } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form


const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useTemplate('title')
  const author = useTemplate('author')
  const url = useTemplate('url')


  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.field.value,
      author: author.field.value,
      url: url.field.value,
      likes: 0,
    }

    title.setEmpty()
    author.setEmpty()
    url.setEmpty()
    dispatch(createBlog(newBlog))

    dispatch(setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5))
  }

  return (
    <div>
      <h2 className="title is-5">what's your blog?</h2>
      <br />
      <form onSubmit={addBlog}>
        <Field>
          <Label>title</Label>
          <Control iconLeft>
            <Input {...title.field} />
            <Icon align="left" className="fas fa-quote-right" />
          </Control>
        </Field>
        <Field>
          <Label>author</Label>
          <Control iconLeft>
            <Input {...author.field} />
            <Icon align="left" className="fas fa-user" />
          </Control>
        </Field>
        <Field>
          <Label>url</Label>
          <Control iconLeft>
            <Input {...url.field} />
            <Icon align="left" className="fas fa-link" />
          </Control>
        </Field>
        <Field className="is-grouped is-grouped-centered">
          <Control>
            <Button id="submitBlog" color='primary' className='is-light' type="submit">create</Button>
          </Control>
        </Field>
      </form>
    </div>
  )
}

export default BlogForm
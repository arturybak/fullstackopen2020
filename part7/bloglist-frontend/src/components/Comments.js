import React from 'react'
import { useTemplate } from '../stateHelper'
import { comment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import '@creativebulma/bulma-divider/dist/bulma-divider.css'
import 'react-bulma-components/dist/react-bulma-components.min.css'

import { Button, Media, Content, Form } from 'react-bulma-components'
const { Input, Field, Control } = Form

const Comments = (props) => {
  const newComment = useTemplate('comment')

  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(comment(props.id, {
        content: newComment.field.value
      }))
      //console.log(newComment)
      newComment.setEmpty()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Media >
        <Media.Item>
          <form onSubmit={addComment}>

            <Field>
              <Control >
                <Input onChange={newComment.field.onChange} value={newComment.field.value} placeholder="Add a comment..." />
              </Control>
            </Field>
            <Field>
              <Control >
                <Button type="submit">Post comment</Button>
              </Control>
            </Field>
          </form>
        </Media.Item>
      </Media>

      <div className="divider">
        {props.comments.length > 0 ?
        <p>Comments</p> : <p>No comments yet</p>}
      </div>

      {props.comments.map(comment =>
        <Media key={comment.id}>
          <Media.Item>
            <Content>
              <p>{comment.content}</p>
            </Content>
          </Media.Item>
        </Media>
      )}
    </div>
  )
}

export default Comments
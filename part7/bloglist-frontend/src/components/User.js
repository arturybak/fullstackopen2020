import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { List } from 'react-bulma-components'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import '@creativebulma/bulma-divider/dist/bulma-divider.css'



const User = () => {

  const users = useSelector(({ users }) => {
    return users
  })

  try {
    const match = useRouteMatch('/users/:id')
    const user = users.find(u => u.id === match.params.id)

    if (!user) {
      return <h2 className="has-text-danger title is-3">blog not found</h2>
    }

    return (
      <div>
        <h2 className="title">{user.name}</h2>
        <div className="divider">
        
        added blogs
      </div>

        <List>
          {user.blogs.map(blog => <List.Item key={blog.id}>{blog.title}</List.Item>)}
        </List>
      </div>
    )

  } catch (error) {
    console.log(error)
    return null
  }

}

export default User
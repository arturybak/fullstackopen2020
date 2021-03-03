import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bulma-components'


const UserList = () => {
    const users = useSelector(({ users }) => {
        return users
    })

    if (users === '') {
        return null
    }
    return (
        <div>
            <h2 className="title is-5">users</h2>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user.id}><th><Link to={`/users/${user.id}`}>{user.name}</Link></th><th>{user.blogs.length}</th></tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList

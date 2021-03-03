import React from 'react'
import { useTemplate } from '../stateHelper'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'


import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Button, Form, Icon } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form


const LoginForm = () => {

    const username = useTemplate('Username')
    const password = useTemplate('Password')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(login({ username: username.field.value , password: password.field.value }))
            username.setEmpty()
            password.setEmpty()

            dispatch(setNotification(`Logged in successfully`))
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 'danger'))
        }
    }

    return (
        <div>
            <h2 className="title is-5">log in to application</h2>
            <br />
            <form onSubmit={handleLogin}>
                <Field>
                    <Label>username</Label>
                    <Control iconLeft>
                        <Input id="username" type="text" value={username.field.value} name={username.field.name} onChange={username.field.onChange} />
                        <Icon align="left" className="fas fa-user" />

                    </Control>
                </Field>
                <Field>
                    <Label>password</Label>
                    <Control iconLeft>
                        <Input id="password" type="password" value={password.field.value} name={password.field.name} onChange={password.field.onChange} />
                        <Icon align="left" className="fas fa-lock" />
                    </Control>
                </Field>
                <Field kind="group">
                    <Control>
                        <Button type="submit">login</Button>
                    </Control>
                </Field>
            </form>
        </div>

    )
}
export default LoginForm


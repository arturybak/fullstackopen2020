import React from 'react'


import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Button, Navbar, Container } from 'react-bulma-components'

const NavBarR = ({ user, handleLogout }) => {
    return (
        <Navbar transparent color='light'>
            <Container>
                <Navbar.Brand>
                    <Navbar.Item className='title' href="/">
                        blogs
                </Navbar.Item>
                </Navbar.Brand>
                {user &&
                    <Navbar.Container position="end">
                        <Navbar.Item>
                            <p>{user.name} logged-in</p>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button color='danger' className='is-light' onClick={handleLogout}>
                                logout
                        </Button>
                        </Navbar.Item>
                    </Navbar.Container>
                }
            </Container>
        </Navbar>
    )
}

export default NavBarR
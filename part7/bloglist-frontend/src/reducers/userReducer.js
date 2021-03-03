import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.data }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            if (user) {
                window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
                blogService.setToken(user.token)
            }
            await dispatch({
                type: 'SET_USER',
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        await dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        await dispatch({
            type: 'LOGOUT'
        })
        console.log('logged out')
    }
}

export default userReducer

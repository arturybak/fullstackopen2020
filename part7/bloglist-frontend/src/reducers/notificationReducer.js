const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.delay)
      return action.data
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, variation = 'success', seconds = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        variation,
        delay: setTimeout(() => {
          dispatch(removeNotification())
        }, seconds * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  }
}

export default notificationReducer

import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      const id = action.data.id
      const blogToLike = state.find(n => n.id === id)

      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    case 'COMMENT_BLOG':
      const {blog, ...commented} = action.data
      const commentedId = blog

      const blogToChange = state.find(b => b.id === commentedId)

      const commentedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, commented]
      }
      return state.map(blog => 
          blog.id !== commentedId ? blog : commentedBlog)
    case 'DELETE_BLOG':
      const deletedId = action.data
      return  state.filter(b => b.id !== deletedId)
    default:
      return state
  }
}
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, likedBlog)
    const id = blog.id
    dispatch({
      type: 'LIKE_BLOG',
      data: { id }
    })
  }
}

export const comment = (id, comment) => {
  return async dispatch => {
    const commented = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: commented
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
      await blogService.remove(id)
      dispatch({
          type: 'DELETE_BLOG',
          data: id
      })
  }
}


export default reducer
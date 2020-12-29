const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (a,b) => a.likes > b.likes ? a : b
  if (blogs.length === 0) {
    return null
  } else {
    const {__v, _id, url, ...formattedBlog} = blogs.reduce(reducer)
    return formattedBlog
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
  
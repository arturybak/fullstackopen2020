const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if ( blogs.length===0) {
    return null
  }

  const withMostVotes = (best, current) => {
    if ( !best ) {
      return current
    }

    return best.likes > current.likes ? best : current
  }

  return blogs.reduce(withMostVotes , null)
}

module.exports = {
  totalLikes,
  favoriteBlog
}
  
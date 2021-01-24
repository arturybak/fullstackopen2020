import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const user ={
      name: 'Kandy'
  }
  const blog = {
    title: 'A very cool blog',
    author: 'Miss Vanjie',
    url: 'www.vanj.com',
    likes: 0,
    user: user.name
  }

  test('at start display only title and author', () => {
    component = render(
        <Blog blog={blog} />
      )
  
    expect(component.container).toHaveTextContent(
        'A very cool blog', 'Miss Vanjie'
      )
    })

  test('after clicking the button, url and likes are displayed', () => {
    component = render(
        <Blog blog={blog} />
      )
  
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'www.vanj.com', 0
      )
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  

})

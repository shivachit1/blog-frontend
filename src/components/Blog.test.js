import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('a test which checks that the component displaying a blog renders the blog title and author but without likes and url', () => {

  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'react',
    url:'not available',
    likes:0,
  }

  const component = render(
    <Blog blog={blog}/>
  )
  const blogTitle = component.container.querySelector('.blogTitle')
  const blogAuthor = component.container.querySelector('.blogAuthor')
  const blogLikes = component.container.querySelector('.blogLikes')
  const blogUrl = component.container.querySelector('.blogUrl')

  // method for testing blog title exists
  expect(blogTitle).toHaveTextContent(`${blog.title}`)

  // method for testing blog author exists
  expect(blogAuthor).toHaveTextContent(`${blog.author}`)
  // method for testing blog likes doesn't exists
  expect(blogLikes).toBeNull()

  // method for testing blog url doesn't exists
  expect(blogUrl).toBeNull()
})

test('show blog url and likes on clicking view button', () => {

  // creating sample blog for test with user field (data needed when blog details is shown)
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'react',
    url:'not available',
    likes:0,
    user:{
      username:'tester1',
      name:'test1',
      token:'no'
    }
  }

  // creating logged user incase delete button has to be shown
  const loggedUser = {
    username:'tester2',
    name:'test2',
    token:'no'
  }

  // rendering Blog component sending blog and loggedUser object
  const component = render(
    <Blog blog={blog} loggedUser={loggedUser}/>
  )

  // getting view button by text
  const viewButton = component.getByText('view')
  // fire onClick event
  fireEvent.click(viewButton)

  // get likes element using css className
  const likesDiv = component.container.querySelector('.blogLikes')
  // testing if likes element is present in the DOM after view button is clicked
  expect(likesDiv).toBeDefined()
  // get url element using css className
  const urlDiv = component.container.querySelector('.blogUrl')
  // testing if url element is present in the DOM after view button is clicked
  expect(urlDiv).toBeDefined()

})

test('if like button us called twice', () => {
  // sample blog for test
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'react',
    url:'not available',
    likes:0,
    user:{
      username:'tester1',
      name:'test1',
      token:'no'
    }
  }

  // creating logged user incase delete button has to be shown
  const loggedUser = {
    username:'tester2',
    name:'test2',
    token:'no'
  }

  // event handler for updating blog with increased likes
  const mockHandler = jest.fn()

  // rendering Blog components
  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} updateBlog={mockHandler}/>
  )

  // find view buttton by text and fire onClick event to show blog details
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  // get like button using css selector
  const likeButton = component.container.querySelector('.likeButton')
  // test if the like button is present on the container
  expect(likeButton).toBeDefined()

  // firing like button twice
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  // testing if the event handler is called twice
  expect(mockHandler.mock.calls).toHaveLength(2)

})


test('when new blog is created using form, testing if right details are passed to create new blog', () => {

  // event handler for submitting blog form
  const createBlog = jest.fn()

  // rendering BlogForm Component
  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  // getting title, author, url , form using CSS selector
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const blogForm = component.container.querySelector('form')

  // handling input changes to title
  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  // handling input changes to author
  fireEvent.change(author, {
    target: { value: 'test1' }
  })
  // handling input changes to url
  fireEvent.change(url, {
    target: { value: 'sample url' }
  })

  // firing event for submitting Blogform
  fireEvent.submit(blogForm)
  // testing if the form is called once
  expect(createBlog.mock.calls).toHaveLength(1)

  // testing if form is submitted with correct input fields
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('test1' )
  expect(createBlog.mock.calls[0][0].url).toBe('sample url' )

})

test('showing delete button to delete blog if the blog is created by logged user', () => {
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'react',
    url:'not available',
    likes:0,
    user:{
      username:'tester1',
      name:'test1',
      token:'no'
    }
  }

  const loggedUser = {
    username:'tester1',
    name:'test1',
    token:'no'
  }

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const div = component.container.querySelector('.blogDetail')
  expect(div).toBeDefined()

  const deleteButton = component.getByText('delete')
  expect(deleteButton).toBeDefined()
})
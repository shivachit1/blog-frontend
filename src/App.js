import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import logInService from './services/login'
import Togglable from './components/Togglable'


const App = () => {

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState('')
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()


  useEffect (() => {

    //getting all blogs from database using service
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(sortBlogs(initialBlogs))
      })

    // retrieving logged user from local storage with key "loggedBlogappUser"
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    // checking if loggedUserJSON is defined
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      //setting token for blogService for authorization
      blogService.setToken(user.token)
    }

  },[])

  const sortBlogs = (blogsToBeSorted) => {
  // sort by value descending order (higher likes first)
    const sortedBlogs = blogsToBeSorted.sort( (a, b) => {
      return b.likes - a.likes
    })
    return sortedBlogs
  }


  const handleLogin = async ({ username, password }) => {


    try {
      // asynchronous POST request for user login
      const loggedUser = await logInService.logInUser({ username, password })

      // storing logged user to local storage with key "loggedBlogappUser" in json format
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      // setting token for blog service
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)

    } catch (exception) {
      // setting error message if user login is unsuccessful
      setErrorMessage('wrong credentials')
      // timeout function runs after 5 secs
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const createBlog = async newBlog => {

    try {
      blogFormRef.current.toggleVisibility()
      // asynchronous POST request for creating new Blog
      const returnedBlog = await blogService.create(newBlog)

      // adding newly created blog to blogs from response data
      setBlogs(sortBlogs(blogs.concat(returnedBlog)))

      // successful message on creating new blog
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

      // timeout function runs after 5 secs
      setTimeout(() => {
        setMessage('')
      }, 3000)

    } catch (error) {

      setErrorMessage('Error creating new blog')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const updateBlog = async (id, updatingBlog) => {
    // updating blog with new blog data (for now Likes only)
    try {
      const updatedBlog = await blogService.update(id,updatingBlog)
      setBlogs(sortBlogs(blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
      ))
      console.log(updatedBlog)
      setMessage(`${updatedBlog.title} likes increased by 1`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      setErrorMessage('Blog cannot be updated')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }

  }

  const deleteBlog = async (id) => {
    // updating blog with new blog data (for now Likes only)
    try {
      await blogService.remove(id)
      setBlogs(sortBlogs(
        blogs.filter((blog) => blog.id !== id)
      ))
      setMessage('blog is deleted')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      setErrorMessage('Blog cannot be deleted')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }

  }


  const logOut= () => {
    // clearing local store user data on log out
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }


  return (
    <div>

      <Notification errorMessage={errorMessage} message={message}/>
      {user === '' ?
        <LoginForm handleLogin={handleLogin}/>
        :
        <div>

          <h2>blogs</h2>
          <p><strong>{user.name}</strong> logged in <button onClick={logOut}>Logout</button></p>

          <Togglable buttonLabel="new Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} loggedUser={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
          ))}

        </div>

      }

    </div>
  )
}

export default App

import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title:'', author:'',url:'' })

  const handleChange = (e) => {
    // any changes to input is assigned to user object
    const { name, value } = e.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const addBlog = async (e) => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title:'', author:'',url:'' })
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={addBlog}>

        <div>
          <label>
        Title:
            <input
              id="title"
              name = "title"
              value={newBlog.title}
              placeholder="Title"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
        Author:
            <input
              id="author"
              name = "author"
              value={newBlog.author}
              placeholder="Author"
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
        Url:
            <input
              id="url"
              name = "url"
              value={newBlog.url}
              placeholder="Url"
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm

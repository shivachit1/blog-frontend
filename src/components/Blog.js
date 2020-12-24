import React, { useState } from 'react'

const Blog = ({ blog,loggedUser, updateBlog, deleteBlog }) => {

  const [showDetails, setshowDetails] = useState (false)
  const [buttonLabel, setButtonLabel] = useState ('view')

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 8
  }

  const showBlogDetails = () => {
    setshowDetails(!showDetails)
    if(buttonLabel==='view'){
      setButtonLabel('hide')
    }else{
      setButtonLabel('view')
    }
  }

  const hitLike = () => {
    const updatingBlog = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes: blog.likes + 1,
      user : blog.user.id
    }
    updateBlog(blog.id, updatingBlog)
  }

  const handleDeleteBlog = () => {
    var result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if(result) {
      deleteBlog(blog.id)
    }else{
      console.log('delete blog cancelled')
    }
  }


  return (
    <div style={blogStyle} id="blog">
      <p className="blogTitle">{blog.title}</p>
      <p className="blogAuthor">{blog.author}</p>
      <button className="viewButton" onClick={showBlogDetails}>{buttonLabel}</button>

      {showDetails ?
        <div className="blogDetail">
          <p className="blogUrl">{blog.url}</p>
          <div >likes <span className="blogLikes">{blog.likes}</span> <button className="likeButton" onClick={hitLike}>like</button></div>
          <p>{blog.user.name}</p>
          {(loggedUser.username === blog.user.username) ?
            <button className="deleteButton" onClick={handleDeleteBlog}>delete</button>
            :
            <div></div>
          }
        </div>
        :
        null
      }
    </div>
  )

}

export default Blog

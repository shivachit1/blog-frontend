import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// setting token for authorization after user login
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// getting all blogs
const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

// creating new blog with sending token for authorization
const create = async newBlog => {
  const config = {
    headers:{ Authorization:token },
  }
  // POST request sending along with authorization header
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

// updating blog by given id with authorization header
const update = (id, newBlog) => {
  const config = {
    headers:{ Authorization:token },
  }
  const request = axios.put(`${baseUrl}/${id}`,newBlog, config)
  return request.then(response => response.data)
}

// updating blog by given id with authorization header
const remove = (id) => {
  const config = {
    headers:{ Authorization:token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }
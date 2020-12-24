import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // handling changes in login form input
  // target is retrieved with input name
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  // handling form submit and calling handleLogin method of App.js with username and password
  const logIn = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div className="loginForm">
      <h2>Log in to application</h2>

      <form onSubmit={logIn}>
        <div>
          <label> Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

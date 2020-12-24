import React from 'react'

const Notification = ({
  errorMessage,
  message
}) => {
  if(message==='' && errorMessage===''){
    return null
  }
  if(errorMessage!==''){
    return <h3 className="error">{errorMessage}</h3>
  }
  if(message!==''){
    return <h3 className="success">{message}</h3>
  }
}

export default Notification

import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h1>404: Page Not Found</h1>
      <p>
        The page you requested could not be found. It may have been removed,
        misspelled, or does not exist.
      </p>
      <Link to="/">Go to Home Page</Link>
    </div>
  )
}

export default Error

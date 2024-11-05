import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div>
      <h1 className='text-4xl'>Home Page</h1>
      <Link to="/login" className='text-2xl '>
        Logout
      </Link>
    </div>
  )
}

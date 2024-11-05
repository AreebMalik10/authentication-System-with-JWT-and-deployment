import React,{useState} from 'react'
import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {

  const[user,  setUser] =useState({
    email:"",
    password:""
})

const handleChange =e =>{
    const {name, value} = e.target
    setUser({
        ...user,
        [name]:value

    })
  }
  return (
    <div className='login'>
      {console.log(user)}
        <h1>Login</h1>
        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter Your Email' />
        <input type="text" placeholder='Enter Your Password' />
        <div className='button'>Login</div>
        <div>or</div>
        <Link to="/register" className='nounderline'>
        <div className='button'>Register</div>
        </Link>
    </div>
  )
}

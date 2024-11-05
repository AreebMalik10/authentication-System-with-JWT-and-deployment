import React,{useState} from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function Register() {

    const[user,  setUser] =useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

    const handleChange =e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value

        })
    }


    const register  =() =>{
        axios.post("http://localhost:9002/register", user)
    }


  return (
  <div className='register'> 
  <h1>Register</h1>
  <input type="text" name='name' value={user.name} placeholder='Your Name' onChange={handleChange} />
  <input type="text" name='name' value={user.email} placeholder='Your Email' onChange={handleChange} />
  <input type="text" name='name' value={user.password} placeholder='Your Password' onChange={handleChange} />
  <input type="text" name='name' value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange} />
  
  <div className='button'>Register</div>
  <div>or </div>
  <Link to="/login">
  <div className='button'>Login</div>
  </Link>
  </div>
  )
}

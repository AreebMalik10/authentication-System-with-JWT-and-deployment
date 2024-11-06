import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && password === reEnterPassword) {
          axios.post("http://localhost:9002/register", user)
            .then(res => {
              // Check if message exists in response data
              if (res.data.message) {
                alert(res.data.message); // Show the backend message
              } else {
                alert("Unexpected error, please try again."); // Fallback error
              }
            })
            .catch(err => {
              console.error("Error in registration:", err); // Log full error
              if (err.response) {
                console.error("Server Response:", err.response.data);
                alert(`Registration failed: ${err.response.data.message || "Unknown error"}`);
              } else {
                alert("Registration failed due to a network error.");
              }
            });
        } else {
          alert("Please fill all fields correctly.");
        }
      }
      
    

    return (
        <div className='register'>
            <h1>Register</h1>
            <input type="text" name='name' value={user.name} placeholder='Your Name' onChange={handleChange} />
            <input type="email" name='email' value={user.email} placeholder='Your Email' onChange={handleChange} />
            <input type="password" name='password' value={user.password} placeholder='Your Password' onChange={handleChange} />
            <input type="password" name='reEnterPassword' value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange} />
            
            <div className='button' onClick={register}>Register</div>
            <div>or </div>
            <Link to="/login">
                <div className='button'>Login</div>
            </Link>
        </div>
    );
}

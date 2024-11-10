import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post('http://localhost:9002/login', user)
      .then((res) => {
        alert(res.data.message);
        if (res.data.message === 'Login Successful') {
          localStorage.setItem('token', res.data.token); // JWT token store ho raha hai
          navigate('/'); // Homepage par redirect karte hain
        }
      })
      .catch((err) => {
        console.error('Error in login:', err.response ? err.response.data : err.message);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <input
        type='text'
        name='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Enter Your Email'
      />
      <input
        type='password'
        name='password'
        value={user.password}
        onChange={handleChange}
        placeholder='Enter Your Password'
      />
      <div className='button' onClick={login}>
        Login
      </div>
      <div>or</div>
      <Link to='/register' className='nounderline'>
        <div className='button'>Register</div>
      </Link>
    </div>
  );
}

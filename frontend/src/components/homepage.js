import { jwtDecode } from 'jwt-decode'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Token ko decode karrahe
        const currentTime = Date.now() / 1000; //  seconds mein

        // Agar token expire ho chuka hai
        if (decoded.exp < currentTime) {
          alert('Session Expired. Please Login}.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          // Agar token abhi valid hai, to user data fetch karengy
          axios
            .get('https://authentication-system-with-jwt-and.onrender.com/getUser', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setUser(res.data.user);
            })
            .catch((err) => {
              console.error('User data lene mein error:', err);
              navigate('/login');
            });

          // Token expiry time par auto logout ke liye timer set karengy
          const remainingTime = (decoded.exp - currentTime) * 1000; // Token expire hone mein kitna waqt reh gaya
          const logoutTimer = setTimeout(() => {
            alert('Session expired. Please Login.');
            localStorage.removeItem('token');
            navigate('/login');
          }, remainingTime); // yeh timeout JWT ki expiry ke mutabiq set ho gaya

          // Cleanup function, jab component unmount ho
          return () => clearTimeout(logoutTimer);
        }
      } catch (error) {
        console.error('Token decode mein error:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <h1 className='text-4xl'>Home Page</h1>
      {user ? <h2 className='text-2xl'>Welcome, {user.name}!</h2> : <h2>Loading...</h2>}
      <button onClick={handleLogout} className='text-2xl'>
        Logout
      </button>
    </div>
  );
}

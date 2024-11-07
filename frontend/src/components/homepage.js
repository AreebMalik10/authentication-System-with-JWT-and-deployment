import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser); // Set user from localStorage
  }, []);

  return (
    <div>
      <h1 className='text-4xl'>Home Page</h1>
      {user ? <h2 className='text-2xl'>Welcome, {user.name}!</h2> : <h2>Loading...</h2>}
      <Link to="/login" className='text-2xl'>
        Logout
      </Link>
    </div>
  );
}

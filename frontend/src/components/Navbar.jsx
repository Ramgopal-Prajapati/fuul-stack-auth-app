import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">E-Store</Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <div className="nav-user">
                <img 
                  src={user.profilePhoto ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${user.profilePhoto}` : '/default-avatar.png'} 
                  alt="Profile" 
                  className="user-avatar"
                />
                <span>Hello, {user.name}</span>
              </div>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
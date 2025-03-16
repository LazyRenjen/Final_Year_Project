import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Navigation';
import logo from '../../assets/images/logo.png';
import defaultProfilePic from '../../assets/images/defaultProfilePic.png';

const Header = ({ onSearch, destinations }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="header">
      <div className="header-top">
        <div className="logo">
          <img src={logo} alt="Nepal Logo" />
        </div>
        <SearchBar onSearch={onSearch} destinations={destinations} />
        <div className="actions">
          {user ? (
            <div className="profile-info">
              {user.isAdmin && <span className="admin-badge">ADMIN</span>}
              <img 
                src={user.profileImage || defaultProfilePic} 
                alt="Profile" 
                className="header-profile-image"
              />
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/signup" className="auth-link">
                <button>Signup</button>
              </Link>
              <Link to="/login" className="auth-link">
                <button>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
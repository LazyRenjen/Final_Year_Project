import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Navigation';
import logo from '../../assets/images/logo.png';
import defaultProfilePic from '../../assets/images/defaultProfilePic.png';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onSearch, destinations }) => {
  const { user, logout } = useAuth();

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
              <button onClick={logout}>Logout</button>
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
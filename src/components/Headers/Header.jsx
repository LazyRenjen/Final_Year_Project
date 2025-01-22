import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import SearchBar from '../SearchBar/SearchBar'
import Navigation from '../Navigation/Navigation'
import logo from '../../assets/images/logo.png' 

    const Header = () => {
      return (
        <div className="header">
          <div className="header-top">
            <div className="logo">
              <img src={logo} alt="Nepal Logo" />
            </div>
            <SearchBar />
            <div className="actions">

              <button>
                <Link to="/signup">Signup</Link>
              </button>
              
              <button>
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
          <Navigation />
        </div>
      );
    };

export default Header


import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Provinces', path: '/provinces' },
    { label: 'Mountain Trails', path: '/mountain-trails' },
    { label: 'Trekking Gears', path: '/trekking-gears' },
    { label: 'Trip by Days', path: '/trip-by-days' },
    { label: 'Community Hub', path: '/community' },
    { label: 'Travel Notices', path: '/notices' },
    { label: 'Sustainability', path: '/sustainability' }
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <Link 
          key={item.label} 
          to={item.path}
          className="nav-link"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
import { Link } from 'react-router-dom';
import React ,{ useEffect, useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Provinces', path: '/provinces' },
    // { label: 'Mountain Trails', path: '/mountain-trails' },
    { label: 'Trip by Days', path: '/trip-by-days' },
    { label: 'Travel-Notices', path: '/Travel' },
    { label: 'Gears', path: '/gears' },

    { 
      label: 'Community Hub', 
      path: '/community',
      requiresAuth: true
    },

    { 
      label: 'Sustainability', 
      path: '/SustainabilityPlan',
      requiresAuth: true
    },

    {
      label: 'Admin Dashboard',
      path: '/admin',
      requiresAdmin: true
    }
  ];
  
  return (
    <nav className="navigation">
      {navItems.map((item) => {
        if (item.requiresAdmin && (!user || !user.isAdmin)) return null;
        if (item.requiresAuth && !user) return null;
        
        return (
          <Link 
            key={item.label} 
            to={item.path}
            className="nav-link">
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
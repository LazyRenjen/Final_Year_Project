// This file contains the AuthContext component and its provider for managing user authentication state in a React application.
// It uses axios for API requests and localStorage for storing user data.
// contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async (retryCount = 0) => {
    try {
      const response = await axios.get('/user');
      const userData = response.data;

      if (userData && userData.id && userData.email) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      throw new Error('Invalid user data structure');
    } catch (error) {
      if (error.response?.status === 401 && retryCount < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return checkAuth(retryCount + 1);
      }

      localStorage.removeItem('user');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.id) {
            await checkAuth();
            return;
          }
        } catch (error) {
          console.error('Invalid user data in storage:', error);
        }
      }
      await checkAuth();
    };

    initializeAuth();

    const handleStorageChange = (event) => {
      if (event.key === 'logout') {
        handleLogout();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });

      if (response.data.success) {
        await checkAuth();
        navigate('/');
        return { success: true };
      }
      return { success: false, message: 'Authentication failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
    } finally {
      localStorage.removeItem('user');
      setUser(null);

      Object.keys(localStorage)
        .filter(key => key.startsWith('trekkingCart_'))
        .forEach(key => localStorage.removeItem(key));

      try {
        window.localStorage.setItem('logout', Date.now().toString());
      } catch (e) {
        console.warn('Failed to sync logout across tabs:', e);
      }

      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

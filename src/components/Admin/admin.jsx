import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import UserStats from './UserStats.jsx';
import { Activity, Users, Clock, AlertCircle } from 'lucide-react';
import './admin.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentUsers: []
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/user-stats');
      setStats(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError('Failed to load statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchStats();
    } else {
      setError('Admin access required');
      setLoading(false);
    }
  }, [user]);

  const handleUserDeleted = (deletedUserId) => {
    // Update local state to reflect the deleted user
    setStats(prevStats => ({
      ...prevStats,
      totalUsers: prevStats.totalUsers - 1,
      recentUsers: prevStats.recentUsers.filter(user => user._id !== deletedUserId)
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !user?.isAdmin) {
    return (
      <div className="error-container">
        <div className="error-message">
          <AlertCircle className="error-icon" size={20} />
          <p>{error || 'Unauthorized access'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage your application</p>
        </div>
        
        <div className="stats-grid">
          {/* Stats summary cards */}
          <div className="stats-card">
            <div className="card-icon blue">
              <Users size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Total Users</p>
              <p className="card-value">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="card-icon green">
              <Activity size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Active Now</p>
              <p className="card-value">{stats.recentUsers.length}</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="card-icon purple">
              <Clock size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Last Updated</p>
              <p className="card-value time">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
        
        <div className="user-stats-container">
          <UserStats 
            stats={stats} 
            onUserDeleted={handleUserDeleted} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from 'react';
import { Users, Search, ChevronDown, UserPlus, Trash2, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './UserStats.css';

const UserStats = ({ stats, onUserDeleted }) => {
  const { totalUsers, recentUsers } = stats;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredUsers = recentUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key === 'createdAt') {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    const iconClass = isActive 
      ? `sort-icon ${sortConfig.direction === 'desc' ? 'rotate' : ''}` 
      : 'sort-icon inactive';
    
    return <ChevronDown size={16} className={iconClass} />;
  };

  const handleDeleteClick = (userId) => {
    setDeletingUserId(userId);
    setConfirmDelete(true);
    setDeleteError(null);
  };

  const cancelDelete = () => {
    setDeletingUserId(null);
    setConfirmDelete(false);
    setDeleteError(null);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axios.delete(`/api/admin/users/${deletingUserId}`);
      
      // Show success message
      setDeleteSuccess(true);
      
      // Update parent component state
      if (typeof onUserDeleted === 'function') {
        onUserDeleted(deletingUserId);
      }
      
      // Reset state
      setDeletingUserId(null);
      setConfirmDelete(false);
      
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setDeleteError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="user-stats-card">
      <div className="card-header">
        <div className="header-title">
          <Users className="title-icon" size={20} />
          <h2>User Statistics</h2>
        </div>
        <div className="user-count">
          {totalUsers} total users
        </div>
      </div>
      
      <div className="card-body">
        {deleteSuccess && (
          <div className="success-message">
            <div className="success-content">
              User successfully deleted
            </div>
          </div>
        )}

        <div className="section-header">
          <h3>Recently Registered Users</h3>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" size={16} />
          </div>
        </div>
        
        {recentUsers.length > 0 ? (
          <>
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th 
                      className="sortable-header"
                      onClick={() => handleSort('username')}
                    >
                      <div className="header-content">
                        <span>Username</span>
                        <SortIcon column="username" />
                      </div>
                    </th>
                    <th 
                      className="sortable-header"
                      onClick={() => handleSort('email')}
                    >
                      <div className="header-content">
                        <span>Email</span>
                        <SortIcon column="email" />
                      </div>
                    </th>
                    <th 
                      className="sortable-header"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="header-content">
                        <span>Registered</span>
                        <SortIcon column="createdAt" />
                      </div>
                    </th>
                    <th className="action-header">
                      <span>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="username">{user.username}</div>
                      </td>
                      <td>
                        <div className="email">{user.email}</div>
                      </td>
                      <td>
                        <div className="date">{formatDate(user.createdAt)}</div>
                      </td>
                      <td>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteClick(user._id)}
                          aria-label="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {searchTerm && filteredUsers.length === 0 && (
              <div className="no-results">
                No users matching "{searchTerm}"
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <UserPlus className="empty-icon" size={40} />
            <p className="empty-title">No recent registrations</p>
            <p className="empty-subtitle">New users will appear here</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="close-button" onClick={cancelDelete}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user? This action cannot be undone.</p>
              {deleteError && (
                <div className="delete-error">
                  <AlertCircle size={16} />
                  <span>{deleteError}</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="confirm-button" onClick={confirmDeleteUser}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;
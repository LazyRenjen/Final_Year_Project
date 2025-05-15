import React, { useState, useEffect } from 'react';
// At the top of TravelNotices.js
import './travelnotices.css';
import Footer from '../../components/Footer/footer';

const TravelNotices = () => {
  // State management
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editNotice, setEditNotice] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdfFile: null
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [fileError, setFileError] = useState('');

  // Fetch notices on component mount
  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(storedUser));
    fetchNotices();
  }, []);

 // Fetch notices
const fetchNotices = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/notices');
    const data = await response.json();
    setNotices(data);
  } catch (error) {
    setErrorMessage('Failed to load notices');
  }
};

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle PDF file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file is PDF
    if (file && file.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed');
      return;
    }
    
    setFileError('');
    setFormData({
      ...formData,
      pdfFile: file
    });
  };

  // Submit notice
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  if (formData.pdfFile) formDataToSend.append('pdfFile', formData.pdfFile);

  try {
    const url = editNotice 
      ? `http://localhost:5000/api/notices/${editNotice._id}`
      : 'http://localhost:5000/api/notices';
      
    const response = await fetch(url, {
      method: editNotice ? 'PUT' : 'POST',
      body: formDataToSend,
      credentials: 'include'
    });
    
    if (!response.ok) throw new Error('Failed to save');
    fetchNotices();
    resetForm();
  } catch (error) {
    setErrorMessage('Failed to save notice');
  }
};

  // Delete notice handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
          method: 'DELETE',
          credentials: 'include' // Required for cookie authentication
        });
        
        if (!response.ok) throw new Error('Failed to delete notice');
        
        // Refresh the notices list
        await fetchNotices();
      } catch (error) {
        setErrorMessage('Failed to delete notice');
      }
    }
  };
  
  // Set up edit mode
  const setupEditMode = (notice) => {
    setEditNotice(notice);
    setFormData({
      title: notice.title,
      description: notice.description,
      pdfFile: null // We don't pre-load the PDF file
    });
    setShowForm(true);
  };

  // Reset form state
  const resetForm = () => {
    setShowForm(false);
    setEditNotice(null);
    setFormData({
      title: '',
      description: '',
      pdfFile: null
    });
    setErrorMessage('');
    setFileError('');
  };

  return (
    <div className="notices-container">
      <h1 className="notices-title">Travel Notices & Documents</h1>
      
      {/* Admin controls */}
      {user?.isAdmin && (
        <button 
          className="add-notice-btn"
          onClick={() => setShowForm(true)}
        >
          Upload New Document
        </button>
      )}

      {/* Notice form modal */}
      {showForm && (
        <div className="notice-form-overlay">
          <div className="notice-form-modal">
            <div className="notice-form-header">
              <h2>{editNotice ? 'Update Document' : 'Upload New Document'}</h2>
              <button 
                className="close-modal-btn"
                onClick={resetForm}
              >
                ×
              </button>
            </div>
            
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="notice-form">
              <div className="form-group">
                <label htmlFor="title">Document Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Document Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pdfFile">Upload PDF Document</label>
                <input
                  type="file"
                  id="pdfFile"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className={fileError ? 'file-input-error' : ''}
                />
                {fileError && <div className="field-error">{fileError}</div>}
                {editNotice && !formData.pdfFile && (
                  <div className="file-note">
                    Leave empty to keep the existing PDF file
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editNotice ? 'Update Document' : 'Upload Document'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notices display */}
      {notices.length === 0 ? (
        <div className="no-notices">No travel documents available</div>
      ) : (
        <div className="notices-list">
          {notices.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              user={user}
              onEdit={setupEditMode}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

/**
 * NoticeCard component to display individual notices
 */
const NoticeCard = ({ notice, user, onEdit, onDelete }) => {
  const formattedDate = new Date(notice.uploadDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="notice-card">
      <div className="notice-content">
        <div className="notice-icon">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        
        <div className="notice-details">
          <h3 className="notice-title">{notice.title}</h3>
          <p className="notice-description">{notice.description}</p>
          <div className="notice-meta">
            <span className="notice-date">Uploaded: {formattedDate}</span>
          </div>
        </div>
        
        <div className="notice-actions">
          <a 
            href={`http://localhost:5000/api/notices/download/${notice._id}`}
            className="download-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          
          {user?.isAdmin && (
            <div className="admin-actions">
              <button
                className="edit-btn"
                onClick={() => onEdit(notice)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(notice._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
    
  );
};

export default TravelNotices;
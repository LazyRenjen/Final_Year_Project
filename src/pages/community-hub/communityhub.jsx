// Nepal Tourism Community Hub Page
// This page allows users to view, create, and interact with posts related to Nepal tourism. It includes features like pagination, sorting, and filtering of posts.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';
import './CommunityHub.css'; // Import the CSS

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    sort: 'newest',
    search: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, filters.sort]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/community?page=${page}&limit=10&sort=${filters.sort}${filters.search ? `&search=${filters.search}` : ''}`
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const response = await axios.post('/api/community', postData);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setShowCreateForm(false);
      // Refresh the first page
      fetchPosts(1);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  const handleLikeToggle = async (postId, shouldLike) => {
    if (!user) {
      if (window.confirm('Please log in to like posts. Go to login page?')) {
        navigate('/login', { state: { returnPath: '/community' } });
      }
      return;
    }
  
    try {
      // Optimistic update
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId ? {
          ...post,
          likes: shouldLike 
            ? [...post.likes, user.id]
            : post.likes.filter(id => id !== user.id),
          likesCount: shouldLike ? post.likesCount + 1 : post.likesCount - 1
        } : post
      ));
  
      // API call
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const endpoint = `/api/community/${postId}/like`;
      const response = shouldLike
        ? await axios.post(endpoint, {}, config)
        : await axios.delete(endpoint, config);
  
      // Sync with actual server state
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      // Revert on error
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId ? {
          ...post,
          likes: shouldLike 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id],
          likesCount: shouldLike ? post.likesCount - 1 : post.likesCount + 1
        } : post
      ));
      alert(error.response?.data?.message || 'Failed to process your like');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`/api/community/${postId}`);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    // For large number of pages, show a limited window
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust the start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    const pages = [];
    
    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      pages.push(
        <button key="1" onClick={() => handlePageChange(1)} className="pagination-button">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }
    
    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    
    // Add last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="pagination-button">
          {totalPages}
        </button>
      );
    }
    
    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-arrow"
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
        
        <div className="pagination-pages">
          {pages}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="community-hub-container">

      {/* // Header Section */}
      <div className="community-header">
        <div className="community-header-content">
          <div className="community-titles">
            <h1 className="community-title">Nepal Tourism Community</h1>
            <p className="community-subtitle">Share your adventures and experiences with fellow travelers</p>
          </div>
          
          {user ? (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="create-post-button"
            >
              {showCreateForm ? (
                <>Cancel</>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  Share Your Journey
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="login-button"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
              </svg>
              Login to Share
            </button>
          )}
        </div>
      </div>

      {showCreateForm && (
        <div className="create-post-container">
          <CreatePostForm onCreate={handleCreatePost} onCancel={() => setShowCreateForm(false)} />
        </div>
      )}


{/* // Loading and Error Handling Section */}
      <div className="community-content">
        {loading && posts.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading community posts...</p>
          </div>
        ) : error && posts.length === 0 ? (
          <div className="error-message">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            <p>{error}</p>
            <button onClick={() => fetchPosts(currentPage)} className="retry-button">
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="no-posts-message">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18" />
            </svg>
            <h3>No posts found</h3>
            <p>Be the first to share your experience with the community</p>
            {user ? (
              <button onClick={() => setShowCreateForm(true)} className="create-first-post-button">
                Create a Post
              </button>
            ) : (
              <button onClick={() => navigate('/login')} className="login-prompt-button">
                Login to Share
              </button>
            )}
          </div>
        ) : (
          <div className="posts-container">
            <PostList 
              posts={posts} 
              currentUser={user} 
              onLikeToggle={handleLikeToggle} 
              onDelete={handleDeletePost}
              onViewDetails={(postId) => navigate(`/community/${postId}`)}
            />
          </div>
        )}

        {totalPages > 1 && posts.length > 0 && (
          <div className="pagination-container">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;
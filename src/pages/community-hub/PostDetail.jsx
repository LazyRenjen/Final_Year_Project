import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mongoose from 'mongoose';
import { useAuth } from '../../contexts/AuthContext.jsx';
import axios from 'axios';
import CommentSection from './components/CommentSection.jsx';
import EditPostForm from './components/EditPostForm.jsx';
import LikeButton from './components/LikeButton.jsx'; // Import the new component
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle like update
  const handleLikeUpdate = (updatedPost) => {
    setPost(updatedPost);
  };

  // Add edit handler
  const handleCommentEdit = async (commentId, newContent) => {
    try {
      const response = await axios.put(
        `/api/community/${post._id}/comments/${commentId}`,
        { content: newContent }
      );
      setPost(prev => ({
        ...prev,
        comments: prev.comments.map(c => 
          c._id === commentId ? response.data : c
        )
      }));
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Failed to update comment. Please try again.');
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/community/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error refreshing post:', err);
      }
    };

    if (!showEditForm) {
      fetchPost();
    }
  }, [showEditForm, postId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
          navigate('/community');
          return;
        }

        const response = await axios.get(`/api/community/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        navigate('/community');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleCommentSubmit = async (content) => {
    try {
      const response = await axios.post(
        `/api/community/${post._id}/comments`,
        { content }
      );
      setPost(prev => ({
        ...prev,
        comments: [response.data, ...prev.comments]
      }));
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment. Please try again.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/api/community/${post._id}/comments/${commentId}`);
      setPost(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c._id !== commentId)
      }));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const handlePostUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`/api/community/${post._id}`, updatedData);
      setPost(response.data);
      setShowEditForm(false);
    } catch (err) {
      console.error('Error updating post:', err);
      if (err.response?.status === 403) {
        alert('You do not have permission to edit this post');
      } else {
        alert('Failed to update post. Please try again.');
      }
    }
  };

  const handlePostDelete = async () => {
    try {
      await axios.delete(`/api/community/${post._id}`);
      navigate('/community');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) return <div className="post-detail__loading">Loading post...</div>;
  if (!post) return <div className="post-detail__not-found">Post not found</div>;

  // Check if the current user is the post owner or an admin
  const isOwner = user && (user.id === post.user._id || user.isAdmin);
  
  return (
    <div className="post-detail__container">
      <button
        onClick={() => navigate(-1)}
        className="post-detail__back-button"
      >
        ← Back to Community Hub
      </button>

      {/* Image Carousel Section */}
      <div className="post-detail__image-carousel">
        {post.images.length > 0 ? (
          <>
            <img
              src={post.images[currentImageIndex]}
              alt={`${post.title} - image ${currentImageIndex + 1}`}
              className="post-detail__main-image"
            />
            {post.images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage} 
                  className="post-detail__carousel-button left"
                >
                  ◀
                </button>
                <button 
                  onClick={handleNextImage} 
                  className="post-detail__carousel-button right"
                >
                  ▶
                </button>
                <div className="post-detail__carousel-dots">
                  {post.images.map((_, index) => (
                    <span
                      key={index}
                      className={`post-detail__dot ${
                        index === currentImageIndex ? 'active' : ''
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="post-detail__no-image">No image available</div>
        )}
      </div>

      {showEditForm ? (
        <EditPostForm
          post={post}
          onUpdate={handlePostUpdate}
          onCancel={() => setShowEditForm(false)}
        />
      ) : (
        <div className="post-detail__card">
          <div className="post-detail__header">
            <div className="post-detail__title-block">
              <h1 className="post-detail__title">{post.title}</h1>
              <p className="post-detail__author">by {post.user.username}</p>
            </div>
            {isOwner && (
              <div className="post-detail__actions">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="post-detail__edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={handlePostDelete}
                  className="post-detail__delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="post-detail__description">{post.description}</p>

        </div>
      )}

      <CommentSection
        comments={post.comments}
        currentUser={user}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
        onCommentEdit={handleCommentEdit}
      />
    </div>
  );
};

export default PostDetail;
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './PostCard.css';
import LikeButton from './LikeButton.jsx';

const PostCard = ({ post, currentUser, onLikeToggle, onDelete, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [postData, setPostData] = useState(post);

  // Handle case where post or post.likes might be undefined
  const isLiked = currentUser && postData?.likes && 
    postData.likes.some(likeId => likeId.toString() === currentUser.id.toString());

  // Reset image index when post changes
  useEffect(() => {
    setPostData(post);
    setCurrentImageIndex(0);
  }, [post]);

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (!postData?.images || postData.images.length <= 1) return;
    
    setCurrentImageIndex((prev) =>
      prev === postData.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (!postData?.images || postData.images.length <= 1) return;
    
    setCurrentImageIndex((prev) =>
      prev === 0 ? postData.images.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Fix the null check here - this is where the error was happening
  const isOwner = currentUser && postData?.user?._id === currentUser._id;
  const isAdmin = currentUser?.isAdmin;

  // Handle post update after like toggle
  const handleLikeUpdate = (updatedPost) => {
    setPostData(updatedPost);
    if (onLikeToggle) {
      onLikeToggle(updatedPost._id, updatedPost);
    }
  };

  // Guard clause in case postData is undefined or null
  if (!postData) {
    return <div className="post-card loading">Loading post...</div>;
  }

  return (
    <div className="post-card">
      <div className="image-carousel">
        {postData.images && postData.images.length > 0 ? (
          <>
            <img
              src={postData.images[currentImageIndex]}
              alt={`${postData.title} - image ${currentImageIndex + 1}`}
              className="carousel-image"
            />
            {postData.images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="carousel-button left">
                  ◀
                </button>
                <button onClick={handleNextImage} className="carousel-button right">
                  ▶
                </button>
                <div className="carousel-dots">
                  {postData.images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div>

      <div className="post-content">
        <div className="post-header">
          <h3 className="post-title">{postData.title}</h3>
          <div className="post-stars">{renderStars(postData.rating)}</div>
        </div>

        <p className="post-location">Location: {postData.location}</p>
        <p className="post-description">{postData.description}</p>

        <div className="post-info">
          <div>
            <span>By {postData.user?.username || 'Unknown user'}</span>
            <span className="separator">•</span>
            <span>{formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="comment-count">
            <span>{postData.comments?.length || 0} comments</span>
          </div>
        </div>

        <div className="post-actions">
          <LikeButton
            postId={postData._id}
            initialLikes={postData.likes || []}
            initialIsLiked={isLiked}
            currentUser={currentUser}
            onLikeUpdate={handleLikeUpdate}
            isLiked={isLiked}
            likeCount={(postData.likes || []).length}
            onToggle={() => onLikeToggle && onLikeToggle(postData._id, !isLiked)}
          />

          <button onClick={() => onViewDetails && onViewDetails(postData._id)} className="view-button">
            View Details
          </button>

          {(isOwner || isAdmin) && (
            <button onClick={() => onDelete && onDelete(postData._id)} className="delete-button">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
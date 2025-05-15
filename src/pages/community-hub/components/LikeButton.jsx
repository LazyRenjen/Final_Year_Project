import React from 'react';
import './LikeButton.css';

const LikeButton = ({ 
  isLiked, 
  likeCount, 
  currentUser, 
  onToggle, 
  isProcessing 
}) => {
  return (
    <button
      onClick={() => onToggle()}
      className={`like-button ${isLiked ? 'liked' : ''} ${isProcessing ? 'processing' : ''}`}
      disabled={!currentUser || isProcessing}
    >
      <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
      <span className="like-count">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
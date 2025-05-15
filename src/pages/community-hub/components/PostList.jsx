// This component displays a list of posts in the community hub.
// It allows users to like, delete, and view details of each post.
import React from 'react';
import PostCard from './PostCard';
import './PostList.css';

const PostList = ({ posts, currentUser, onLikeToggle, onDelete, onViewDetails }) => {
  if (posts.length === 0) {
    return (
      <div className="no-posts-container">
        <p className="no-posts-text">No posts yet. Be the first to share your journey!</p>
      </div>
    );
  }

  return (
    <div className="post-list-feed">
      {posts.map(post => (
        <div key={post._id} className="post-wrapper">
          <PostCard
            post={post}
            currentUser={currentUser}
            onLikeToggle={onLikeToggle}
            onDelete={onDelete}
            onViewDetails={onViewDetails}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;

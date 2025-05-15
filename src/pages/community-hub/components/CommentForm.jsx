//CommentForm.jsx
import React, { useState } from 'react';
import './CommentForm.css'; // Link to your CSS file

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState(''); // Add state for content
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="comment-textarea"
        rows="3"
      />
      <div className="comment-actions">
        <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

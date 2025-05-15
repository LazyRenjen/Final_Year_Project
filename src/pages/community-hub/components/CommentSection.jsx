import React from 'react';
import CommentForm from './CommentForm';
import './CommentSection.css';
import { useState } from 'react';

const CommentSection = ({ comments, currentUser, onCommentSubmit, onCommentDelete, onCommentEdit }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const handleEditSubmit = async (commentId) => {
    if (!editedContent.trim()) return;
    try {
      await onCommentEdit(commentId, editedContent);
      setEditingCommentId(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-heading">
        Comments ({comments.length})
      </h3>

      {/* Ensure currentUser is correctly checked */}
      {currentUser ? (
        <CommentForm onSubmit={onCommentSubmit} />
      ) : (
        <div className="comment-login-prompt">
          Please <a href="/login">login</a> to comment
        </div>
      )}

      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment-card">
            <div className="comment-top">
              <div>
                <p className="comment-user">{comment.user.username}</p>
                {editingCommentId === comment._id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="comment-edit-input"
                  />
                ) : (
                  <p className="comment-content">{comment.content}</p>
                )}
              </div>

              <div className="comment-actions">
                {/* Edit button (only for owner) */}
                {currentUser && currentUser.id === comment.user._id && (
                  <button
                    onClick={() => {
                      if (editingCommentId === comment._id) {
                        setEditingCommentId(null);
                        setEditedContent('');
                      } else {
                        setEditingCommentId(comment._id);
                        setEditedContent(comment.content);
                      }
                    }}
                    className="edit-comment-btn"
                  >
                    {editingCommentId === comment._id ? 'Cancel' : 'Edit'}
                  </button>
                )}
                
                {/* Delete button (owner or admin) */}
                {currentUser && (currentUser.id === comment.user._id || currentUser.isAdmin) && (
                  <button
                    onClick={() => onCommentDelete(comment._id)}
                    className="delete-comment-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            
            {editingCommentId === comment._id && (
              <button
                onClick={() => handleEditSubmit(comment._id)}
                className="save-edit-btn"
              >
                Save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
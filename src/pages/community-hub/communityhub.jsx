import React, { useState } from "react";
import "./communityhub.css";
import profile from "./Among_Us.jpg";
import{ useCommunityHubCRUD }  from "./useCommunityHubCRUD";

function CommunityHub() {
  const loggedInUser = {
    name: "John Doe",
    profilePic: profile,
  };

  const {
    posts,
    createPost,
    updatePost,
    deletePost,
    toggleLove,
    addComment,
    editComment,
    deleteComment
  } = useCommunityHubCRUD();

  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("Trekking & Tours");
  const [editingPostId, setEditingPostId] = useState(null);

  const handlePost = () => {
    if (editingPostId) {
      // Update existing post
      updatePost(editingPostId, {
        status,
        rating,
        // Note: Photo update logic might need more complex handling
      });
      setEditingPostId(null);
    } else {
      // Create new post
      const newPost = createPost(loggedInUser, {
        status,
        photo,
        rating,
        category: activeTab
      });

      if (newPost) {
        setStatus("");
        setPhoto(null);
        setRating(0);
      }
    }
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find(post => post.id === postId);
    setEditingPostId(postId);
    setStatus(postToEdit.status);
    setRating(postToEdit.rating);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setStatus("");
    setRating(0);
  };

  const filteredPosts = posts.filter((post) => post.category === activeTab);

  return (
    <div className="community-hub">
      <header className="header">
        <div className="user-profile">
          <img
            src={loggedInUser.profilePic}
            alt="User profile"
            className="profile-icon"
          />
          <span>{loggedInUser.name}</span>
        </div>
        <h1>Community Hub - Nepal</h1>
        <p>Share your trekking, travel, and adventure experiences!</p>
      </header>

      <nav className="navigation">
      {["Trekking & Tours", "Trekking Gears"].map((tab) => (
          <button
            key={tab}
            className={`nav-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Post Box */}
      <div className="post-box">
        <textarea
          placeholder={`What's on your mind about ${activeTab}?`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <div className="actions">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? "selected" : ""}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <button onClick={handlePost}>
            {editingPostId ? "Update Post" : "Post"}
          </button>
          {editingPostId && (
            <button onClick={cancelEdit} className="cancel-edit">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <img
                  src={post.user.profilePic}
                  alt={`${post.user.name} profile`}
                  className="profile-icon"
                />
                <span className="post-user">{post.user.name}</span>
                <div className="post-actions">
                  <button onClick={() => handleEditPost(post.id)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
              </div>
              {post.photo && (
                <img
                  src={post.photo}
                  alt="User uploaded content"
                  className="post-photo"
                />
              )}
              <p className="post-status">{post.status}</p>
              <div className="post-rating">
                Rating: {[...Array(post.rating)].map((_, i) => "★")}
              </div>
              <div className="post-love-actions">
                <button
                  className={`love-button ${post.loved ? "loved" : ""}`}
                  onClick={() => toggleLove(post.id)}
                >
                  {post.loved ? "❤️ Loved" : "🤍 Love"}
                </button>
              </div>

               {/* Comments Section */}
               <div className="comments-section">
                <h4>Comments</h4>
                <ul className="comments-list">
                  {post.comments.map((comment, index) => (
                    <li key={index}>
                      <div className="comment-header">
                        <img
                          src={comment.user.profilePic}
                          alt={`${comment.user.name} profile`}
                          className="profile-icon"
                        />
                        <span className="comment-user">{comment.user.name}</span>
                      </div>
                      <p>{comment.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts">No posts for {activeTab} yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommunityHub;
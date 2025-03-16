import usePersistentState from './usePersistentState';

export const useCommunityHubCRUD = () => {
  const [posts, setPosts] = usePersistentState("community_hub_posts", []);
  
  // Create Post
  const createPost = (loggedInUser, { status, photo, rating, category }) => {
    if (!status && !photo) {
      alert("Please write a status or upload a photo.");
      return null;
    }

    const newPost = {
      id: Date.now(),
      category,
      status,
      photo: photo ? URL.createObjectURL(photo) : null,
      rating,
      loved: false,
      comments: [],
      user: loggedInUser,
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    return newPost;
  };

  // Update Post
  const updatePost = (id, updates) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      )
    );
  };  

  // Delete Post
  const deletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  // Toggle Love Reaction
  const toggleLove = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, loved: !post.loved } : post
      )
    );
  };
  

  // Add Comment
  const addComment = (id, commentText) => {
    console.log("Comment for post ID:", id);
    if (!commentText) return;
  
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                { text: commentText, user: loggedInUser },
              ],
            }
          : post
      )
    );
  };  

  // Edit Comment (Optional advanced feature)
  const editComment = (postId, commentIndex, newText) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = [...post.comments];
          updatedComments[commentIndex] = {
            ...updatedComments[commentIndex],
            text: newText
          };
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  // Delete Comment
  const deleteComment = (postId, commentIndex) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    toggleLove,
    addComment,
    editComment,
    deleteComment
  };
};

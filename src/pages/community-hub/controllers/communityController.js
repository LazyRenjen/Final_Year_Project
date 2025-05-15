// This file contains the controller functions for handling community-related operations such as posts and comments.
// communityController.js
// This file is part of the Nepal Tourism application, which provides a platform for users to share their travel experiences and recommendations.
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../../signup/User.js';
import mongoose from 'mongoose';

// Get all posts with pagination
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username'
        },
        options: { sort: { createdAt: -1 } }
      })
    
    const totalPosts = await Post.countDocuments();
    
    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Get user's posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username'
        }
      });
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Error fetching user posts', error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    
    const post = await Post.findById(id)
      .populate('user', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username'
        },
        options: { sort: { createdAt: -1 } }
      });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, description, location, images, rating } = req.body;
    
    if (!title || !description || !location || !images || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (images.length > 3) {
      return res.status(400).json({ message: 'Maximum 3 images allowed' });
    }

    const newPost = new Post({
      user: req.user._id,
      title,
      description,
      location,
      images,
      rating
    });
    
    const savedPost = await newPost.save();
    
    const populatedPost = await Post.findById(savedPost._id)
      .populate('user', 'username');
    
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, images, rating } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (images.length > 3) {
      return res.status(400).json({ message: 'Maximum 3 images allowed' });
    }
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, location, images, rating },
      { new: true }
    ).populate('user', 'username')
     .populate({
       path: 'comments',
       populate: {
         path: 'user',
         select: 'username'
       }
     });
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if the user is the owner of the post or an admin
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    // Delete all comments associated with the post
    await Comment.deleteMany({ post: id });
    
    // Delete the post
    await Post.findByIdAndDelete(id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Convert to string for comparison
    const userIdString = req.user._id.toString();
    const hasLiked = post.likes.some(likeId => 
      likeId.toString() === userIdString
    );

    if (hasLiked) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { likes: req.user._id } },
      { new: true }
    ).populate('user', 'username');
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Convert to string for comparison
    const userIdString = req.user._id.toString();
    const hasLiked = post.likes.some(likeId => 
      likeId.toString() === userIdString
    );

    if (!hasLiked) {
      return res.status(400).json({ message: 'Post not liked yet' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).populate('user', 'username');
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Error unliking post', error: error.message });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    
    // Check if the post exists
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Create a new comment
    const newComment = new Comment({
      post: id,
      user: req.user._id,
      content
    });
    
    const savedComment = await newComment.save();
    
    // Add the comment to the post's comments array
    await Post.findByIdAndUpdate(
      id,
      { $push: { comments: savedComment._id } }
    );
    
    // Populate user information
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('user', 'username');
    
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only allow comment owner to edit
    if (!comment.user.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this comment' });
    }

    comment.content = content;
    const updatedComment = await comment.save();
    
    const populatedComment = await Comment.findById(updatedComment._id)
      .populate('user', 'username');

    res.json(populatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if the user is the owner of the comment or an admin
   // Proper ObjectId comparison
   if (!comment.user.equals(req.user._id) && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized to delete this comment' });
  }
    
    // Remove the comment from the post's comments array
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } }
    );
    
    // Delete the comment
    await Comment.findByIdAndDelete(commentId);
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};
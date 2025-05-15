import express from 'express';
import auth from '../../../middleware/authMiddleware.js';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  updateComment,
  getUserPosts
} from '../controllers/communityController.js';

const router = express.Router();

// Post routes
router.get('/', getPosts);
router.get('/user/:userId', auth, getUserPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

// Like routes
router.post('/:id/like', auth, likePost);
router.delete('/:id/like', auth, unlikePost);

// Comment routes
router.post('/:id/comments', auth, addComment);
router.put('/:postId/comments/:commentId', auth, updateComment);
router.delete('/:postId/comments/:commentId', auth, deleteComment);

export default router;
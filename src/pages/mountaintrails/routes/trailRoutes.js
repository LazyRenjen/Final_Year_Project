// pages/mountaintrails/routes/trailRoutes.js
import express from 'express';
import Trail from '../models/Trail.js';
import auth from '../../../middleware/authMiddleware.js';
import adminAuth from '../../../middleware/authMiddleware.js';

const router = express.Router();

// Get all trails
router.get('/', async (req, res) => {
  try {
    const trails = await Trail.find();
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trails' });
  }
});

// Get trail by ID
router.get('/:id', async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trail' });
  }
});

// Create a new trail (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, description, difficulty, duration, price, image } = req.body;
    
    if (!name || !description || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (isNaN(duration) || isNaN(price)) {
      return res.status(400).json({ message: 'Invalid numerical values' });
    }

    const newTrail = new Trail({
      name,
      description,
      difficulty: difficulty || 'medium',
      duration: Number(duration),
      price: Number(price),
      image
    });

    await newTrail.save();
    res.status(201).json(newTrail);
  } catch (error) {
    console.error('Trail creation error:', error);
    res.status(400).json({ 
      message: error.message || 'Error creating trail',
      errors: error.errors 
    });
  }
});

// Update trail (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, description, difficulty, duration, price, image } = req.body;
    
    const updates = {
      name,
      description,
      difficulty,
      duration: Number(duration),
      price: Number(price),
      image
    };
    
    const trail = await Trail.findByIdAndUpdate(
      req.params.id, 
      updates,
      { new: true, runValidators: true }
    );
    
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    
    res.json(trail);
  } catch (error) {
    res.status(400).json({ message: 'Error updating trail' });
  }
});

// Delete trail (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const trail = await Trail.findByIdAndDelete(req.params.id);
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    res.json({ message: 'Trail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trail' });
  }
});

export default router;
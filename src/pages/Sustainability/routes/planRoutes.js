import express from 'express';
import Plan from '../models/Plan.js';
import { auth } from '../../../middleware/authMiddleware.js';

const router = express.Router();

// Get all plans for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user._id });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new plan
router.post('/', auth, async (req, res) => {
  try {
    const plan = new Plan({
      ...req.body,
      user: req.user._id
    });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan' });
  }
});

// Update plan
router.put('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: 'Error updating plan' });
  }
});

// Delete plan
router.delete('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
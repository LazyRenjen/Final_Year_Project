// File: sustainabilityPlanRoutes.js
import express from 'express';
import * as SustainabilityPlanService from '../services/SustainabilityPlanService.js';
import auth from '../../../middleware/authMiddleware.js';

const router = express.Router();

// GET all plans for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const plans = await SustainabilityPlanService.getAllPlans(req.user._id);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// POST create new plan
router.post('/', auth, async (req, res) => {
  try {
    const { destination, activities, planDate } = req.body;
    const newPlan = await SustainabilityPlanService.createPlan(
      req.user._id,
      destination,
      activities,
      new Date(planDate)
    );
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

// PUT update existing plan (with ownership check)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, activities, planDate } = req.body;

    const updatedPlan = await SustainabilityPlanService.updatePlan(
      id,
      req.user._id,
      destination,
      activities,
      new Date(planDate)
    );

    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await SustainabilityPlanService.deletePlan(id, req.user._id);
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

export default router;

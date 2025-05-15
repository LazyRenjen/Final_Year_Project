// This file contains the service functions for managing sustainability plans
import SustainabilityPlan from '../models/SustainabilityPlan.js';

export const getAllPlans = async (userId) => {
  return await SustainabilityPlan.find({ user: userId }).sort({ planDate: -1 });
};

export const createPlan = async (userId, destination, activities, planDate) => {
  const newPlan = new SustainabilityPlan({
    user: userId,
    destination,
    activities,
    planDate
  });
  return await newPlan.save();
};

export const updatePlan = async (id, userId, destination, activities, planDate) => {
  const plan = await SustainabilityPlan.findById(id);
  if (!plan) throw new Error('Plan not found');
  
  if (plan.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  plan.destination = destination;
  plan.activities = activities;
  plan.planDate = planDate;
  
  return await plan.save();
};

export const deletePlan = async (id, userId) => {
  const plan = await SustainabilityPlan.findById(id);
  if (!plan) throw new Error('Plan not found');
  
  if (plan.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }
  
  return await SustainabilityPlan.findByIdAndDelete(id);
};
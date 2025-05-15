//SustainabilityPlan.js
import mongoose from 'mongoose';

const sustainabilityPlanSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  activities: [{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.trim().length > 0;
      },
      message: 'Activity cannot be empty'
    }
  }],
  planDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('SustainabilityPlan', sustainabilityPlanSchema);
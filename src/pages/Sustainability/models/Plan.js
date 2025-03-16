import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Plan', planSchema);
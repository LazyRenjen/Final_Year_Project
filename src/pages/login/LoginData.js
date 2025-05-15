// models/Logindata.js
import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true },
  email: { type: String, required: true },
  loginTime: { type: Date, default: Date.now }
}, { collection: 'Logindata' });

// Ensure the model name matches your collection naming convention
export default mongoose.models.Logindata || mongoose.model('Logindata', loginSchema);
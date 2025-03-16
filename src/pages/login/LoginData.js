import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true },
  email: { type: String, required: true },
  loginTime: { type: Date, default: Date.now }
}, { collection: 'Logindata' });

export default mongoose.models.LoginData || mongoose.model('LoginData', loginSchema);
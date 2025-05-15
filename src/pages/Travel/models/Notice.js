import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  pdf: { type: Buffer, required: true },
  contentType: { type: String, required: true }
});

export default mongoose.model('Notice', noticeSchema);
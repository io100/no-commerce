import mongoose from 'mongoose'

const Photo = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  userId: { type: String, required: true, },
  status: { type: String, default: 'pending' },
  publishedLink: { type: String },
  imageLink: { type: String },
  acceptRejectReason: { type: String },
  tags: { type : Array , "default" : [] },
}, { timestamps: { createdAt: 'createdAt' } });

export default mongoose.model('photo', Photo);

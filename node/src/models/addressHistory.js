import mongoose from 'mongoose'

const AddressHistory = new mongoose.Schema({
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zip_code: { type: String },
  userId: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt' } });

export default mongoose.model('addressHistory', AddressHistory)

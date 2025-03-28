// backend/models/taskModel.js
import mongoose from 'mongoose';  // Use ES Module syntax

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  resourceLink: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  visibility: {
    type: String,
    enum: ['private', 'group', 'public'],
    default: 'private'
  },
  status: {
    type: String,
    enum : ['Draft','Published']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema); // Use default export

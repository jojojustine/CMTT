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
    enum : ['Draft','Published',"Completed"]
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null,
  },  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  
}, { timestamps: true });

export default mongoose.model('Task', taskSchema); // Use default export

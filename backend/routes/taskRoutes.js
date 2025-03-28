import express from 'express';
const router = express.Router();
import { createTask, getUserTasks } from '../controllers/taskController.js'; 
import { protect } from '../middleware/authMiddleware.js';  // Import the protect middleware

// Create a new task (protected route)
router.post('/', protect, createTask);

// Get tasks for the logged-in user (protected route)
router.get('/my-tasks', protect, getUserTasks);

export default router;

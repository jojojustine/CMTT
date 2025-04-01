import express from 'express';
import { createTask, getUserTasks,updateTask,deleteTask, completeTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new task (protected route)
router.post('/', protect, createTask);

// Get tasks for the logged-in user (protected route)
router.get('/my-tasks', protect, getUserTasks);

// Update Task (PUT /api/tasks/:id)
router.put('/:id', protect, updateTask);

//Delete Task
router.delete('/:id', protect, deleteTask);

router.put('/complete/:id', protect, completeTask);
router.get('/', protect, getUserTasks);

export default router;

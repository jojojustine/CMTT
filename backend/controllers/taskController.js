const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { 
    title, 
    description, 
    resourceLink, 
    tags,
    status, 
    visibility 
  } = req.body;

  // Validate required fields
  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  // Create new task
  const task = await Task.create({
    title,
    description: description || '',
    resourceLink: resourceLink || '',
    tags: tags || [],
    visibility: visibility || 'private',
    status,
    owner: req.user._id // Assumes authentication middleware sets req.user
  });

  // Respond with created task
  if (task) {
    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      resourceLink: task.resourceLink,
      tags: task.tags,
      visibility: task.visibility
    });
  } else {
    res.status(400);
    throw new Error('Invalid task data');
  }
});

// @desc    Get user's tasks
// @route   GET /api/tasks
// @access  Private
const getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });

  res.status(200).json(tasks);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Check if task exists
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure user owns the task
  if (task.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  // Update task
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  );

  res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Check if task exists
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure user owns the task
  if (task.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }

  // Remove the task
  await task.deleteOne();

  res.status(200).json({ message: 'Task removed' });
});

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask
};
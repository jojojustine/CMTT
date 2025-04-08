// controllers/taskController.js
import Task from '../models/taskModel.js';
import asyncHandler from 'express-async-handler';

import Group from '../models/groupModel.js';


export const createTask = async (req, res) => {
  const { title, description, resourceLink, tags, visibility, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const task = new Task({
      title,
      description,
      resourceLink: resourceLink || '',
      tags: tags || [],
      visibility: visibility || 'private',  // Default to 'private' if not provided
      status: status || 'Published',  // Default status to 'Draft' if not provided
      owner: req.user._id,  // Set the owner to the authenticated user's ID
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);  // Respond with the created task
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { title, tags, visibility } = req.query;

    console.log(req.query);
    
    
    // Start with an empty filter object
    let filter = {};
    
    // Apply title filter if provided
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    
    // Apply tags filter if provided
    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }
    
    // Handle visibility filtering
if (visibility === 'completed') {
  filter.status = 'Completed';
  filter.owner = req.user._id;
} else if (visibility === 'all') {
  filter.visibility = 'public';
} else if (visibility === 'private') {
  filter.visibility = 'private';
  filter.owner = req.user._id;
} else if (visibility === 'group') {
  // ✅ GROUP LOGIC GOES HERE
  const userGroups = await Group.find({ members: req.user._id }).select('_id');
  filter.visibility = 'group';
  filter.group = { $in: userGroups.map(g => g._id) };

}
else {
  filter = {
    $or: [
      { visibility: 'public' },
      { visibility: 'private', owner: req.user._id }
    ]
  };
}

    
    // Fetch tasks with the filter
    const tasks = await Task.find(filter)
  .populate('completedBy', '_id')
  .populate('group', 'name');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if user is authorized to update the task
  if (task.visibility === 'group') {
    const group = await Group.findById(task.group);
    if (!group || group.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only group owner can update this task' });
    }
  } else {
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }
  }

  const { title, description, status, visibility, tags, group } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.visibility = visibility || task.visibility;
  task.group = group || task.group;
  task.tags = tags || task.tags;
  task.completedBy = []; 
  task.status = 'Published'; // ✅ Reset status so it's not stuck at "Completed"


  const updated = await task.save();
  res.status(200).json(updated);
});


export const deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.group) {
      const group = await Group.findById(task.group);
      if (!group.owner.equals(req.user._id)) {
        return res.status(403).json({ message: 'Only group owner can perform this action' });
      }
    }
    
    // Check if the user is the owner of the task
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    // Delete the task using findByIdAndDelete
    await Task.findByIdAndDelete(req.params.id);  // Using findByIdAndDelete instead of remove()

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.group) {
      const group = await Group.findById(task.group);
      if (!group.owner.equals(req.user._id)) {
        return res.status(403).json({ message: 'Only group owner can perform this action' });
      }
    }
    
    // ✅ Allow group members or owner to mark as complete
    const isOwner = task.owner.toString() === req.user._id.toString();
    const isGroupTask = task.visibility === 'group';
    const isGroupMember = isGroupTask
      ? (await Group.findOne({ _id: task.group, members: req.user._id }))
      : false;

    if (!(isOwner || isGroupMember || task.visibility === 'public')) {
      return res.status(403).json({ message: 'Not authorized to complete this task' });
    }

    // ✅ Prevent double completion
    if (!task.completedBy.includes(req.user._id)) {
      task.completedBy.push(req.user._id);
      task.status = 'Completed'; // optional: could be based on percentage or majority
      await task.save();
    }

    res.json({ message: 'Task marked as complete' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete task', error: error.message });
  }
};
export const markTaskComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.group) {
      const group = await Group.findById(task.group);
      if (!group.owner.equals(req.user._id)) {
        return res.status(403).json({ message: 'Only group owner can perform this action' });
      }
    } else {
      if (!task.owner.equals(req.user._id)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    task.status = 'Completed';
    task.completedBy = req.user._id;
    await task.save();

    // ✅ Return full populated version after update
    const updatedTask = await Task.findById(task._id)
      .populate('owner', 'name email')
      .populate('group', 'name owner')
      .populate('completedBy', 'name email');

    res.json(updatedTask); // 👈 this is what you use in setTasks()
  } catch (error) {
    res.status(500).json({ message: 'Error marking complete', error: error.message });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('group', 'name')
      .populate('completedBy', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};


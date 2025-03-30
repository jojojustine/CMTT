// controllers/taskController.js
import Task from '../models/taskModel.js';

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
    if (visibility === 'all') {
      // Show only public tasks (from any user)
      filter.visibility = 'public';
    } 
    else if (visibility === 'private') {
      // Show only private tasks owned by the current user
      filter.visibility = 'private';
      filter.owner = req.user._id;
    }
    else {
      // Default case: Show both public tasks AND private tasks owned by the user
      filter = {
        $or: [
          { visibility: 'public' },
          { visibility: 'private', owner: req.user._id }
        ]
      };
    }
    
    // Fetch tasks with the filter
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, visibility, tags } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is the owner of the task
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.visibility = visibility || task.visibility;
    task.tags = tags || task.tags;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
}
export const deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
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

    console.log(task);
    

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

   
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    task.status = 'Completed';

    await task.save();

    res.json({ message: 'Task completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark complete task', error: error.message });
  }
};
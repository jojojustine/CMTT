import React, { useState } from 'react';
import { useCreateTaskMutation } from '../slices/apiSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [tags, setTags] = useState('');

  const [createTask] = useCreateTaskMutation();  // Hook from RTK Query to call the API

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      visibility,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      await createTask(taskData);  // Trigger the API call
      // Optionally reset form fields after task creation
      setTitle('');
      setDescription('');
      setVisibility('private');
      setTags('');
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        required
      >
        <option value="private">Private</option>
        <option value="group">Group</option>
        <option value="public">Public</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;

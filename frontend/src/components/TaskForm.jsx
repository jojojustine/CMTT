import React, { useState } from 'react';
import { useCreateTaskMutation } from '../slices/usersApiSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [tags, setTags] = useState('');
  const [resourceLink, setResourceLink] = useState('');

  
  const [createTask] = useCreateTaskMutation();
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVisibility('private');
    setTags('');
    setResourceLink('');
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      visibility,
      tags: tags.split(',').map((tag) => tag.trim()),
      status,resourceLink
    };

    try {
      await createTask(taskData);  // Trigger the API call
      // Reset form fields after task creation
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 'Published')}>
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
  placeholder="Resource Link (optional)"
  value={resourceLink}
  onChange={(e) => setResourceLink(e.target.value)}
/>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="button-group">
        <button type="submit">Create Task</button>
        {/* <button 
          type="button" 
          onClick={(e) => handleSubmit(e, 'Draft')}
        >
          Save as Draft
        </button> */}
      </div>
    </form>
  );
};

export default TaskForm;
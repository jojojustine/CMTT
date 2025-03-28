// frontend/src/components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    resourceLink: '',
    tags: [],
    visibility: 'private'
  });

  const [newTag, setNewTag] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag && !taskData.tags.includes(newTag)) {
      setTaskData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTaskData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve auth token
      const response = await axios.post('/api/tasks/create', taskData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Task created:', response.data);
      // Reset form or show success message
      setTaskData({
        title: '',
        description: '',
        resourceLink: '',
        tags: [],
        visibility: 'private'
      });
    } catch (error) {
      console.error('Task creation failed:', error.response?.data || error.message);
      // Handle error (show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Title*</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Resource Link</label>
        <input
          type="url"
          name="resourceLink"
          value={taskData.resourceLink}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Tags</label>
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow p-2 border rounded mr-2"
            placeholder="Add a tag"
          />
          <button 
            type="button" 
            onClick={handleAddTag} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Tag
          </button>
        </div>
        <div className="mt-2">
          {taskData.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-block bg-gray-200 px-2 py-1 rounded mr-2 mb-2"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Visibility</label>
        <select
          name="visibility"
          value={taskData.visibility}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="private">Private</option>
          <option value="group">Group</option>
          <option value="public">Public</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
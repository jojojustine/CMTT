import React, { useState } from 'react';
import { useCreateTaskMutation } from '../slices/usersApiSlice';
import { FaRegEdit, FaTasks, FaLock, FaLink, FaTags } from 'react-icons/fa';
import "../index.css"; // Make sure this file is imported for the styles

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

  const handleSubmit = async (e, status = 'Published') => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      visibility,
      tags: tags.split(',').map((tag) => tag.trim()),
      resourceLink,
      status,
    };

    try {
      await createTask(taskData);
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <>
      
      <form onSubmit={(e) => handleSubmit(e, 'Published')} className="task-form">
        <div className="form-field">
          <label className="form-label">
            <FaRegEdit className="icon" />
            Task Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            <FaTasks className="icon" />
            Task Description
          </label>
          <textarea
            placeholder="Describe the task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            <FaLock className="icon" />
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
            className="form-control"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">
            <FaLink className="icon" />
            Resource Link (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. https://example.com"
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            <FaTags className="icon" />
            Tags
          </label>
          <input
            type="text"
            placeholder="Comma-separated tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-button">
          <button type="submit" className="submit-button">
            Create Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;

import React, { useState, useEffect } from 'react';
import api from '../utils/api';  // Axios instance for making API requests

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState('all');  // Filtering tasks by visibility
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);  // Start loading
      setError(null);  // Reset any previous errors
      try {
        const response = await api.get('/tasks/my-tasks', {
          params: { visibility: visibilityFilter },  // Optionally filter tasks by visibility
        });
        setTasks(response.data);  // Update state with fetched tasks
      } catch (error) {
        setError('Error fetching tasks');  // Handle error if request fails
        console.error('Error fetching tasks:', error.response?.data || error.message);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchTasks();
  }, [visibilityFilter]);  // Re-fetch tasks when the visibility filter changes

  if (loading) return <p>Loading tasks...</p>;  // Display loading state
  if (error) return <p>{error}</p>;  // Display error message

  return (
    <div>
      <select onChange={(e) => setVisibilityFilter(e.target.value)} value={visibilityFilter}>
        <option value="all">All Tasks</option>
        <option value="private">Private</option>
        <option value="group">Group</option>
        <option value="public">Public</option>
      </select>

      <div>
        {tasks.length === 0 ? (
          <p>No tasks available</p>  // Handle case where no tasks are returned
        ) : (
          tasks.map((task) => (
            <div key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span>{task.visibility}</span>
              <p>{task.tags.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

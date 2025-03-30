import React, { useState } from 'react';
import { useGetTasksQuery } from '../slices/usersApiSlice';

const TaskList = ({ onToggleComplete, onDeleteTask }) => {
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  
  // Use the RTK Query hook to fetch tasks
  const { data: tasks = [], isLoading, isError, error } = useGetTasksQuery(visibilityFilter);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error loading tasks: {error?.data?.message || 'Unknown error'}</div>;
  }

  return (
    <div>
      <h2>Your Tasks</h2>
      
      <div className="filter-controls">
        <label htmlFor="visibility-filter">Filter by: </label>
        <select 
          id="visibility-filter"
          onChange={(e) => setVisibilityFilter(e.target.value)} 
          value={visibilityFilter}
        >
          <option value="All Tasks">All Tasks</option>
          <option value="private">Private</option>
          <option value="group">Group</option>
          <option value="all">Public</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="tasks-container">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className="visibility-badge">{task.visibility}</span>
                {task.tags && task.tags.length > 0 && (
                  <p className="tags">Tags: {task.tags.join(', ')}</p>
                )}
              </div>
              <div className="task-actions">
                <button onClick={() => onToggleComplete(task._id)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => onDeleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
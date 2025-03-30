import React, { useState } from 'react';
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation
} from '../slices/usersApiSlice';
import EditTaskModal from './EditTaskModel';
import { toast } from 'react-toastify';


const TaskList = () => {
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasks = [], isLoading, isError, error } = useGetTasksQuery(visibilityFilter);
  const [updateTask] = useUpdateTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedFields) => {
    try {
      await updateTask({ taskId: selectedTask._id, taskData: updatedFields }).unwrap();
      toast.success('Task updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task');
    }
  };
  

  const handleToggleComplete = async (taskId) => {
    try {
      await completeTask(taskId).unwrap();
    } catch (err) {
      console.error('Failed to toggle complete:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

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
  <option value="completed">Completed</option> {/* ✅ Add this */}
</select>

      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="tasks-container">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              {task.status === 'Completed' && (
  <span className="status-badge" style={{ color: 'green', fontWeight: 'bold' }}>
    ✔ Completed
  </span>
)}
              <p>{task.description}</p>
              {task.resourceLink && (
  <p>
    <strong>Resource:</strong>{' '}
    <a
      href={task.resourceLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#007bff', textDecoration: 'underline' }}
    >
      {task.resourceLink}
    </a>
  </p>
)}

              <div className="task-meta">
                <span className="visibility-badge">{task.visibility}</span>
                {task.tags && task.tags.length > 0 && (
                  <p className="tags">Tags: {task.tags.join(', ')}</p>
                )}
                
<p style={{ fontSize: '0.8rem', color: '#666' }}>
    Created: {new Date(task.createdAt).toLocaleDateString()} <br />
    Last Updated: {new Date(task.updatedAt).toLocaleDateString()}
  </p>
              </div>
              <div className="task-actions">
              {task.status !== 'Completed' && (
  <button onClick={() => handleToggleComplete(task._id)}>
    Mark Complete
  </button>
)}


                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSave}
      />
    </div>
  );
};

export default TaskList;

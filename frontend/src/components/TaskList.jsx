import React, { useState } from 'react';
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation
} from '../slices/usersApiSlice';
import EditTaskModal from './EditTaskModel';
import { toast } from 'react-toastify';
import TaskDetailsModal from './TaskDetailsModal';
import PublishTaskModal from './PublishTaskModal';
import { useSelector } from 'react-redux';
import "../index1.css";

const TaskList = () => {
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTask, setDetailTask] = useState(null);
  const [publishTask, setPublishTask] = useState(null);


  const { data: tasks = [], isLoading, isError, error, refetch } = useGetTasksQuery(visibilityFilter);
  const [updateTask] = useUpdateTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedFields) => {
    try {
      await updateTask({ taskId: selectedTask._id, taskData: updatedFields }).unwrap();
      toast.success('Task updated successfully!');
      setIsModalOpen(false);
      refetch(); // ✅ Refetch the updated list
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task');
    }
  };
  

  const handleToggleComplete = async (taskId) => {
    try {
      await completeTask(taskId).unwrap();
      toast.success('Marked as complete!');
      setIsDetailOpen(false);
      refetch(); // ✅ Refetch to update completedBy
    } catch (err) {
      console.error('Failed to complete task:', err);
      toast.error('Failed to mark task as complete');
    }
  };
  
  

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleTaskClick = (task) => {
    setDetailTask(task);
    setIsDetailOpen(true);
  };
  
  
  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks: {error?.data?.message || 'Unknown error'}</div>;

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
          <option value="completed">Completed</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ol className="task-step-list">
  {tasks.map((task, index) => (
    <li key={task._id} className="task-step-item" onClick={() => handleTaskClick(task)}>
      <div className="step-number">{index + 1}</div>
      <div className="step-content">
        <strong>{task.title}</strong>
        <p>{task.description}</p>
      </div>
    </li>
  ))}
</ol>


      )}

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSave}
      />

<TaskDetailsModal
  isOpen={isDetailOpen}
  task={detailTask}
  onClose={() => setIsDetailOpen(false)}
  onEdit={handleEditClick}
  onComplete={handleToggleComplete}
  onDelete={handleDeleteTask}   // ✅ add this line
/>

    </div>
  );
};

export default TaskList;
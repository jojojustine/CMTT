import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation
} from '../slices/usersApiSlice';
import EditTaskModal from './EditTaskModel';
import TaskDetailsModal from './TaskDetailsModal';
import PublishTaskModal from './PublishTaskModal';
import { toast } from 'react-toastify';

const TaskList = () => {
  const { userInfo } = useSelector((state) => state.auth); // ✅ Access current user
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

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedFields) => {
    try {
      await updateTask({ taskId: selectedTask._id, taskData: updatedFields }).unwrap();
      toast.success('Task updated successfully!');
      setIsModalOpen(false);
      refetch();
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
      refetch();
    } catch (err) {
      console.error('Failed to complete task:', err);
      toast.error('Failed to mark task as complete');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
      toast.success('Task deleted');
      refetch();
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Failed to delete task');
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
        <div className="tasks-container">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="task-card"
              onClick={() => handleTaskClick(task)}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '6px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              {/* ✅ Buttons only for group owner */}
              {task.group && task.group.owner === userInfo._id && (
                <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(task._id);
                    }}
                    className="btn btn-sm btn-success me-2"
                  >
                    Mark Complete
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task._id);
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    Delete Task
                  </button>
                </div>
              )}
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

      <TaskDetailsModal
        isOpen={isDetailOpen}
        task={detailTask}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditClick}
        onComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;

import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useSelector } from 'react-redux';
import {  useCreateTaskMutation,useDeleteTaskMutation } from '../slices/usersApiSlice';
import { useCompleteTaskMutation } from '../slices/usersApiSlice';

const TasksScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const[completeTask]=useCompleteTaskMutation()
  const addTask = async (newTask) => {
    try {
      await createTask(newTask).unwrap();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };
  
  const toggleComplete = async (taskId) => {
    await completeTask(taskId).unwrap();
    console.log('Toggle complete for task:', taskId);
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
     
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };
  
  return (
    <div className="tasks-screen">
      <h1>Welcome, {userInfo?.name || 'User'}</h1>
      <p>Manage your tasks below:</p>
      
      <TaskForm onAddTask={addTask} />
      
      <TaskList 
        onToggleComplete={toggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TasksScreen;
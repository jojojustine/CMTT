import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice with RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',  // This is the key in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), // API base URL
  endpoints: (builder) => ({
    // Define your endpoints here
    
    // Endpoint for fetching tasks
    getTasks: builder.query({
      query: (visibility) => `/tasks/my-tasks?visibility=${visibility}`,  // Query URL
    }),

    // Endpoint for creating a new task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/tasks',
        method: 'POST',
        body: taskData,  // Sending task data in the request body
      }),
    }),

    // Endpoint for deleting a task
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = apiSlice;  // Export hooks for components


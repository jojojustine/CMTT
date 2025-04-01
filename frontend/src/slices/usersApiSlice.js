import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    getTasks: builder.query({
      
      
      query: (visibility) => `api/users/tasks/my-tasks?visibility=${visibility}`, 
      providesTags: ['Task'],
      
      
    }),
   

    createTask: builder.mutation({
      query: (taskData) => ({
        url: `${USERS_URL}/tasks`,
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${USERS_URL}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    completeTask: builder.mutation({
      query: (taskId) => ({
        url: `${USERS_URL}/tasks/complete/${taskId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `${USERS_URL}/tasks/${taskId}`,
        method: 'PUT',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/groups`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Group']
    }),
    getMyGroups: builder.query({
      query: () => `${USERS_URL}/groups`,
      providesTags: ['Group']
    }),
    joinGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/groups/join`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Group']
    }), 
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `${USERS_URL}/groups/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group'],
    }),
    
    removeGroupMember: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `${USERS_URL}/groups/${groupId}/remove`,
        method: 'PUT',
        body: { userId },
      }),
      invalidatesTags: ['Group'],
    }),
       
    getOwnedGroups: builder.query({
      query: () => `${USERS_URL}/groups/owned`,
    }),
    getUserTasks: builder.query({
      query: () => `${USERS_URL}/tasks`,
      providesTags: ['Tasks'],
    }),
    
  
  }),
});

export const {
  useLoginMutation,useLogoutMutation,useRegisterMutation,
  useUpdateUserMutation,useGetTasksQuery,useCreateTaskMutation,useDeleteTaskMutation,
  useCompleteTaskMutation,useUpdateTaskMutation,useJoinGroupMutation,
  useGetMyGroupsQuery,useCreateGroupMutation,useDeleteGroupMutation,
  useRemoveGroupMemberMutation,useGetOwnedGroupsQuery,useGetUserTasksQuery
} = userApiSlice;
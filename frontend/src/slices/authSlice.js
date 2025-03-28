import { createSlice } from '@reduxjs/toolkit';

// Initial state with fallback to localStorage if available
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  token: localStorage.getItem('jwt') || null,  // Storing JWT token if available
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Store user info and JWT token
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
      localStorage.setItem('jwt', action.payload.token);
    },
    logout: (state) => {
      // Reset userInfo and token on logout
      state.userInfo = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('jwt');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

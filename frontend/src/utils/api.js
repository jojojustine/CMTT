import axios from 'axios';

const API_URL = 'http://localhost:5001/api';  // Backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');  // Assuming JWT is stored in localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000', // Ensure backend URL is set correctly
  withCredentials: true // Allow cookies (for authentication)
});

export default api;

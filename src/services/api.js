import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://backend-2-5m08.onrender.com' // Fallback for local testing
});

export default api;

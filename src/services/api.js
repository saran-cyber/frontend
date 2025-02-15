// frontend/src/services/api.js
import axios from 'axios';

// Remove or comment out any absolute baseURL if it exists:
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || ''  // Using empty string means relative URL
});

export default api;

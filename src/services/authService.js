import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const registerBusiness = async (businessData) => {
  const response = await api.post('/api/businesses', businessData);
  return response.data;
};

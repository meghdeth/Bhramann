// src/api.js
import axios from 'axios';

// either pick up your .env override, or fall back to 5000
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL });

// attach the JWT if you have one
api.interceptors.request.use(config => {
  const token = localStorage.getItem('bhramann_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

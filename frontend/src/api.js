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

// Update user profile
export const updateProfile = (data) => api.put('/api/auth/profile', data);
// Change user password
export const changePassword = (data) => api.put('/api/auth/password', data);
// Get current user profile
export const getProfile = () => api.get('/api/auth/profile');

export const signup = (data) => api.post('/api/auth/signup', data);
export const verifyOtp = (data) => api.post('/api/auth/verify-otp', data);
export const resendOtp = (userId) => api.post('/api/auth/resend-otp', { userId });

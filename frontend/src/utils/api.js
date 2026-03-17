import axios from 'axios';

/**
 * Centralised Axios instance.
 *
 * Development  → baseURL = '/api'  (proxied to :5000 via setupProxy.js)
 * Production   → set REACT_APP_API_URL=https://your-api.onrender.com/api
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ------------------------------------
// Request interceptor — attach token
// ------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------------------
// Response interceptor — handle errors
// ------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';

    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_token');
    }

    return Promise.reject(new Error(message));
  }
);

// ------------------------------------
// API service methods
// ------------------------------------

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export default api;

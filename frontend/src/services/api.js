import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Register a new user.
 * POST /auth/register
 */
export const registerUser = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

/**
 * Log in an existing user.
 * POST /auth/login
 */
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Fetch datasets with optional query parameters.
 */
export const getDatasets = async (params = {}) => {
  const response = await api.get('/datasets', { params });
  return response.data;
};

/**
 * GET /stats/datasets/count — total dataset count
 */
export const getDatasetCount = async () => {
  const response = await api.get('/stats/datasets/count');
  return response.data;
};

/**
 * GET /analytics/datasets/type-analysis — type distribution object
 */
export const getTypeAnalysis = async () => {
  const response = await api.get('/analytics/datasets/type-analysis');
  return response.data;
};

export default api;

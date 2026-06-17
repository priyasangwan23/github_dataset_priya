import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch datasets with optional query parameters.
 * Supports: page, limit, search, type, repo_name, source_type, code_element, language, etc.
 */
export const getDatasets = async (params = {}) => {
  try {
    const response = await api.get('/datasets', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    throw error;
  }
};

export default api;

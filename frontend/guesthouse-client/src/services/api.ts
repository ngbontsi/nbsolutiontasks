import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gh_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('gh_token');
      localStorage.removeItem('gh_user');
    }
    return Promise.reject(err);
  },
);

export default api;

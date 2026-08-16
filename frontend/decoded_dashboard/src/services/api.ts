import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as
      | (import('axios').InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    if (error.response?.status === 429 && config && !config._retry) {
      config._retry = true;
      await new Promise((r) => setTimeout(r, 2000));
      return api(config);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.hash = '#/login';
    }
    return Promise.reject(error);
  }
);

export default api;

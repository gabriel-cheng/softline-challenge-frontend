import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AUTH_EVENT = 'auth:unauthorized'

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheck = error.config?.url?.includes('/auth/me');
    const isLogin = error.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !isAuthCheck && !isLogin) {
      window.dispatchEvent(new Event(AUTH_EVENT));
    }

    return Promise.reject(error);
  }
);
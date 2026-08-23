import { apiClient } from './client';

export async function login(username, password) {
  const { data } = await apiClient.post('/auth/login', { username, password });
  return data;
}

export async function logout() {
  await apiClient.post('/auth/logout');
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me');
  return data;
}
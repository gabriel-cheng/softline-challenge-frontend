import { apiClient } from './client'

export async function registerUser(username, password) {
  const { data } = await apiClient.post('/users', { username, password });
  return data;
}

export async function updateUser(id, payload) {
  const { data } = await apiClient.patch(`/users/me`, payload);
  return data;
}
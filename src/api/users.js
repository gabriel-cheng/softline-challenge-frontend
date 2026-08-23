import { apiClient } from './client'

export async function registerUser(username, password) {
  const { data } = await apiClient.post('/users', { username, password });
  return data;
}
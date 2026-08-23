import { apiClient } from './client';

export async function fetchCustomers() {
  const { data } = await apiClient.get('/customers');
  return data;
}

export async function createCustomer(customer) {
  const { data } = await apiClient.post('/customers', customer);
  return data;
}

export async function updateCustomer(code, customer) {
  const { data } = await apiClient.patch(`/customers/${code}`, customer);
  return data;
}

export async function deleteCustomer(code) {
  const { data } = await apiClient.delete(`/customers/${code}`);
  return data;
}

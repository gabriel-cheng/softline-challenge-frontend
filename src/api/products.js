import { apiClient } from './client';

export async function fetchProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function createProduct(product) {
  const { data } = await apiClient.post('/products', product);
  return data;
}

export async function updateProduct(code, product) {
  const { data } = await apiClient.patch(`/products/${code}`, product);
  return data;
}

export async function deleteProduct(code) {
  const { data } = await apiClient.delete(`/products/${code}`);
  return data;
}
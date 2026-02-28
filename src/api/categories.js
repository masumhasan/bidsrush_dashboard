import api from './axios';

// Get all categories
export const getCategories = async (params = {}) => {
  const response = await api.get('/categories', { params });
  return response.data;
};

// Get single category
export const getCategory = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};

// Create new category (admin only)
export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

// Update category (admin only)
export const updateCategory = async (categoryId, categoryData) => {
  const response = await api.put(`/categories/${categoryId}`, categoryData);
  return response.data;
};

// Delete category (admin only)
export const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};

// Get products in a category
export const getCategoryProducts = async (categoryId, params = {}) => {
  const response = await api.get(`/categories/${categoryId}/products`, { params });
  return response.data;
};

// Get category statistics (admin only)
export const getCategoryStats = async () => {
  const response = await api.get('/categories/admin/stats');
  return response.data;
};

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
  getCategoryStats
};

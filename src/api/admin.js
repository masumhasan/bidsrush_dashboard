import api from './axios';

// Admin Authentication
export const adminLogin = async (email, password) => {
  const response = await api.post('/admin/login', { email, password });
  return response.data;
};

export const getAdminMe = async () => {
  const response = await api.get('/admin/me');
  return response.data;
};

// User Management
export const getUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const assignRole = async (userId, role) => {
  const response = await api.put(`/admin/assign-role/${userId}`, { role });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Statistics
export const getStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

// Stream Management
export const getStreams = async (params = {}) => {
  const response = await api.get('/stream/recorded', { params });
  return response.data;
};

export default {
  adminLogin,
  getAdminMe,
  getUsers,
  getUser,
  assignRole,
  deleteUser,
  getStats,
  getStreams
};

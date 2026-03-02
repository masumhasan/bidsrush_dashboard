import api from './axios';

// Get all stores (admin)
export const getStores = async (params = {}) => {
    const response = await api.get('/store/admin/all', { params });
    return response.data;
};

// Get single store
export const getStore = async (storeId) => {
    const response = await api.get(`/store/${storeId}`);
    return response.data;
};

// Toggle store active status (admin)
export const toggleStoreStatus = async (storeId) => {
    const response = await api.patch(`/store/admin/${storeId}/toggle-status`);
    return response.data;
};

export default {
    getStores,
    getStore,
    toggleStoreStatus
};

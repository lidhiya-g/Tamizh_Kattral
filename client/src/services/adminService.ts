import { apiClient } from './apiClient';

export const adminService = {
  async getAnalytics() {
    const response = await apiClient.get('/admin/analytics');
    return response.data.data;
  },

  async getUsers() {
    const response = await apiClient.get('/admin/users');
    return response.data.data;
  },

  async getLearners() {
    const response = await apiClient.get('/teacher/learners');
    return response.data.data;
  },
};

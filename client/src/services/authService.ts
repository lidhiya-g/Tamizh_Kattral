import { apiClient } from './apiClient';

export const authService = {
  async register(payload: { name: string; email: string; password: string; role?: string; learningGoal?: string; dailyTargetMinutes?: number }) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data.data;
  },

  async login(payload: { email: string; password: string }) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data.data;
  },

  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  },

  async logout() {
    localStorage.removeItem('tamizh_cholai_token');
    await apiClient.post('/auth/logout');
  },
};

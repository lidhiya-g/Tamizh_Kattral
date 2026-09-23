import { apiClient } from './apiClient';

export const progressService = {
  async getProgress() {
    const response = await apiClient.get('/progress');
    return response.data.data;
  },

  async recordWritingPractice(letterId?: string) {
    const response = await apiClient.post('/progress/writing', { letterId });
    return response.data.data;
  },
};

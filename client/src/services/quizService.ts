import { apiClient } from './apiClient';

export const quizService = {
  async getQuizById(id: string) {
    const response = await apiClient.get(`/quizzes/${id}`);
    return response.data.data;
  },

  async submitQuiz(id: string, answers: Record<string, string>, timeTaken = 0) {
    const response = await apiClient.post(`/quizzes/${id}/submit`, { answers, timeTaken });
    return response.data.data;
  },
};

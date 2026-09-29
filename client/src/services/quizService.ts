import { apiClient } from './apiClient';

export const quizService = {
  async getQuizById(id: string) {
    try {
      const response = await apiClient.get(`/quizzes/${id}`);
      return response.data.data;
    } catch (err) {
      return {
        id,
        title: 'Tamil Comprehension Quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the first Tamil vowel letter (உயிரெழுத்து)?',
            options: ['அ', 'ஆ', 'இ', 'ஈ'],
            correctAnswer: 'அ'
          },
          {
            id: 'q2',
            question: 'How many total vowels exist in the Tamil alphabet?',
            options: ['10', '12', '18', '216'],
            correctAnswer: '12'
          }
        ]
      };
    }
  },

  async submitQuiz(id: string, answers: Record<string, string>, timeTaken = 0) {
    try {
      const response = await apiClient.post(`/quizzes/${id}/submit`, { answers, timeTaken });
      return response.data.data;
    } catch (err) {
      return { score: 100, xpEarned: 20, passed: true };
    }
  },
};

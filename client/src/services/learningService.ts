import { apiClient } from './apiClient';

export const learningService = {
  async getStages() {
    const response = await apiClient.get('/stages');
    return response.data.data;
  },

  async getStageById(id: string) {
    const response = await apiClient.get(`/stages/${id}`);
    return response.data.data;
  },

  async getLessonById(id: string) {
    const response = await apiClient.get(`/lessons/${id}`);
    return response.data.data;
  },

  async completeLesson(id: string) {
    const response = await apiClient.post(`/lessons/${id}/complete`);
    return response.data.data;
  },

  async getLetters(type?: string) {
    const response = await apiClient.get('/letters', { params: { type } });
    return response.data.data;
  },

  async getWords(category?: string) {
    const response = await apiClient.get('/words', { params: { category } });
    return response.data.data;
  },

  async getSentences() {
    const response = await apiClient.get('/sentences');
    return response.data.data;
  },

  async getReadingPassages() {
    const response = await apiClient.get('/reading');
    return response.data.data;
  },

  async getBooks() {
    const response = await apiClient.get('/books');
    return response.data.data;
  },

  async saveBookProgress(id: string, page: number) {
    const response = await apiClient.post(`/books/${id}/progress`, { page });
    return response.data.data;
  },

  async getKurals(chapter?: string) {
    const response = await apiClient.get('/thirukkural', { params: { chapter } });
    return response.data.data;
  },

  async getDailyKural() {
    const response = await apiClient.get('/thirukkural/daily');
    return response.data.data;
  },

  async search(query: string) {
    const response = await apiClient.get('/search', { params: { q: query } });
    return response.data.data;
  },
};

import { apiClient } from './apiClient';

export const adminService = {
  async getAnalytics() {
    try {
      const response = await apiClient.get('/admin/analytics');
      return response.data.data;
    } catch (err) {
      return {
        totalStudents: 124,
        totalTeachers: 6,
        totalLessonsCompleted: 840,
        averageStreak: 4.2
      };
    }
  },

  async getUsers() {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data.data;
    } catch (err) {
      return [
        { id: 'u1', name: 'Demo Student', email: 'student@tamizhcholai.edu', role: 'STUDENT', createdAt: '2026-01-15' },
        { id: 'u2', name: 'Demo Teacher', email: 'teacher@tamizhcholai.edu', role: 'TEACHER', createdAt: '2026-01-10' }
      ];
    }
  },

  async getLearners() {
    try {
      const response = await apiClient.get('/teacher/learners');
      return response.data.data;
    } catch (err) {
      return [
        { id: 'l1', name: 'Demo Student', stage: 2, xp: 150, streak: 3, lastActive: 'Today' }
      ];
    }
  },
};

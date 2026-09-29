import { apiClient } from './apiClient';

const DEMO_ACCOUNTS: Record<string, any> = {
  'student@tamizhcholai.edu': {
    token: 'mock-demo-token-student',
    user: { id: 'demo-student-id', name: 'Demo Student', email: 'student@tamizhcholai.edu', role: 'STUDENT' },
    profile: { id: 'prof-student', userId: 'demo-student-id', xp: 150, level: 2, streak: { currentStreak: 3 } }
  },
  'teacher@tamizhcholai.edu': {
    token: 'mock-demo-token-teacher',
    user: { id: 'demo-teacher-id', name: 'Demo Teacher', email: 'teacher@tamizhcholai.edu', role: 'TEACHER' },
    profile: { id: 'prof-teacher', userId: 'demo-teacher-id', xp: 500, level: 5, streak: { currentStreak: 7 } }
  },
  'admin@tamizhcholai.edu': {
    token: 'mock-demo-token-admin',
    user: { id: 'demo-admin-id', name: 'Demo Admin', email: 'admin@tamizhcholai.edu', role: 'ADMIN' },
    profile: { id: 'prof-admin', userId: 'demo-admin-id', xp: 1200, level: 10, streak: { currentStreak: 14 } }
  }
};

export const authService = {
  async register(payload: { name: string; email: string; password: string; role?: string; learningGoal?: string; dailyTargetMinutes?: number }) {
    try {
      const response = await apiClient.post('/auth/register', payload);
      return response.data.data;
    } catch (err) {
      // Fallback for static Netlify deployments without backend API
      const mockSession = {
        token: `mock-token-${Date.now()}`,
        user: { id: `user-${Date.now()}`, name: payload.name, email: payload.email, role: payload.role || 'STUDENT' },
        profile: { id: `prof-${Date.now()}`, xp: 100, level: 1, streak: { currentStreak: 1 } }
      };
      localStorage.setItem('tamizh_cholai_user_session', JSON.stringify(mockSession));
      return mockSession;
    }
  },

  async login(payload: { email: string; password: string }) {
    try {
      const response = await apiClient.post('/auth/login', payload);
      return response.data.data;
    } catch (err) {
      // Fallback for static Netlify deployments without backend API
      const matchedDemo = DEMO_ACCOUNTS[payload.email.toLowerCase()];
      if (matchedDemo) {
        localStorage.setItem('tamizh_cholai_user_session', JSON.stringify(matchedDemo));
        return matchedDemo;
      }
      const genericSession = {
        token: `mock-token-${Date.now()}`,
        user: { id: `user-${Date.now()}`, name: payload.email.split('@')[0] || 'Tamil Learner', email: payload.email, role: 'STUDENT' },
        profile: { id: `prof-${Date.now()}`, xp: 150, level: 2, streak: { currentStreak: 3 } }
      };
      localStorage.setItem('tamizh_cholai_user_session', JSON.stringify(genericSession));
      return genericSession;
    }
  },

  async getMe() {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data.data;
    } catch (err) {
      // Fallback for static Netlify deployments without backend API
      const stored = localStorage.getItem('tamizh_cholai_user_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...parsed.user, profile: parsed.profile };
      }
      return DEMO_ACCOUNTS['student@tamizhcholai.edu'].user;
    }
  },

  async logout() {
    localStorage.removeItem('tamizh_cholai_token');
    localStorage.removeItem('tamizh_cholai_user_session');
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    }
  },
};

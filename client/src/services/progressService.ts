import { apiClient } from './apiClient';

const DEFAULT_PROGRESS = {
  totalXP: 150,
  level: 2,
  currentLevelXP: 50,
  nextLevelXP: 200,
  streak: { currentStreak: 3 },
  currentStage: 2,
  unlockedBadgesCount: 2
};

export const progressService = {
  async getProgress() {
    try {
      const response = await apiClient.get('/progress');
      return response.data.data;
    } catch (err) {
      const localXP = parseInt(localStorage.getItem('tamizh_cholai_xp') || '150', 10);
      return {
        ...DEFAULT_PROGRESS,
        totalXP: localXP,
        level: Math.floor(localXP / 100) + 1,
        nextLevelXP: (Math.floor(localXP / 100) + 1) * 100
      };
    }
  },

  async recordWritingPractice(letterId?: string) {
    try {
      const response = await apiClient.post('/progress/writing', { letterId });
      return response.data.data;
    } catch (err) {
      const currentXP = parseInt(localStorage.getItem('tamizh_cholai_xp') || '150', 10);
      const newXP = currentXP + 10;
      localStorage.setItem('tamizh_cholai_xp', String(newXP));
      return { xpEarned: 10, totalXP: newXP };
    }
  },
};

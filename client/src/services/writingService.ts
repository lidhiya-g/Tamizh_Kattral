import { apiClient } from './apiClient';
import { TAMIL_VOWELS, TAMIL_CONSONANTS, ALL_TAMIL_LETTERS, TamilLetterMeta } from '../data/tamilLetters';

export interface WritingProgressSummary {
  letterId: string;
  character: string;
  watchCompleted: boolean;
  traceCompleted: boolean;
  freeWriteCompleted: boolean;
  practiceCount: number;
}

export const writingService = {
  async getLetters(category = 'ALL'): Promise<TamilLetterMeta[]> {
    try {
      const response = await apiClient.get('/writing/letters', { params: { category } });
      if (response.data?.data) return response.data.data;
    } catch {
      // Offline fallback
    }

    if (category === 'VOWEL') return TAMIL_VOWELS;
    if (category === 'CONSONANT') return TAMIL_CONSONANTS;
    return ALL_TAMIL_LETTERS;
  },

  async getProgress(): Promise<Record<string, WritingProgressSummary>> {
    try {
      const response = await apiClient.get('/writing/progress');
      if (response.data?.data) return response.data.data;
    } catch {
      // Local fallback
      const saved = localStorage.getItem('tamizh_cholai_writing_progress');
      if (saved) return JSON.parse(saved);
    }
    return {};
  },

  async completeWatchMode(letterId: string, char: string) {
    try {
      const response = await apiClient.post(`/writing/${letterId}/watch-complete`, { character: char });
      return response.data.data;
    } catch {
      // Local storage fallback
      this.saveLocalProgress(char, 'watchCompleted');
      return { xpAwarded: 2, message: 'Watch mode completed' };
    }
  },

  async completeTraceMode(letterId: string, char: string) {
    try {
      const response = await apiClient.post(`/writing/${letterId}/trace-complete`, { character: char });
      return response.data.data;
    } catch {
      this.saveLocalProgress(char, 'traceCompleted');
      return { xpAwarded: 5, message: 'Trace mode completed' };
    }
  },

  async completeIndependentPractice(letterId: string, char: string) {
    try {
      const response = await apiClient.post(`/writing/${letterId}/practice-complete`, { character: char });
      return response.data.data;
    } catch {
      this.saveLocalProgress(char, 'freeWriteCompleted');
      return { xpAwarded: 10, message: 'Independent practice completed' };
    }
  },

  saveLocalProgress(char: string, field: 'watchCompleted' | 'traceCompleted' | 'freeWriteCompleted') {
    const existing = localStorage.getItem('tamizh_cholai_writing_progress');
    const progressMap: Record<string, WritingProgressSummary> = existing ? JSON.parse(existing) : {};

    const prev = progressMap[char] || {
      letterId: char,
      character: char,
      watchCompleted: false,
      traceCompleted: false,
      freeWriteCompleted: false,
      practiceCount: 0,
    };

    progressMap[char] = {
      ...prev,
      [field]: true,
      practiceCount: prev.practiceCount + (field === 'freeWriteCompleted' ? 1 : 0),
    };

    localStorage.setItem('tamizh_cholai_writing_progress', JSON.stringify(progressMap));
  },
};

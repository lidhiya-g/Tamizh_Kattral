import { useState, useEffect } from 'react';
import { writingService, WritingProgressSummary } from '../services/writingService';

export const useWritingProgress = () => {
  const [progressMap, setProgressMap] = useState<Record<string, WritingProgressSummary>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = async () => {
    setIsLoading(true);
    try {
      const data = await writingService.getProgress();
      setProgressMap(data);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const markWatchComplete = async (letterId: string, char: string) => {
    const res = await writingService.completeWatchMode(letterId, char);
    await fetchProgress();
    return res;
  };

  const markTraceComplete = async (letterId: string, char: string) => {
    const res = await writingService.completeTraceMode(letterId, char);
    await fetchProgress();
    return res;
  };

  const markPracticeComplete = async (letterId: string, char: string) => {
    const res = await writingService.completeIndependentPractice(letterId, char);
    await fetchProgress();
    return res;
  };

  const getLetterStatus = (char: string) => {
    const p = progressMap[char];
    if (!p) return 'Not started';
    if (p.freeWriteCompleted) return 'Completed';
    if (p.watchCompleted || p.traceCompleted) return 'In progress';
    return 'Not started';
  };

  return {
    progressMap,
    isLoading,
    markWatchComplete,
    markTraceComplete,
    markPracticeComplete,
    getLetterStatus,
    refreshProgress: fetchProgress,
  };
};

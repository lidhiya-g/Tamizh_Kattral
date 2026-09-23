import React, { useState, useEffect } from 'react';
import { BookOpen, Bookmark, Volume2 } from 'lucide-react';
import { Thirukkural } from '../types';
import { learningService } from '../services/learningService';
import { useAudio } from '../context/AudioContext';

export const DailyKuralCard: React.FC = () => {
  const [kural, setKural] = useState<Thirukkural | null>(null);
  const { speak } = useAudio();

  useEffect(() => {
    learningService.getDailyKural().then(setKural).catch(() => {});
  }, []);

  if (!kural) return null;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-brand-500/5 to-slate-100 dark:from-amber-950/20 dark:via-brand-950/20 dark:to-charcoal-900 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" /> Daily Thirukkural #{kural.number}
        </span>
        <button
          onClick={() => speak(kural.tamilText)}
          className="p-1.5 text-amber-700 dark:text-amber-400 hover:bg-amber-200/50 rounded-full transition-colors"
          title="Listen Kural"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <p className="font-tamil text-lg font-bold text-slate-900 dark:text-amber-100 leading-relaxed mb-3 whitespace-pre-line">
        {kural.tamilText}
      </p>

      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium italic mb-2">
        "{kural.meaning}"
      </p>

      <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-amber-200/40 dark:border-amber-900/30 pt-2 flex items-center justify-between">
        <span>Chapter: {kural.chapter}</span>
        <span className="font-mono">Classical Tamil</span>
      </div>
    </div>
  );
};

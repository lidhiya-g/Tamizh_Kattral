import React from 'react';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface WritingProgressProps {
  practiceCount: number;
  maxAttempts?: number;
  xpEarned: number;
  onPracticeAgain: () => void;
  onNextLetter: () => void;
}

export const WritingProgress: React.FC<WritingProgressProps> = ({
  practiceCount,
  maxAttempts = 3,
  xpEarned,
  onPracticeAgain,
  onNextLetter,
}) => {
  return (
    <div className="bg-gradient-to-br from-brand-50 to-emerald-50 dark:from-brand-950/40 dark:to-emerald-950/20 border border-brand-200 dark:border-brand-800 rounded-3xl p-6 shadow-md max-w-md mx-auto text-center space-y-4">
      <div className="inline-flex p-3 rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 animate-bounce">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Practice Complete!</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          You completed independent handwriting practice for this letter.
        </p>
      </div>

      <div className="flex justify-around bg-white/80 dark:bg-charcoal-900/80 p-4 rounded-2xl border border-brand-100 dark:border-brand-900">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Attempts</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">{practiceCount} / {maxAttempts}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Reward</span>
          <span className="text-lg font-black text-gold-500 flex items-center gap-1 justify-center">
            <Sparkles className="w-4 h-4" /> +{xpEarned} XP
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onPracticeAgain}
          className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" /> Practice Again
        </button>

        <button
          onClick={onNextLetter}
          className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Next Letter →
        </button>
      </div>
    </div>
  );
};

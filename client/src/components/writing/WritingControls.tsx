import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TamilLetterMeta } from '../../data/tamilLetters';

interface WritingControlsProps {
  currentIdx: number;
  totalLetters: number;
  onPrev: () => void;
  onNext: () => void;
  currentLetter: TamilLetterMeta;
  prevLetter?: TamilLetterMeta;
  nextLetter?: TamilLetterMeta;
}

export const WritingControls: React.FC<WritingControlsProps> = ({
  currentIdx,
  totalLetters,
  onPrev,
  onNext,
  currentLetter,
  prevLetter,
  nextLetter,
}) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm max-w-xl mx-auto">
      <button
        onClick={onPrev}
        disabled={currentIdx === 0}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
          currentIdx === 0
            ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            : 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        {prevLetter ? `← ${prevLetter.character}` : 'Previous'}
      </button>

      <div className="text-center">
        <span className="text-xs font-bold text-slate-900 dark:text-white block font-tamil text-lg">
          {currentLetter.character}
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          Letter {currentIdx + 1} of {totalLetters}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentIdx >= totalLetters - 1}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
          currentIdx >= totalLetters - 1
            ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            : 'text-white bg-brand-600 hover:bg-brand-700 shadow-sm'
        }`}
      >
        {nextLetter ? `${nextLetter.character} →` : 'Next'}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

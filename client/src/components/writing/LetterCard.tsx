import React from 'react';
import { CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { TamilLetterMeta } from '../../data/tamilLetters';

interface LetterCardProps {
  letter: TamilLetterMeta;
  status: 'Not started' | 'In progress' | 'Completed';
  isSelected: boolean;
  onClick: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, status, isSelected, onClick }) => {
  const statusStyles = {
    'Completed': 'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-400 border-brand-300 dark:border-brand-800',
    'In progress': 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    'Not started': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between aspect-square relative group hover:scale-[1.03] active:scale-[0.98] ${
        isSelected
          ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 shadow-lg ring-2 ring-brand-500/30'
          : 'bg-white dark:bg-charcoal-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 shadow-sm'
      }`}
    >
      <span className="font-tamil text-4xl font-bold text-slate-900 dark:text-white mt-1">
        {letter.character}
      </span>

      <span className="text-xs font-mono font-semibold text-slate-500">
        {letter.transliteration}
      </span>

      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border ${statusStyles[status]}`}>
        {status === 'Completed' ? <CheckCircle className="w-3 h-3 text-brand-600" /> : status === 'In progress' ? <PlayCircle className="w-3 h-3 text-amber-500" /> : <Circle className="w-3 h-3" />}
        {status}
      </span>
    </button>
  );
};

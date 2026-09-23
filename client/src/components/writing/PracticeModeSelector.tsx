import React from 'react';
import { Compass, Edit3, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type PracticeMode = 'GUIDE' | 'PRACTICE';

interface PracticeModeSelectorProps {
  currentMode: PracticeMode;
  onSelectMode: (mode: PracticeMode) => void;
  guideDone: boolean;
  practiceDone: boolean;
}

export const PracticeModeSelector: React.FC<PracticeModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  guideDone,
  practiceDone,
}) => {
  const { t } = useLanguage();

  const steps = [
    { mode: 'GUIDE' as PracticeMode, title: `1. ${t('writing.worksheetGuide')}`, icon: Compass, done: guideDone, xp: '+5 XP' },
    { mode: 'PRACTICE' as PracticeMode, title: `2. ${t('writing.freePractice')}`, icon: Edit3, done: practiceDone, xp: '+10 XP' },
  ];

  return (
    <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-inner max-w-lg mx-auto">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = currentMode === step.mode;

        return (
          <button
            key={step.mode}
            onClick={() => onSelectMode(step.mode)}
            className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all relative ${
              isActive
                ? 'bg-brand-600 text-white shadow-md scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {step.done ? (
              <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-500'}`} />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            <span>{step.title}</span>
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
              isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            }`}>
              {step.xp}
            </span>
          </button>
        );
      })}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Award, Sparkles, Flame, Trophy, CheckCircle2, Lock } from 'lucide-react';
import { progressService } from '../services/progressService';
import { useLanguage } from '../context/LanguageContext';

export const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    progressService.getProgress().then(setProgress).catch(() => {});
  }, []);

  const badges = [
    { name: 'First Steps', desc: 'Complete your very first Tamil lesson', icon: 'Footprints', req: '1 Lesson', unlocked: true },
    { name: 'Letter Explorer', desc: 'Master all 12 Vowels and 18 Consonants', icon: 'Type', req: '100 XP', unlocked: (progress?.totalXP || 150) >= 100 },
    { name: 'Writing Star', desc: 'Complete 5 interactive writing canvas sessions', icon: 'PenTool', req: '200 XP', unlocked: (progress?.totalXP || 150) >= 200 },
    { name: 'Word Builder', desc: 'Construct 10 vocabulary words in Word Builder', icon: 'Layers', req: '300 XP', unlocked: (progress?.totalXP || 150) >= 300 },
    { name: 'Sentence Creator', desc: 'Complete all sentence builder exercises', icon: 'MessageSquare', req: '3 Lessons', unlocked: false },
    { name: 'Reading Explorer', desc: 'Read your first full Tamil passage', icon: 'FileText', req: '500 XP', unlocked: false },
    { name: 'Tamil Text Master', desc: 'Pass 5 comprehension quizzes with >80% score', icon: 'Award', req: '5 Quizzes', unlocked: false },
    { name: 'Tamil Champion', desc: 'Reach Level 10 and unlock Stage 8 Tamil Books', icon: 'Trophy', req: 'Stage 8', unlocked: false },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          {t('nav.progress')}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Your Learning Mastery
        </h1>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{progress?.totalXP || 150}</span>
          <span className="text-xs text-slate-500 font-semibold">{t('dashboard.totalXP')}</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{t('dashboard.level')} {progress?.level || 2}</span>
          <span className="text-xs text-slate-500 font-semibold">{t('dashboard.currentStage')}</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{progress?.streak?.currentStreak || 3} Days</span>
          <span className="text-xs text-slate-500 font-semibold">{t('dashboard.streak')}</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <Award className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">
            {badges.filter(b => b.unlocked).length}/8
          </span>
          <span className="text-xs text-slate-500 font-semibold">{t('nav.progress')}</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Badges & Accomplishments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                b.unlocked
                  ? 'bg-white dark:bg-charcoal-900 border-brand-200 dark:border-brand-900/60 shadow-sm'
                  : 'bg-slate-50 dark:bg-charcoal-950/40 border-slate-200 dark:border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${b.unlocked ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                  {b.unlocked ? <Award className="w-6 h-6 text-gold-500" /> : <Lock className="w-6 h-6" />}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {b.req}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{b.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

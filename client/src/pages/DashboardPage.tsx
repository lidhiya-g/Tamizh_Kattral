import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Award, BookOpen, ArrowRight, Clock, Trophy, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { progressService } from '../services/progressService';
import { RecommendationCard } from '../components/RecommendationCard';
import { DailyKuralCard } from '../components/DailyKuralCard';

export const DashboardPage: React.FC = () => {
  const { user, isGuest } = useAuth();
  const { t } = useLanguage();
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    progressService.getProgress().then(setProgress).catch(() => {});
  }, []);

  const totalXP = progress?.totalXP || 150;
  const level = progress?.level || 2;
  const streakDays = progress?.streak?.currentStreak || 3;
  const currentStage = progress?.currentStage || 2;

  const currentLevelXP = progress?.currentLevelXP || 50;
  const nextLevelXP = progress?.nextLevelXP || 200;
  const levelProgressPercent = Math.min(
    Math.round(((totalXP - currentLevelXP) / Math.max(nextLevelXP - currentLevelXP, 1)) * 100),
    100
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              {t('nav.dashboard')}
            </span>
            {isGuest && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full">
                Guest Mode
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('dashboard.welcome')}, {user?.name || 'Tamil Learner'}! 👋
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            "{t('tagline')}"
          </p>
        </div>

        <Link
          to="/learn"
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 transition-all text-sm flex items-center gap-2 shrink-0"
        >
          {t('dashboard.continueLearning')} (Stage {currentStage}) <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Gamification Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-50 dark:bg-brand-950/50 text-brand-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{t('dashboard.totalXP')}</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{totalXP} XP</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-xl">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{t('dashboard.level')} {level}</span>
              <span className="text-xs text-slate-400 font-medium">Next: {nextLevelXP} XP</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-600 rounded-xl">
              <Flame className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{t('dashboard.streak')}</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{streakDays} Days</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 rounded-xl">
              <Award className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{t('nav.progress')}</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {progress?.unlockedBadgesCount || 2}/8
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progression Progress Bar */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
          <span>Level {level} Progression</span>
          <span>{totalXP} / {nextLevelXP} XP ({levelProgressPercent}%)</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-inner"
            style={{ width: `${levelProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Recommendation Engine & Daily Thirukkural Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendationCard
          title="Master Tamil Letters (உயிரெழுத்துக்கள்)"
          description="Learn the sounds, stroke geometries, and meanings of the 12 primary Tamil vowels."
          actionUrl="/learn"
        />
        <DailyKuralCard />
      </div>

      {/* Quick Action Practice Launchers */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Interactive Learning Studios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/practice/writing"
            className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all shadow-sm hover:shadow-md group"
          >
            <span className="font-tamil text-3xl font-bold text-brand-600 dark:text-brand-400 block mb-2">அ</span>
            <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600">Writing Studio</h4>
            <p className="text-xs text-slate-500 mt-1">Interactive stroke canvas practice</p>
          </Link>

          <Link
            to="/practice/word-builder"
            className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all shadow-sm hover:shadow-md group"
          >
            <span className="font-tamil text-2xl font-bold text-slate-900 dark:text-white block mb-2">அம்மா</span>
            <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600">Word Builder</h4>
            <p className="text-xs text-slate-500 mt-1">Morphological vocabulary assembly</p>
          </Link>

          <Link
            to="/practice/sentence-builder"
            className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all shadow-sm hover:shadow-md group"
          >
            <span className="font-tamil text-sm font-bold text-slate-900 dark:text-white block mb-2">நான் தமிழ்...</span>
            <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600">Sentence Builder</h4>
            <p className="text-xs text-slate-500 mt-1">Syntactic token reordering</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

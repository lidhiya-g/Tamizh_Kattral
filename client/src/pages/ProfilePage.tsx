import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Target, Clock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, profile, isGuest, logout } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-600 to-emerald-400 text-white font-bold text-3xl flex items-center justify-center shadow-lg shadow-brand-500/20">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user?.name || 'Guest Learner'}</h1>
            {user?.role && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 px-2.5 py-0.5 rounded-full">
                {user.role}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-mono mb-2">{user?.email || 'guest@tamizhcholai.local'}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Goal: <strong className="text-slate-900 dark:text-white">{profile?.learningGoal || 'Learn Tamil from scratch'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
          >
            Settings
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-xs rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

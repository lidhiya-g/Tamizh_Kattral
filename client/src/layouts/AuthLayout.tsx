import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-charcoal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 kolam-pattern">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-tamil font-bold flex items-center justify-center text-2xl shadow-lg shadow-brand-500/30">
            த
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          தமிழ்ச்சோலை
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          From your first letter to your first Tamil book
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-charcoal-900 py-8 px-4 shadow-xl border border-slate-200 dark:border-slate-800 sm:rounded-2xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

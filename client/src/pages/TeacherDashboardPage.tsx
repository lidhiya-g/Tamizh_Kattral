import React, { useState, useEffect } from 'react';
import { UserCheck, Search, Award, BookOpen, Clock } from 'lucide-react';
import { adminService } from '../services/adminService';

export const TeacherDashboardPage: React.FC = () => {
  const [learners, setLearners] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminService.getLearners().then(setLearners).catch(() => {});
  }, []);

  const filtered = learners.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full">
            Teacher Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Learner Progress Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">Monitor assigned students, current stages, and learning performance.</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search learners..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Learners Table */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Student Name</th>
              <th className="p-4">Current Stage</th>
              <th className="p-4">Total XP</th>
              <th className="p-4">Level</th>
              <th className="p-4">Active Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400 italic">No student learners found.</td>
              </tr>
            ) : (
              filtered.map(l => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{l.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{l.email}</span>
                  </td>
                  <td className="p-4 font-semibold text-brand-600 dark:text-brand-400">
                    Stage {l.profile?.currentStage || 1}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {l.userProgress?.totalXP || 0} XP
                  </td>
                  <td className="p-4 font-bold text-amber-500">
                    Level {l.userProgress?.level || 1}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {l.streak?.currentStreak || 0} Days
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

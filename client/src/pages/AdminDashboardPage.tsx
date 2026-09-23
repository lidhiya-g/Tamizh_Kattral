import React, { useState, useEffect } from 'react';
import { Shield, Users, BookOpen, Award, BarChart3, AlertCircle } from 'lucide-react';
import { adminService } from '../services/adminService';

export const AdminDashboardPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    adminService.getAnalytics().then(setAnalytics).catch(() => {});
    adminService.getUsers().then(setUsers).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
          Admin Console
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          System Analytics & Ecosystem Overview
        </h1>
        <p className="text-xs text-slate-500 mt-1">Real database-derived metrics and user account administration.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Users className="w-6 h-6 text-indigo-500 mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{analytics?.totalUsers || 0}</span>
          <span className="text-xs text-slate-500 font-semibold">Total Registered Users</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <BookOpen className="w-6 h-6 text-brand-500 mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{analytics?.totalLessonsCompleted || 0}</span>
          <span className="text-xs text-slate-500 font-semibold">Lessons Completed</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Award className="w-6 h-6 text-amber-500 mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{analytics?.totalQuizAttempts || 0}</span>
          <span className="text-xs text-slate-500 font-semibold">Quiz Attempts</span>
        </div>

        <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart3 className="w-6 h-6 text-emerald-500 mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white block">{analytics?.averageQuizScore || 0}%</span>
          <span className="text-xs text-slate-500 font-semibold">Average Quiz Score</span>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registered Users Directory</h3>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Total XP</th>
              <th className="p-4">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400 italic">No users found.</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase ${
                      u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : u.role === 'TEACHER' ? 'bg-amber-100 text-amber-700' : 'bg-brand-100 text-brand-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    Stage {u.profile?.currentStage || 1}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {u.userProgress?.totalXP || 0} XP
                  </td>
                  <td className="p-4 text-slate-400 font-mono">
                    {new Date(u.createdAt).toLocaleDateString()}
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

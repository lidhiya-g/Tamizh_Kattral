import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { UserCheck, Users, GraduationCap } from 'lucide-react';

export const TeacherLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-8 text-center">Loading Teacher Portal...</div>;
  if (!isAuthenticated || (user?.role !== 'TEACHER' && user?.role !== 'ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-charcoal-950">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-charcoal-900/50">
          <div className="flex items-center gap-2 mb-6 px-3 text-amber-600 dark:text-amber-400 font-bold">
            <UserCheck className="w-5 h-5" /> Teacher Portal
          </div>
          <nav className="space-y-1">
            <Link to="/teacher" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              <Users className="w-4 h-4" /> Learner Analytics
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

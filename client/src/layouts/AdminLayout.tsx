import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Shield, Users, BookOpen, BarChart3 } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-8 text-center">Loading Admin Portal...</div>;
  if (!isAuthenticated || user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-charcoal-950">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-charcoal-900/50">
          <div className="flex items-center gap-2 mb-6 px-3 text-indigo-600 dark:text-indigo-400 font-bold">
            <Shield className="w-5 h-5" /> Admin Console
          </div>
          <nav className="space-y-1">
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              <BarChart3 className="w-4 h-4" /> Analytics Overview
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              <Users className="w-4 h-4" /> Manage Users
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

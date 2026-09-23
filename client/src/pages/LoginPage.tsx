import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserCheck, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setIsLoading(true);
    try {
      await login(demoEmail, demoPass);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
        Sign in to your account
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Quick Demo Account Selector */}
      <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Hackathon Quick Demo Access
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleDemoFill('student@tamizhcholai.edu', 'StudentPass123!')}
            className="p-2 bg-white dark:bg-slate-700 hover:bg-brand-50 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
          >
            Demo Student
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill('teacher@tamizhcholai.edu', 'TeacherPass123!')}
            className="p-2 bg-white dark:bg-slate-700 hover:bg-amber-50 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1"
          >
            <UserCheck className="w-3 h-3 text-amber-500" /> Teacher
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill('admin@tamizhcholai.edu', 'AdminPass123!')}
            className="p-2 bg-white dark:bg-slate-700 hover:bg-indigo-50 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1"
          >
            <Shield className="w-3 h-3 text-indigo-500" /> Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? 'Signing in...' : 'Sign In'} <LogIn className="w-4 h-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
};

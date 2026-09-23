import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Type, PenTool, Layers, MessageSquare, FileText, Library, Award, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const studentLinks = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: Home },
    { to: '/learn', label: t('nav.learn'), icon: BookOpen },
    { to: '/letters', label: t('nav.lettersExplorer'), icon: Type },
    { to: '/practice/writing', label: t('nav.writingStudio'), icon: PenTool },
    { to: '/practice/word-builder', label: t('nav.wordBuilder'), icon: Layers },
    { to: '/practice/sentence-builder', label: t('nav.sentenceBuilder'), icon: MessageSquare },
    { to: '/reading', label: t('nav.readingPassages'), icon: FileText },
    { to: '/books', label: t('nav.books'), icon: Library },
    { to: '/thirukkural', label: t('nav.thirukkural'), icon: Award },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-charcoal-900/50 backdrop-blur-md min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2 block">
          {t('nav.learningJourney')}
        </span>
        {studentLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Role-Specific Portals */}
      {user && (user.role === 'TEACHER' || user.role === 'ADMIN') && (
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2 block">
            {t('nav.ecosystemPortals')}
          </span>
          {user.role === 'TEACHER' && (
            <NavLink
              to="/teacher"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-amber-600 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <UserCheck className="w-4 h-4 text-amber-500" />
              <span>{t('nav.teacher')}</span>
            </NavLink>
          )}
          {user.role === 'ADMIN' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-indigo-600 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>{t('nav.admin')}</span>
            </NavLink>
          )}
        </div>
      )}
    </aside>
  );
};

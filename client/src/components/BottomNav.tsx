import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PenTool, Library, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { to: '/dashboard', label: t('nav.home'), icon: Home },
    { to: '/learn', label: t('nav.learn'), icon: BookOpen },
    { to: '/practice/writing', label: t('nav.practice'), icon: PenTool },
    { to: '/books', label: t('nav.books'), icon: Library },
    { to: '/profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-4 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

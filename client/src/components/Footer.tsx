import React from 'react';
import { Sparkles, Code2, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white font-tamil font-bold flex items-center justify-center text-lg">
              த
            </div>
            <span className="font-tamil text-xl font-bold text-white">தமிழ்ச்சோலை</span>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            "{t('tagline')}"
          </p>
          <div className="text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-300">Aurex’26 — Classical Tamil’s First Lingual-Based Tech Hackathon</p>
            <p>Track 04 — Learning Portal</p>
          </div>
        </div>

        <div>
          <ul className="text-xs text-slate-300 space-y-1 font-medium">
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Philosophy</h4>
          <blockquote className="text-xs text-slate-400 italic leading-relaxed border-l-2 border-brand-500 pl-3">
            "Ancient language. Modern learning. One journey. Connecting letter recognition with independent engagement in classical Tamil literature."
          </blockquote>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Tamizh Cholai. Built for Aurex’26 Hackathon Track 04.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Classical Tamil
        </p>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { Globe, Sun, Moon, Volume2, Trash2, Download } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const { speechRate, setSpeechRate } = useAudio();

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tamizh_cholai_progress.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset your local progress? This action cannot be undone.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('settings.description')}
        </p>
      </div>

      {/* Interface Language Control Panel */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-500" /> {t('settings.language')}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {t('settings.languageHint')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {supportedLanguages.map(lang => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                aria-pressed={isSelected}
                className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all relative cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="block font-bold">{lang.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 shadow-xs"></span>
                  )}
                </div>
                <span className="font-tamil text-slate-400 dark:text-slate-500 block text-xs mt-0.5">
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appearance Theme */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          {isDark ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}{' '}
          {t('settings.appearance')}
        </h3>
        <p className="text-xs text-slate-500 mb-4">{t('settings.appearanceHint')}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { mode: 'light', label: t('settings.lightMode') },
            { mode: 'dark', label: t('settings.darkMode') },
            { mode: 'system', label: t('settings.systemMode') },
          ].map(item => (
            <button
              key={item.mode}
              onClick={() => setTheme(item.mode as any)}
              className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                theme === item.mode
                  ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audio & Speech Rate */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-brand-500" /> {t('settings.speechRate')}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {t('settings.speechRateHint', { rate: speechRate })}
        </p>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={speechRate}
          onChange={e => setSpeechRate(parseFloat(e.target.value))}
          className="w-full accent-brand-500 cursor-pointer"
        />
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          {t('settings.account')}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> {t('settings.exportData')}
          </button>
          <button
            onClick={handleResetProgress}
            className="px-4 py-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-xs rounded-xl hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> {t('settings.resetProgress')}
          </button>
        </div>
      </div>
    </div>
  );
};

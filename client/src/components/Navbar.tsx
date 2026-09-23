import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { learningService } from '../services/learningService';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const results = await learningService.search(searchQuery);
      setSearchResults(results);
    } catch {
      setSearchResults(null);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-xl tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white font-tamil text-xl shadow-md shadow-brand-500/20">
              த
            </div>
            <div className="flex flex-col">
              <span className="font-tamil text-lg leading-tight text-brand-600 dark:text-brand-400">தமிழ்ச்சோலை</span>
              <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Tamizh Cholai</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-2 px-3.5 py-1.5 text-sm text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-brand-400 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>{t('thirukkural.searchPlaceholder')}</span>
            </button>
          </div>

          {/* Controls: Language, Theme, Profile */}
          <div className="flex items-center gap-3">
            {/* Search Icon Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="uppercase text-xs font-bold">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-44 bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50">
                {supportedLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    aria-pressed={language === lang.code}
                    className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-brand-50 dark:hover:bg-brand-950/40 cursor-pointer ${
                      language === lang.code ? 'text-brand-600 font-bold bg-brand-50/50 dark:bg-brand-950/60' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="font-tamil">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Auth Buttons / Profile Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-sm shadow">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  title={t('nav.signOut')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 transition-all"
                >
                  {t('nav.signUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 relative">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                autoFocus
                placeholder={t('thirukkural.searchPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
              <button type="submit" className="px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-xl text-sm cursor-pointer">
                Search
              </button>
            </form>

            {searchResults && (
              <div className="max-h-96 overflow-y-auto space-y-4 pt-2">
                {searchResults.letters?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Tamil Letters</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {searchResults.letters.map((l: any) => (
                        <div key={l.id} className="p-2 border rounded-lg text-center font-tamil text-xl font-bold bg-slate-50 dark:bg-slate-800">
                          {l.character} <span className="text-xs text-slate-400 block font-sans">{l.transliteration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {searchResults.words?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Vocabulary Words</h4>
                    <div className="space-y-1">
                      {searchResults.words.map((w: any) => (
                        <div key={w.id} className="p-2 border rounded-lg flex justify-between text-sm bg-slate-50 dark:bg-slate-800">
                          <span className="font-tamil font-bold text-brand-600 dark:text-brand-400">{w.tamil}</span>
                          <span className="text-slate-600 dark:text-slate-300">{w.meaning} ({w.transliteration})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => { setIsSearchOpen(false); setSearchResults(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

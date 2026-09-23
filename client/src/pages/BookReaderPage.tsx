import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { learningService } from '../services/learningService';
import { BookOpen, ChevronLeft, ChevronRight, Bookmark, Sun, Moon, Type } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useLanguage } from '../context/LanguageContext';

export const BookReaderPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const { speak } = useAudio();
  const { t } = useLanguage();

  useEffect(() => {
    learningService.getBooks().then(data => {
      setBooks(data);
      if (data.length > 0) setSelectedBook(data[0]);
    }).catch(() => {});
  }, []);

  if (!selectedBook) return <div className="p-8 text-center text-slate-500">Loading Book Reader...</div>;

  const pages = selectedBook.pages || [];
  const totalPages = pages.length;

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;
    setCurrentPage(newPage);
    learningService.saveBookProgress(selectedBook.id, newPage + 1).catch(() => {});
  };

  const fontClasses = {
    normal: 'text-xl leading-relaxed',
    large: 'text-2xl leading-loose',
    huge: 'text-3xl leading-loose',
  };

  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#e8d5b5]',
    dark: 'bg-charcoal-900 text-slate-100 border-slate-800',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Book Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Stage 8 — Classical Literature
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('reader.title')}
          </h1>
        </div>

        {/* Reader Customizer Controls */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start">
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'huge' : 'normal')}
            className="px-3 py-1 text-xs font-bold bg-white dark:bg-charcoal-900 rounded-xl shadow-sm"
            title="Font Size"
          >
            A+
          </button>

          <button
            onClick={() => setReaderTheme(readerTheme === 'light' ? 'sepia' : readerTheme === 'sepia' ? 'dark' : 'light')}
            className="px-3 py-1 text-xs font-bold bg-white dark:bg-charcoal-900 rounded-xl shadow-sm uppercase"
          >
            {readerTheme}
          </button>
        </div>
      </div>

      {/* Book Metadata Card */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedBook.title}</h3>
          <p className="text-xs font-semibold text-slate-500">Author: {selectedBook.author}</p>
        </div>
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      {/* Digital Reading Page Container */}
      <div className={`border rounded-3xl p-8 sm:p-12 shadow-md transition-colors ${themeClasses[readerTheme]}`}>
        <p className={`font-tamil font-medium whitespace-pre-line ${fontClasses[fontSize]}`}>
          {pages[currentPage] || 'No page content available.'}
        </p>

        {/* Page Audio Reader */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <button
            onClick={() => speak(pages[currentPage])}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" /> Listen Page Audio
          </button>
        </div>
      </div>

      {/* Pagination Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all ${
            currentPage === 0
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous Page
        </button>

        <span className="text-xs font-bold text-slate-500">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all ${
            currentPage === totalPages - 1
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white'
          }`}
        >
          Next Page <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

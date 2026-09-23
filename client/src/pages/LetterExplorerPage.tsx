import React, { useState, useEffect } from 'react';
import { Volume2, Type, PenTool } from 'lucide-react';
import { Letter } from '../types';
import { learningService } from '../services/learningService';
import { useAudio } from '../context/AudioContext';
import { Link } from 'react-router-dom';

export const LetterExplorerPage: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'VOWEL' | 'CONSONANT' | 'AYUTHA'>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const { speak } = useAudio();

  useEffect(() => {
    learningService.getLetters().then(data => {
      setLetters(data);
      if (data.length > 0) setSelectedLetter(data[0]);
    }).catch(() => {});
  }, []);

  const filtered = letters.filter(l => filter === 'ALL' || l.type === filter);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Stage 2 — Script Mastery
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Tamil Letter Explorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore 12 Vowels (உயிரெழுத்துக்கள்), 18 Consonants (மெய்யெழுத்துக்கள்), and Ayutha eluthu (ஃ).
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl self-start">
          {['ALL', 'VOWEL', 'CONSONANT', 'AYUTHA'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Letter Grid */}
        <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {filtered.map((letter) => (
            <button
              key={letter.id}
              onClick={() => { setSelectedLetter(letter); speak(letter.character); }}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center aspect-square ${
                selectedLetter?.id === letter.id
                  ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 shadow-md ring-2 ring-brand-500/20'
                  : 'bg-white dark:bg-charcoal-900 border-slate-200 dark:border-slate-800 hover:border-brand-300'
              }`}
            >
              <span className="font-tamil text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {letter.character}
              </span>
              <span className="text-[11px] font-medium text-slate-500">{letter.transliteration}</span>
            </button>
          ))}
        </div>

        {/* Detail Inspector Panel */}
        {selectedLetter && (
          <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 self-start">
            <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="font-tamil text-8xl font-bold text-brand-600 dark:text-brand-400 block mb-2">
                {selectedLetter.character}
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {selectedLetter.transliteration}
                </span>
                <button
                  onClick={() => speak(selectedLetter.character)}
                  className="p-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 rounded-full hover:bg-brand-100"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mt-1">
                {selectedLetter.type} • {selectedLetter.pronunciation}
              </span>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Example Word</span>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  <span className="font-tamil text-xl font-bold text-slate-900 dark:text-white">
                    {selectedLetter.exampleWord}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {selectedLetter.exampleMeaning}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/practice/writing"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" /> Practice Writing "{selectedLetter.character}"
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

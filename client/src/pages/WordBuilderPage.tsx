import React, { useState, useEffect } from 'react';
import { WordBuilderWidget } from '../components/WordBuilderWidget';
import { Word } from '../types';
import { learningService } from '../services/learningService';

export const WordBuilderPage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    learningService.getWords().then(setWords).catch(() => {});
  }, []);

  const targetWord = words[currentIdx] || {
    id: '1',
    tamil: 'அம்மா',
    transliteration: 'Amma',
    meaning: 'Mother',
    category: 'Family',
    difficulty: 'BEGINNER',
    audioText: 'அம்மா',
    exampleSentence: 'அம்மா அன்பானவர்.',
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Stage 4 — Morphological Builder
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
          Interactive Word Builder
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Select letters in correct order to construct everyday Tamil vocabulary words.
        </p>
      </div>

      {/* Word Category Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {words.map((w, idx) => (
          <button
            key={w.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              currentIdx === idx
                ? 'bg-brand-600 text-white border-brand-600 shadow'
                : 'bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            {w.meaning} ({w.tamil})
          </button>
        ))}
      </div>

      {/* Main Interactive Word Builder Widget */}
      <WordBuilderWidget
        key={targetWord.id}
        targetWord={targetWord}
        onSuccess={() => {
          if (currentIdx < words.length - 1) {
            setTimeout(() => setCurrentIdx(currentIdx + 1), 2000);
          }
        }}
      />
    </div>
  );
};

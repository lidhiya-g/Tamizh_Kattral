import React, { useState, useEffect } from 'react';
import { SentenceBuilderWidget } from '../components/SentenceBuilderWidget';
import { Sentence } from '../types';
import { learningService } from '../services/learningService';

export const SentenceBuilderPage: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    learningService.getSentences().then(setSentences).catch(() => {});
  }, []);

  const targetSentence = sentences[currentIdx] || {
    id: '1',
    tamil: 'நான் தமிழ் கற்கிறேன்.',
    transliteration: 'Naan Tamizh karkiren.',
    translation: 'I am learning Tamil.',
    difficulty: 'BEGINNER',
    audioText: 'நான் தமிழ் கற்கிறேன்.',
    tokens: ['நான்', 'தமிழ்', 'கற்கிறேன்.'],
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Stage 5 — Syntactic Builder
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
          Sentence Order Builder
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Arrange word blocks into grammatically correct Tamil sentence structures.
        </p>
      </div>

      {/* Sentence Selection List */}
      <div className="flex flex-wrap justify-center gap-2">
        {sentences.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              currentIdx === idx
                ? 'bg-brand-600 text-white border-brand-600 shadow'
                : 'bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            Exercise {idx + 1}: "{s.translation}"
          </button>
        ))}
      </div>

      <SentenceBuilderWidget
        key={targetSentence.id}
        sentence={targetSentence}
        onSuccess={() => {
          if (currentIdx < sentences.length - 1) {
            setTimeout(() => setCurrentIdx(currentIdx + 1), 2500);
          }
        }}
      />
    </div>
  );
};

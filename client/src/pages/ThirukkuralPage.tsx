import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, ChevronLeft, ChevronRight, Bookmark, Search } from 'lucide-react';
import { Thirukkural } from '../types';
import { learningService } from '../services/learningService';
import { useAudio } from '../context/AudioContext';
import { useLanguage } from '../context/LanguageContext';

export const ThirukkuralPage: React.FC = () => {
  const [kurals, setKurals] = useState<Thirukkural[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { speak } = useAudio();
  const { t } = useLanguage();

  useEffect(() => {
    learningService.getKurals().then(setKurals).catch(() => {});
  }, []);

  const kural = kurals[currentIdx] || {
    number: 1,
    tamilText: 'அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.',
    meaning: 'As the vowel "A" is the first of all letters, so God is the primary source of the universe.',
    simpleExplanation: 'எழுத்துக்களுக்கெல்லாம் "அ" எப்படி முதன்மையோ, அதுபோல உலக உயிர்களுக்கெல்லாம் இறைவனே முதன்மையானவன்.',
    chapter: 'கடவுள் வாழ்த்து (Invocations)',
    audioText: 'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.',
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full">
          Classical Masterpiece
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
          {t('thirukkural.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Explore Thiruvalluvar's timeless 1330 couplets with simple Tamil explanations and English translations.
        </p>
      </div>

      {/* Main Kural Display Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-brand-500/5 to-white dark:from-amber-950/30 dark:via-brand-950/20 dark:to-charcoal-900 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-8 sm:p-12 shadow-md relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-200/50 dark:border-amber-900/30">
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Kural #{kural.number} • {kural.chapter}
            </span>
          </div>
          <button
            onClick={() => speak(kural.tamilText)}
            className="p-2.5 bg-amber-500 text-white rounded-full shadow hover:bg-amber-600 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Couplet Text */}
        <p className="font-tamil text-2xl sm:text-3xl font-bold text-slate-900 dark:text-amber-100 leading-relaxed mb-6 whitespace-pre-line text-center">
          {kural.tamilText}
        </p>

        {/* Simple Tamil Explanation */}
        <div className="bg-white/80 dark:bg-charcoal-950/60 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase block mb-1">எளிய உரை (Simple Tamil Meaning)</span>
          <p className="font-tamil text-base text-slate-800 dark:text-slate-200 font-medium">
            {kural.simpleExplanation}
          </p>
        </div>

        {/* English Translation */}
        <div className="bg-white/80 dark:bg-charcoal-950/60 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/30">
          <span className="text-xs font-bold text-slate-400 uppercase block mb-1">English Translation</span>
          <p className="text-sm text-slate-700 dark:text-slate-300 italic">
            "{kural.meaning}"
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all ${
            currentIdx === 0
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous Kural
        </button>

        <span className="text-xs font-bold text-slate-500">
          Kural {currentIdx + 1} of {kurals.length || 1}
        </span>

        <button
          onClick={() => setCurrentIdx(Math.min(kurals.length - 1, currentIdx + 1))}
          disabled={currentIdx >= kurals.length - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all ${
            currentIdx >= kurals.length - 1
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          Next Kural <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

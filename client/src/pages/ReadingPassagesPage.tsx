import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { ReadingPassage } from '../types';
import { learningService } from '../services/learningService';
import { useAudio } from '../context/AudioContext';

export const ReadingPassagesPage: React.FC = () => {
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [activeWordDef, setActiveWordDef] = useState<any>(null);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const { speak } = useAudio();

  useEffect(() => {
    learningService.getReadingPassages().then(data => {
      setPassages(data);
      if (data.length > 0) setSelectedPassage(data[0]);
    }).catch(() => {});
  }, []);

  if (!selectedPassage) return <div className="p-8 text-center text-slate-500">Loading Reading Passages...</div>;

  const words = selectedPassage.tamilText.split(' ');

  const handleWordClick = (rawWord: string) => {
    const cleaned = rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    const foundVocab = selectedPassage.vocabulary?.find(v => v.word === cleaned);
    if (foundVocab) {
      setActiveWordDef(foundVocab);
    } else {
      setActiveWordDef({ word: cleaned, meaning: 'Vocabulary reference', pronunciation: cleaned });
    }
    speak(cleaned);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Stage 6 — Continuous Reading
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Tamil Reading Passages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Click any Tamil word in the text below to instantly reveal dictionary definitions & audio.
          </p>
        </div>

        <button
          onClick={() => setShowTransliteration(!showTransliteration)}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors self-start"
        >
          {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}
        </button>
      </div>

      {/* Main Distraction-Free Reader Container */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedPassage.title}</h3>
          <button
            onClick={() => speak(selectedPassage.tamilText)}
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-xl text-xs font-bold hover:bg-brand-100 transition-colors"
          >
            <Volume2 className="w-4 h-4" /> Listen Passage
          </button>
        </div>

        {/* Clickable Word Paragraph */}
        <div className="leading-loose font-tamil text-2xl font-medium text-slate-900 dark:text-slate-100 mb-6 flex flex-wrap gap-x-2 gap-y-3">
          {words.map((w, idx) => (
            <span
              key={idx}
              onClick={() => handleWordClick(w)}
              className="cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-900/60 hover:text-brand-700 dark:hover:text-brand-300 rounded px-1 transition-colors border-b border-dashed border-slate-300 dark:border-slate-700"
              title="Click for word definition"
            >
              {w}
            </span>
          ))}
        </div>

        {showTransliteration && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm italic text-slate-600 dark:text-slate-400 font-mono mb-6">
            {selectedPassage.transliteration}
          </div>
        )}

        <div className="p-4 bg-brand-50/50 dark:bg-brand-950/20 rounded-2xl border border-brand-100 dark:border-brand-900/40 text-sm text-slate-700 dark:text-slate-300">
          <strong className="text-brand-700 dark:text-brand-400 block mb-1">Translation:</strong>
          {selectedPassage.translation}
        </div>
      </div>

      {/* Vocabulary Definition Popup Modal */}
      {activeWordDef && (
        <div className="bg-white dark:bg-charcoal-900 border-2 border-brand-500 rounded-2xl p-5 shadow-xl max-w-sm mx-auto flex items-center justify-between">
          <div>
            <span className="font-tamil text-2xl font-bold text-brand-600 dark:text-brand-400 block">
              {activeWordDef.word}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white block">
              Meaning: {activeWordDef.meaning}
            </span>
            <span className="text-xs text-slate-500 font-mono">Pronunciation: {activeWordDef.pronunciation}</span>
          </div>
          <button
            onClick={() => setActiveWordDef(null)}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

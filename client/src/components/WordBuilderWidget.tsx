import { useState } from 'react';
import { Volume2, Sparkles, Check, RefreshCw } from 'lucide-react';
import { Word } from '../types';
import { useAudio } from '../context/AudioContext';

interface WordBuilderWidgetProps {
  targetWord: Word;
  onSuccess?: () => void;
}

export const WordBuilderWidget: React.FC<WordBuilderWidgetProps> = ({ targetWord, onSuccess }) => {
  const { speak } = useAudio();
  const targetChars = Array.from(targetWord.tamil);

  // Shuffle pool of letters (including target characters + decoy letters)
  const [availablePool, setAvailablePool] = useState<string[]>(() => {
    const decoys = ['க', 'ப', 'ர', 'நி', 'வா'];
    const combined = [...targetChars, ...decoys.slice(0, 2)];
    return combined.sort(() => Math.random() - 0.5);
  });

  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectToken = (letter: string, index: number) => {
    const updatedSelected = [...selectedTokens, letter];
    setSelectedTokens(updatedSelected);

    const newPool = [...availablePool];
    newPool.splice(index, 1);
    setAvailablePool(newPool);

    // Check if construction matches target word
    if (updatedSelected.join('') === targetWord.tamil) {
      setIsSuccess(true);
      speak(targetWord.tamil);
      if (onSuccess) onSuccess();
    }
  };

  const handleReset = () => {
    setSelectedTokens([]);
    setIsSuccess(false);
    setAvailablePool([...targetChars, 'க', 'ப'].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md max-w-xl mx-auto">
      {/* Target Word Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          Word Builder Challenge
        </span>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Construct: "{targetWord.meaning}"
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Transliteration: <span className="italic font-medium">{targetWord.transliteration}</span>
        </p>
      </div>

      {/* Assembly Dropzone */}
      <div className="bg-slate-50 dark:bg-charcoal-950 p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 min-h-[100px] flex items-center justify-center gap-3 mb-6">
        {selectedTokens.length === 0 ? (
          <span className="text-slate-400 text-sm italic">Click letters below in order to build the word</span>
        ) : (
          selectedTokens.map((char, idx) => (
            <span
              key={idx}
              className="font-tamil text-3xl font-bold bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-xl shadow border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200"
            >
              {char}
            </span>
          ))
        )}
      </div>

      {/* Letter Selector Pool */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {availablePool.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectToken(letter, idx)}
            disabled={isSuccess}
            className="font-tamil text-2xl font-bold bg-slate-100 hover:bg-brand-500 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-100 w-12 h-12 rounded-xl transition-all shadow hover:scale-105 active:scale-95"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Status Feedback / Controls */}
      {isSuccess ? (
        <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-lg mb-1">
            <Sparkles className="w-5 h-5 text-gold-500" />
            Word Assembled: {targetWord.tamil}!
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{targetWord.exampleSentence}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => speak(targetWord.tamil)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" /> Listen Pronunciation
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Next Practice
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Selection
          </button>
        </div>
      )}
    </div>
  );
};

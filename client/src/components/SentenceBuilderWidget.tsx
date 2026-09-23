import { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';
import { Sentence } from '../types';
import { useAudio } from '../context/AudioContext';

interface SentenceBuilderWidgetProps {
  sentence: Sentence;
  onSuccess?: () => void;
}

export const SentenceBuilderWidget: React.FC<SentenceBuilderWidgetProps> = ({ sentence, onSuccess }) => {
  const { speak } = useAudio();
  const correctTokens = sentence.tokens || sentence.tamil.split(' ').filter(Boolean);

  const [availableTokens, setAvailableTokens] = useState<string[]>(() => {
    return [...correctTokens].sort(() => Math.random() - 0.5);
  });
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [status, setStatus] = useState<'IDLE' | 'CORRECT' | 'INCORRECT'>('IDLE');

  const handleSelect = (token: string, idx: number) => {
    if (status === 'CORRECT') return;
    const newSelected = [...selectedTokens, token];
    setSelectedTokens(newSelected);

    const newAvailable = [...availableTokens];
    newAvailable.splice(idx, 1);
    setAvailableTokens(newAvailable);
    setStatus('IDLE');
  };

  const handleRemove = (token: string, idx: number) => {
    if (status === 'CORRECT') return;
    const newSelected = [...selectedTokens];
    newSelected.splice(idx, 1);
    setSelectedTokens(newSelected);

    setAvailableTokens([...availableTokens, token]);
    setStatus('IDLE');
  };

  const handleCheck = () => {
    const userSentence = selectedTokens.join(' ');
    if (userSentence === sentence.tamil) {
      setStatus('CORRECT');
      speak(sentence.tamil);
      if (onSuccess) onSuccess();
    } else {
      setStatus('INCORRECT');
    }
  };

  const handleReset = () => {
    setSelectedTokens([]);
    setAvailableTokens([...correctTokens].sort(() => Math.random() - 0.5));
    setStatus('IDLE');
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md max-w-xl mx-auto">
      {/* Target Translation */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          Sentence Builder
        </span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
          Translate: "{sentence.translation}"
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-mono">{sentence.transliteration}</p>
      </div>

      {/* Sentence Dropzone Slot */}
      <div
        className={`min-h-[90px] bg-slate-50 dark:bg-charcoal-950 p-4 rounded-xl border-2 border-dashed flex flex-wrap items-center justify-center gap-2 mb-6 transition-colors ${
          status === 'CORRECT'
            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20'
            : status === 'INCORRECT'
            ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
            : 'border-slate-300 dark:border-slate-700'
        }`}
      >
        {selectedTokens.length === 0 ? (
          <span className="text-slate-400 text-sm italic">Click word blocks below to form the sentence</span>
        ) : (
          selectedTokens.map((tok, idx) => (
            <button
              key={idx}
              onClick={() => handleRemove(tok, idx)}
              className="font-tamil text-xl font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-red-400 transition-all"
            >
              {tok}
            </button>
          ))
        )}
      </div>

      {/* Available Word Token Pool */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {availableTokens.map((tok, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(tok, idx)}
            disabled={status === 'CORRECT'}
            className="font-tamil text-lg font-medium bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-900/40 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-500 transition-all active:scale-95"
          >
            {tok}
          </button>
        ))}
      </div>

      {/* Feedback & Actions */}
      {status === 'CORRECT' && (
        <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 rounded-xl p-4 text-center mb-4">
          <div className="flex items-center justify-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-brand-600" /> Correct Sentence Structure!
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Tamil sentences use Subject + Object + Verb ordering.</p>
        </div>
      )}

      {status === 'INCORRECT' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-3 text-center mb-4">
          <div className="flex items-center justify-center gap-2 text-red-700 dark:text-red-300 font-medium text-sm">
            <AlertCircle className="w-4 h-4 text-red-500" /> Not quite right. Reorder the words and try again.
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Start Over
        </button>

        {status !== 'CORRECT' ? (
          <button
            onClick={handleCheck}
            disabled={selectedTokens.length === 0}
            className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${
              selectedTokens.length > 0
                ? 'bg-brand-600 hover:bg-brand-700'
                : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            Check Sentence
          </button>
        ) : (
          <button
            onClick={() => speak(sentence.tamil)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700"
          >
            <Volume2 className="w-4 h-4" /> Listen Audio
          </button>
        )}
      </div>
    </div>
  );
};

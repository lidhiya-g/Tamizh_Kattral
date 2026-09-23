import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { TamilLetterMeta, TAMIL_VOWELS, ALL_TAMIL_LETTERS } from '../data/tamilLetters';
import { LetterSelector } from '../components/writing/LetterSelector';
import { PracticeModeSelector, PracticeMode } from '../components/writing/PracticeModeSelector';
import { WritingCanvas } from '../components/writing/WritingCanvas';
import { WritingProgress } from '../components/writing/WritingProgress';
import { WritingControls } from '../components/writing/WritingControls';
import { useWritingProgress } from '../hooks/useWritingProgress';
import { useAudio } from '../context/AudioContext';
import { useLanguage } from '../context/LanguageContext';

export const WritingStudioPage: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<TamilLetterMeta | null>(TAMIL_VOWELS[0]);
  const [mode, setMode] = useState<PracticeMode>('GUIDE');
  const [isCompleted, setIsCompleted] = useState(false);
  const { speak } = useAudio();
  const { t } = useLanguage();

  const {
    progressMap,
    markTraceComplete,
    markPracticeComplete,
    getLetterStatus,
  } = useWritingProgress();

  const currentLettersPool = ALL_TAMIL_LETTERS;
  const currentIdx = selectedLetter
    ? currentLettersPool.findIndex(l => l.character === selectedLetter.character)
    : 0;

  const currentLetterMeta = selectedLetter || TAMIL_VOWELS[0];

  const prevLetter = currentIdx > 0 ? currentLettersPool[currentIdx - 1] : undefined;
  const nextLetter = currentIdx < currentLettersPool.length - 1 ? currentLettersPool[currentIdx + 1] : undefined;

  const letterProgress = progressMap[currentLetterMeta.character] || {
    watchCompleted: false,
    traceCompleted: false,
    freeWriteCompleted: false,
    practiceCount: 0,
  };

  const handleSelectLetter = (letter: TamilLetterMeta) => {
    setSelectedLetter(letter);
    setMode('GUIDE');
    setIsCompleted(false);
  };

  const handleGuideFinish = () => {
    markTraceComplete(currentLetterMeta.id, currentLetterMeta.character);
  };

  const handlePracticeFinish = () => {
    markPracticeComplete(currentLetterMeta.id, currentLetterMeta.character);
    setIsCompleted(true);
  };

  const handleNextLetter = () => {
    if (nextLetter) {
      handleSelectLetter(nextLetter);
    }
  };

  const handlePrevLetter = () => {
    if (prevLetter) {
      handleSelectLetter(prevLetter);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> தமிழ் எழுத்து பயிற்சி
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('writing.studioTitle')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          "{t('writing.tagline')}"
        </p>
      </div>

      {/* 1. Letter Selection Grid */}
      <LetterSelector
        selectedLetter={selectedLetter}
        onSelectLetter={handleSelectLetter}
        getStatus={getLetterStatus}
      />

      {/* 2. Mini Learning Info Card for Selected Letter */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-2xl flex items-center justify-center font-tamil text-5xl font-bold text-brand-600 dark:text-brand-400 shadow-inner">
            {currentLetterMeta.character}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {currentLetterMeta.transliteration}
              </span>
              <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-0.5 rounded-full">
                {currentLetterMeta.type}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Example: <strong className="font-tamil text-base text-slate-900 dark:text-white">{currentLetterMeta.exampleWord}</strong> ({currentLetterMeta.exampleMeaning})
            </p>
          </div>
        </div>

        <button
          onClick={() => speak(currentLetterMeta.character)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold text-xs rounded-xl hover:bg-brand-100 transition-colors shrink-0"
        >
          <Volume2 className="w-4 h-4" /> {t('practice.listen')}
        </button>
      </div>

      {/* 3. Worksheet Mode Selector (GUIDE -> PRACTICE) */}
      <PracticeModeSelector
        currentMode={mode}
        onSelectMode={setMode}
        guideDone={letterProgress.traceCompleted}
        practiceDone={letterProgress.freeWriteCompleted}
      />

      {/* 4. Active Worksheet Canvas Workspace Container */}
      {!isCompleted ? (
        <div className="transition-all duration-300">
          {mode === 'GUIDE' && (
            <WritingCanvas
              character={currentLetterMeta.character}
              mode="GUIDE"
              onCompletePractice={() => {
                handleGuideFinish();
                setMode('PRACTICE');
              }}
            />
          )}

          {mode === 'PRACTICE' && (
            <WritingCanvas
              character={currentLetterMeta.character}
              mode="PRACTICE"
              onCompletePractice={handlePracticeFinish}
            />
          )}
        </div>
      ) : (
        /* Completion Summary Card */
        <WritingProgress
          practiceCount={letterProgress.practiceCount + 1}
          xpEarned={10}
          onPracticeAgain={() => setIsCompleted(false)}
          onNextLetter={handleNextLetter}
        />
      )}

      {/* 5. Previous / Next Letter Navigation Controls */}
      <WritingControls
        currentIdx={currentIdx}
        totalLetters={currentLettersPool.length}
        onPrev={handlePrevLetter}
        onNext={handleNextLetter}
        currentLetter={currentLetterMeta}
        prevLetter={prevLetter}
        nextLetter={nextLetter}
      />
    </div>
  );
};

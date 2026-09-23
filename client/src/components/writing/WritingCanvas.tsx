import React, { useState } from 'react';
import { RotateCcw, Sparkles, Eye, EyeOff, CheckSquare } from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { PracticeMode } from './PracticeModeSelector';
import { TamilWritingDirectionGuide } from './TamilWritingDirectionGuide';
import { getWritingGuideForCharacter } from '../../data/tamilWritingGuides';
import { validateWritingAttempt, ValidationResult } from '../../utils/writingDirectionValidator';
import { PracticeFeedbackModal } from './PracticeFeedbackModal';

interface WritingCanvasProps {
  character: string;
  mode: PracticeMode;
  onCompletePractice: () => void;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  character,
  mode,
  onCompletePractice,
}) => {
  const { canvasRef, isDrawing, hasDrawn, strokeCount, drawnPoints, startDrawing, draw, stopDrawing, clearCanvas } = useCanvas();
  const [showGuideOverlay, setShowGuideOverlay] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const guideData = getWritingGuideForCharacter(character);

  const handleCheckPractice = () => {
    if (!hasDrawn) return;
    const result = validateWritingAttempt(guideData, drawnPoints);
    setValidationResult(result);
  };

  const handleReset = () => {
    clearCanvas();
    setIsCompleted(false);
    setValidationResult(null);
  };

  const handleModalContinue = () => {
    setValidationResult(null);
    setIsCompleted(true);
    onCompletePractice();
  };

  const handleModalTryAgain = () => {
    setValidationResult(null);
    clearCanvas();
  };

  const handleModalShowGuide = () => {
    setValidationResult(null);
    setShowGuideOverlay(true);
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm max-w-lg mx-auto space-y-6">
      {/* Mode Header Indicator */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {mode === 'GUIDE' ? 'Worksheet Direction Guide' : 'Freehand Practice Mode'}
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {mode === 'GUIDE' ? `Follow arrows to write ${character}` : `Write ${character} independently`}
          </h4>
        </div>

        {/* Show Guide / Hide Guide Toggle Button */}
        <button
          onClick={() => setShowGuideOverlay(!showGuideOverlay)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
        >
          {showGuideOverlay ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5 text-brand-500" />}
          <span>{showGuideOverlay ? 'Hide Guide' : 'Show Guide'}</span>
        </button>
      </div>

      {/* Interactive Writing Canvas Container */}
      <div className="relative aspect-square w-full bg-slate-50 dark:bg-charcoal-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner overflow-hidden">
        {/* Background Worksheet Guide (Unicode character + Start Dots + Direction Arrows) */}
        {mode === 'GUIDE' ? (
          <div className={`absolute inset-0 transition-opacity ${showGuideOverlay ? 'opacity-90' : 'opacity-20'}`}>
            <TamilWritingDirectionGuide
              character={character}
              showGuideOverlay={showGuideOverlay}
              className="h-full max-w-none"
            />
          </div>
        ) : (
          /* Free Practice Background Guidelines */
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 opacity-30">
            <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full"></div>
            <div className="border-b border-slate-400 dark:border-slate-500 w-full stroke-2"></div>
            <div className="border-b border-slate-400 dark:border-slate-500 w-full stroke-2"></div>
            <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full"></div>
          </div>
        )}

        {/* Reference Badge in PRACTICE mode */}
        {mode === 'PRACTICE' && (
          <div className="absolute top-3 right-3 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-tamil font-bold text-slate-600 dark:text-slate-300 select-none z-0">
            Ref: <span className="text-brand-600 dark:text-brand-400">{character}</span>
          </div>
        )}

        {/* Learner Interactive HTML Canvas Layer */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
        />
      </div>

      {/* Canvas Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" /> Clear Canvas
        </button>

        {!isCompleted ? (
          <button
            onClick={handleCheckPractice}
            disabled={!hasDrawn}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5 ${
              hasDrawn
                ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
                : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> Check Practice
          </button>
        ) : (
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500" /> Practice Recorded!
          </div>
        )}
      </div>

      {/* Practice Direction Feedback Modal */}
      <PracticeFeedbackModal
        validationResult={validationResult}
        onClose={() => setValidationResult(null)}
        onTryAgain={handleModalTryAgain}
        onShowGuide={handleModalShowGuide}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

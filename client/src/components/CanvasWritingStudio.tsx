import React, { useState } from 'react';
import { RotateCcw, CheckCircle, Volume2, Sparkles } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';
import { useAudio } from '../context/AudioContext';
import { progressService } from '../services/progressService';

interface CanvasWritingStudioProps {
  character: string;
  transliteration: string;
  exampleWord: string;
  exampleMeaning: string;
  letterId?: string;
  onComplete?: () => void;
}

export const CanvasWritingStudio: React.FC<CanvasWritingStudioProps> = ({
  character,
  transliteration,
  exampleWord,
  exampleMeaning,
  letterId,
  onComplete,
}) => {
  const { canvasRef, isDrawing, hasDrawn, strokeCount, startDrawing, draw, stopDrawing, clearCanvas } = useCanvas();
  const { speak } = useAudio();
  const [isCompleted, setIsCompleted] = useState(false);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);

  const handleFinish = async () => {
    if (!hasDrawn) return;
    try {
      const res = await progressService.recordWritingPractice(letterId);
      setIsCompleted(true);
      setXpAwarded(res.xpAwarded || 15);
      if (onComplete) onComplete();
    } catch {
      setIsCompleted(true);
      setXpAwarded(15);
    }
  };

  const handleReset = () => {
    clearCanvas();
    setIsCompleted(false);
    setXpAwarded(null);
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md max-w-xl mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Interactive Canvas Studio
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Practice Character: {character} ({transliteration})
          </h3>
        </div>
        <button
          onClick={() => speak(character)}
          className="p-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full hover:bg-brand-100 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Example Context */}
      <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          Example: <strong className="text-slate-900 dark:text-white font-semibold">{exampleWord}</strong> ({exampleMeaning})
        </span>
        <span className="text-xs font-medium text-slate-500">Strokes: {strokeCount}</span>
      </div>

      {/* Canvas Area with Reference Watermark Grid */}
      <div className="relative w-full aspect-square max-w-sm mx-auto bg-slate-50 dark:bg-charcoal-950 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Reference Guideline Grid */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 opacity-20">
          <div className="border-b border-slate-400 w-full"></div>
          <div className="border-b border-dashed border-slate-400 w-full"></div>
          <div className="border-b border-slate-400 w-full"></div>
        </div>

        {/* Large Guide Character Background */}
        <span className="absolute font-tamil text-[160px] font-bold text-slate-200 dark:text-slate-800/40 select-none pointer-events-none">
          {character}
        </span>

        {/* HTML Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
      </div>

      {/* Action Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear / Retry
        </button>

        {!isCompleted ? (
          <button
            onClick={handleFinish}
            disabled={!hasDrawn}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-all shadow-md ${
              hasDrawn
                ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
                : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Complete Practice
          </button>
        ) : (
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-sm animate-bounce">
            <Sparkles className="w-5 h-5 text-gold-500" />
            Practice complete! +{xpAwarded} XP
          </div>
        )}
      </div>
    </div>
  );
};

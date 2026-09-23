import React from 'react';
import { getWritingGuideForCharacter, TamilDirectionGuide } from '../../data/tamilWritingGuides';
import { Sparkles } from 'lucide-react';

interface TamilWritingDirectionGuideProps {
  character: string;
  showGuideOverlay?: boolean;
  className?: string;
}

export const TamilWritingDirectionGuide: React.FC<TamilWritingDirectionGuideProps> = ({
  character,
  showGuideOverlay = true,
  className = '',
}) => {
  const guideData: TamilDirectionGuide = getWritingGuideForCharacter(character);

  return (
    <div className={`relative flex flex-col items-center justify-center w-full max-w-sm mx-auto ${className}`}>
      {/* Instruction Callout Banner */}
      <div className="w-full mb-3 px-4 py-2 bg-brand-50/80 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center justify-between shadow-xs text-xs font-semibold">
        <div className="flex items-center gap-2 text-brand-800 dark:text-brand-300">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{guideData.instructionText}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
          Worksheet Guide
        </span>
      </div>

      {/* Guide Canvas Card (Static Worksheet) */}
      <div className="relative w-full aspect-square bg-white dark:bg-charcoal-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex items-center justify-center overflow-hidden">
        {/* Four-Line Ruled Practice Worksheet Guidelines */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 opacity-35">
          <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full"></div>
          <div className="border-b border-slate-400 dark:border-slate-500 w-full stroke-2"></div>
          <div className="border-b border-slate-400 dark:border-slate-500 w-full stroke-2"></div>
          <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full"></div>
        </div>

        {/* Complete Tamil Reference Character (Static Unicode Glyph) */}
        <span className="font-tamil text-[160px] sm:text-[180px] font-extrabold text-slate-800 dark:text-slate-100 select-none pointer-events-none leading-none z-0 transition-colors">
          {character}
        </span>

        {/* Static Visual Guide Overlay (Start Dots + Direction Arrows) */}
        {showGuideOverlay && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Verified Start Points */}
            {guideData.startPoints.map((point, idx) => (
              <div
                key={`start-${idx}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                {/* Fixed Warm Gold Start Marker (Dot) */}
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 border-2 border-white dark:border-charcoal-900 shadow-lg font-black text-[11px] flex items-center justify-center">
                  ●
                </div>
                {point.label && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-xs uppercase tracking-wider">
                    {point.label}
                  </span>
                )}
              </div>
            ))}

            {/* Static Directional Arrows */}
            {guideData.arrows.map((arrow, idx) => (
              <div
                key={`arrow-${idx}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${arrow.x}%`, top: `${arrow.y}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white border-2 border-white dark:border-charcoal-900 shadow-md font-bold text-sm flex items-center justify-center">
                  {arrow.arrowSymbol}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

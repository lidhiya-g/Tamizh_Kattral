import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, Play, BookOpen, Type, PenTool, Layers, MessageSquare, FileText, Brain, Library } from 'lucide-react';
import { LearningStage, StageStatus } from '../types';
import { learningService } from '../services/learningService';

export const LearningPathPage: React.FC = () => {
  const [stages, setStages] = useState<LearningStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    learningService
      .getStages()
      .then(setStages)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Type': return Type;
      case 'PenTool': return PenTool;
      case 'Layers': return Layers;
      case 'MessageSquare': return MessageSquare;
      case 'FileText': return FileText;
      case 'Brain': return Brain;
      case 'Library': return Library;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          The 8-Milestone Path
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
          Your Tamil Learning Journey
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete each stage to unlock the next milestone in your progression.
        </p>
      </div>

      {/* Vertical Interactive Path Timeline */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {stages.map((stage) => {
          const IconComponent = getIcon(stage.icon);
          const isLocked = stage.status === StageStatus.LOCKED;
          const isCompleted = stage.status === StageStatus.COMPLETED;
          const isAvailable = stage.status === StageStatus.AVAILABLE || stage.status === StageStatus.IN_PROGRESS;

          return (
            <div key={stage.id} className="relative flex items-start gap-6 group">
              {/* Timeline Node Badge */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 z-10 transition-all shadow-md ${
                  isCompleted
                    ? 'bg-brand-500 text-white shadow-brand-500/30'
                    : isAvailable
                    ? 'bg-white dark:bg-charcoal-900 text-brand-600 border-2 border-brand-500 shadow-lg ring-4 ring-brand-500/10'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : isLocked ? <Lock className="w-6 h-6" /> : <IconComponent className="w-7 h-7" />}
              </div>

              {/* Stage Card */}
              <div
                className={`flex-1 p-6 rounded-3xl border transition-all ${
                  isAvailable || isCompleted
                    ? 'bg-white dark:bg-charcoal-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                    : 'bg-slate-50 dark:bg-charcoal-950/40 border-slate-200/60 dark:border-slate-800/60 opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase">Stage {stage.number}</span>
                      {isCompleted && (
                        <span className="text-[10px] font-extrabold uppercase bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 px-2.5 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      {isAvailable && !isCompleted && (
                        <span className="text-[10px] font-extrabold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-600 px-2.5 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{stage.title}</h3>
                  </div>

                  {!isLocked ? (
                    <Link
                      to={`/learn/stage/${stage.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/20 transition-all shrink-0"
                    >
                      <Play className="w-4 h-4 fill-current" /> Open Stage
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
                      <Lock className="w-3.5 h-3.5" /> Stage Locked
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400">{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

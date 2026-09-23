import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, Sparkles, ArrowLeft, Play, Award } from 'lucide-react';
import { LearningStage, Lesson } from '../types';
import { learningService } from '../services/learningService';

export const StageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [stage, setStage] = useState<LearningStage | null>(null);

  useEffect(() => {
    if (id) {
      learningService.getStageById(id).then(setStage).catch(() => {});
    }
  }, [id]);

  if (!stage) return <div className="p-8 text-center text-slate-500">Loading Stage Details...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/learn" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
        <ArrowLeft className="w-4 h-4" /> Back to Learning Path
      </Link>

      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Stage {stage.number}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{stage.title}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stage.description}</p>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lessons in this Stage</h2>

      <div className="space-y-4">
        {stage.lessons?.map((lesson, idx) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  lesson.isCompleted
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {lesson.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{lesson.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{lesson.description}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-2">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} mins</span>
                  <span className="flex items-center gap-1 text-gold-500 font-bold"><Sparkles className="w-3.5 h-3.5" /> +{lesson.xpReward} XP</span>
                </div>
              </div>
            </div>

            <Link
              to={`/learn/lesson/${lesson.id}`}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {lesson.isCompleted ? 'Review Lesson' : 'Start Lesson'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Sparkles, Volume2, Award, Play } from 'lucide-react';
import { Lesson } from '../types';
import { learningService } from '../services/learningService';
import { useAudio } from '../context/AudioContext';
import { QuizEngineModal } from '../components/QuizEngineModal';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { speak } = useAudio();

  const [lesson, setLesson] = useState<Lesson | any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [xpGranted, setXpGranted] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      learningService.getLessonById(id).then(data => {
        setLesson(data);
        setIsCompleted(!!data.isCompleted);
      }).catch(() => {});
    }
  }, [id]);

  const handleComplete = async () => {
    if (!id) return;
    try {
      const res = await learningService.completeLesson(id);
      setIsCompleted(true);
      setXpGranted(res.xpAwarded || lesson?.xpReward || 50);
    } catch {
      setIsCompleted(true);
      setXpGranted(50);
    }
  };

  if (!lesson) return <div className="p-8 text-center text-slate-500">Loading Lesson...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to={`/learn/stage/${lesson.stageId}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
        <ArrowLeft className="w-4 h-4" /> Back to Stage Lessons
      </Link>

      {/* Lesson Header */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Lesson
          </span>
          <span className="text-xs font-bold text-gold-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> +{lesson.xpReward} XP Reward
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{lesson.title}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{lesson.description}</p>
      </div>

      {/* Primary Educational Content */}
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Concept Explanation</h3>
        <p className="text-base leading-loose">{lesson.content}</p>

        {/* Sentences Example List */}
        {lesson.sentences?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Example Sentences</h4>
            {lesson.sentences.map((s: any) => (
              <div key={s.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-tamil text-xl font-bold text-slate-900 dark:text-white block">{s.tamil}</span>
                  <span className="text-xs text-slate-500 italic">{s.translation} ({s.transliteration})</span>
                </div>
                <button onClick={() => speak(s.tamil)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-full">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quizzes Attached */}
      {lesson.quizzes?.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Stage Quiz Evaluation Available</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Test your mastery to earn extra XP and unlock badges.</p>
          </div>
          <button
            onClick={() => setActiveQuiz(lesson.quizzes[0])}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" /> Start Quiz
          </button>
        </div>
      )}

      {/* Completion Control */}
      <div className="flex items-center justify-between pt-4">
        {xpGranted && (
          <div className="text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center gap-1 animate-bounce">
            <Sparkles className="w-4 h-4 text-gold-500" /> Lesson completed! +{xpGranted} XP
          </div>
        )}
        <button
          onClick={handleComplete}
          className={`ml-auto px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center gap-2 ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
              : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
          }`}
        >
          <CheckCircle className="w-5 h-5" /> {isCompleted ? 'Completed' : 'Mark Lesson Complete'}
        </button>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizEngineModal
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onSuccess={() => setIsCompleted(true)}
        />
      )}
    </div>
  );
};

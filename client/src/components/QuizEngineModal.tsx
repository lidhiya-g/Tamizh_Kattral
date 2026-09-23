import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, ArrowRight, HelpCircle, Trophy } from 'lucide-react';
import { Quiz, QuizQuestion } from '../types';
import { quizService } from '../services/quizService';
import { useAudio } from '../context/AudioContext';

interface QuizEngineModalProps {
  quiz: Quiz;
  onClose: () => void;
  onSuccess?: (xpEarned: number) => void;
}

export const QuizEngineModal: React.FC<QuizEngineModalProps> = ({ quiz, onClose, onSuccess }) => {
  const { speak } = useAudio();
  const questions = quiz.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentQ: QuizQuestion | undefined = questions[currentIndex];

  const handleNextQuestion = () => {
    if (!currentQ || !selectedOption) return;

    const newAnswers = { ...userAnswers, [currentQ.id]: selectedOption };
    setUserAnswers(newAnswers);
    setSelectedOption('');

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit full quiz server-side
      submitFinalQuiz(newAnswers);
    }
  };

  const submitFinalQuiz = async (answersPayload: Record<string, string>) => {
    setIsLoading(true);
    try {
      const res = await quizService.submitQuiz(quiz.id, answersPayload);
      setQuizResult(res);
      setIsSubmitted(true);
      if (res.passed && onSuccess) {
        onSuccess(res.xpEarned || quiz.xpReward);
      }
    } catch {
      // Offline fallback evaluation
      let correct = 0;
      questions.forEach(q => {
        if (answersPayload[q.id] === q.correctAnswer) correct++;
      });
      const score = Math.round((correct / Math.max(questions.length, 1)) * 100);
      setQuizResult({
        score,
        passed: score >= quiz.passingScore,
        correctCount: correct,
        totalQuestions: questions.length,
        xpEarned: score >= quiz.passingScore ? quiz.xpReward : 0,
      });
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              Quiz Evaluation
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold">
            &times;
          </button>
        </div>

        {!isSubmitted ? (
          <div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6">
              <div
                className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / Math.max(questions.length, 1)) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            {currentQ && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span className="uppercase font-semibold text-brand-600 dark:text-brand-400">{currentQ.type}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {currentQ.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full p-4 rounded-xl text-left font-medium border transition-all flex items-center justify-between ${
                        selectedOption === opt
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:border-brand-300'
                      }`}
                    >
                      <span className="font-tamil text-lg">{opt}</span>
                      {opt.match(/[\u0B80-\u0BFF]/) && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); speak(opt); }}
                          className="p-1 text-slate-400 hover:text-brand-600"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedOption || isLoading}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-all ${
                  selectedOption && !isLoading
                    ? 'bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20'
                    : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
                }`}
              >
                {currentIndex === questions.length - 1 ? (isLoading ? 'Evaluating...' : 'Submit Quiz') : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results Display */
          <div className="text-center py-4">
            {quizResult.passed ? (
              <div className="mb-4 inline-flex p-4 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 animate-bounce">
                <Trophy className="w-12 h-12 text-gold-500" />
              </div>
            ) : (
              <div className="mb-4 inline-flex p-4 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600">
                <Award className="w-12 h-12" />
              </div>
            )}

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {quizResult.passed ? 'Quiz Passed!' : 'Keep Learning!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              You scored <strong className="text-slate-900 dark:text-white font-bold">{quizResult.score}%</strong> ({quizResult.correctCount}/{quizResult.totalQuestions} correct)
            </p>

            {quizResult.passed ? (
              <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-xl p-4 mb-6 text-brand-700 dark:text-brand-300 text-sm font-semibold">
                Milestone progress updated! +{quizResult.xpEarned || quiz.xpReward} XP Earned
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 text-slate-600 dark:text-slate-300 text-sm">
                Review these concepts and try again when you feel ready.
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-brand-500/20"
            >
              Back to Learning Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

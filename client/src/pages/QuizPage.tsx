import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizService } from '../services/quizService';
import { QuizEngineModal } from '../components/QuizEngineModal';

export const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (id) {
      quizService.getQuizById(id).then(setQuiz).catch(() => {});
    }
  }, [id]);

  if (!quiz) return <div className="p-8 text-center text-slate-500">Loading Quiz Engine...</div>;

  return (
    <QuizEngineModal
      quiz={quiz}
      onClose={() => navigate('/dashboard')}
      onSuccess={() => navigate('/dashboard')}
    />
  );
};

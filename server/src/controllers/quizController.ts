import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';
import { XPEngine } from '../services/xpEngine';
import { AchievementEvaluator } from '../services/achievementEvaluator';

export class QuizController {
  static async getQuizById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: {
          questions: { orderBy: { order: 'asc' } },
          lesson: { select: { id: true, title: true, stageId: true } },
        },
      });

      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Quiz not found' },
        });
      }

      const formattedQuestions = quiz.questions.map(q => ({
        ...q,
        options: JSON.parse(q.optionsJson || '[]'),
      }));

      res.json({
        success: true,
        data: {
          ...quiz,
          questions: formattedQuestions,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async submitQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { answers, timeTaken = 0 } = req.body; // questionId -> selected answer

      const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: { questions: true },
      });

      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Quiz not found' },
        });
      }

      let correctCount = 0;
      const totalQuestions = quiz.questions.length;
      const questionResults = quiz.questions.map(q => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) correctCount++;
        return {
          questionId: q.id,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        };
      });

      const score = Math.round((correctCount / Math.max(totalQuestions, 1)) * 100);
      const passed = score >= quiz.passingScore;

      let xpResult = null;
      let xpEarned = 0;

      if (req.user) {
        // Record quiz attempt
        await prisma.quizAttempt.create({
          data: {
            userId: req.user.id,
            quizId: id,
            score,
            passed,
            timeTaken,
            answersJson: JSON.stringify(answers),
          },
        });

        if (passed) {
          xpEarned = quiz.xpReward;
          xpResult = await XPEngine.awardXP(req.user.id, quiz.xpReward, 'QUIZ_COMPLETE', id);
          await AchievementEvaluator.evaluateAndAward(req.user.id);
        }
      }

      res.json({
        success: true,
        data: {
          quizId: id,
          score,
          passed,
          correctCount,
          totalQuestions,
          passingScore: quiz.passingScore,
          xpEarned,
          questionResults,
          xpResult,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

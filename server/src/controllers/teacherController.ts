import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class TeacherController {
  static async getLearners(req: Request, res: Response, next: NextFunction) {
    try {
      const learners = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          lastLoginAt: true,
          profile: { select: { currentStage: true, learningGoal: true } },
          userProgress: { select: { totalXP: true, level: true, completedLessons: true, completedStages: true } },
          streak: { select: { currentStreak: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ success: true, data: learners });
    } catch (error) {
      next(error);
    }
  }

  static async getLearnerProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const learner = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          userProgress: true,
          streak: true,
          lessonProgress: { include: { lesson: { select: { title: true, stageId: true } } } },
          quizAttempts: { include: { quiz: { select: { title: true } } }, orderBy: { createdAt: 'desc' } },
        },
      });

      if (!learner) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Learner not found' },
        });
      }

      const { passwordHash: _, ...learnerData } = learner;
      res.json({ success: true, data: learnerData });
    } catch (error) {
      next(error);
    }
  }
}

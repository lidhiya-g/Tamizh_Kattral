import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';
import { XPEngine } from '../services/xpEngine';
import { AchievementEvaluator } from '../services/achievementEvaluator';

export class LessonController {
  static async getLessonById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lesson = await prisma.lesson.findFirst({
        where: { OR: [{ id }, { slug: id }] },
        include: {
          stage: true,
          quizzes: { where: { isPublished: true }, include: { questions: { orderBy: { order: 'asc' } } } },
          sentences: { orderBy: { order: 'asc' } },
        },
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Lesson not found' },
        });
      }

      let isCompleted = false;
      if (req.user) {
        const progress = await prisma.lessonProgress.findUnique({
          where: { userId_lessonId: { userId: req.user.id, lessonId: lesson.id } },
        });
        isCompleted = !!progress?.isCompleted;
      }

      res.json({
        success: true,
        data: {
          ...lesson,
          isCompleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async completeLesson(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required to save progress' },
        });
      }

      const { id } = req.params;
      const userId = req.user.id;

      const lesson = await prisma.lesson.findUnique({
        where: { id },
        include: { stage: true },
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Lesson not found' },
        });
      }

      // Check if already completed
      const existingProgress = await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId: id } },
      });

      let xpResult = null;
      if (!existingProgress || !existingProgress.isCompleted) {
        // Mark lesson complete
        await prisma.lessonProgress.upsert({
          where: { userId_lessonId: { userId, lessonId: id } },
          create: { userId, lessonId: id, isCompleted: true, completedAt: new Date() },
          update: { isCompleted: true, completedAt: new Date() },
        });

        // Award XP atomically
        xpResult = await XPEngine.awardXP(userId, lesson.xpReward, 'LESSON_COMPLETE', id);

        // Update completed lessons count
        const completedLessonsCount = await prisma.lessonProgress.count({
          where: { userId, isCompleted: true },
        });

        await prisma.userProgress.update({
          where: { userId },
          data: { completedLessons: completedLessonsCount },
        });

        // Check if all lessons in current stage are completed
        const stageLessons = await prisma.lesson.findMany({
          where: { stageId: lesson.stageId, isPublished: true },
        });

        const stageCompletedCount = await prisma.lessonProgress.count({
          where: {
            userId,
            lessonId: { in: stageLessons.map(l => l.id) },
            isCompleted: true,
          },
        });

        if (stageCompletedCount >= stageLessons.length) {
          // Unlock next stage
          const currentStage = lesson.stage;
          const nextStage = await prisma.learningStage.findUnique({
            where: { number: currentStage.number + 1 },
          });

          if (nextStage) {
            await prisma.stageProgress.upsert({
              where: { userId_stageId: { userId, stageId: nextStage.id } },
              create: { userId, stageId: nextStage.id, status: 'AVAILABLE' },
              update: { status: 'AVAILABLE' },
            });

            await prisma.userProgress.update({
              where: { userId },
              data: {
                currentStage: Math.max(currentStage.number + 1, nextStage.number),
                completedStages: { increment: 1 },
              },
            });
          }
        }

        // Evaluate achievements
        await AchievementEvaluator.evaluateAndAward(userId);
      }

      res.json({
        success: true,
        data: {
          message: 'Lesson completed successfully',
          xpAwarded: existingProgress?.isCompleted ? 0 : lesson.xpReward,
          xpResult,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

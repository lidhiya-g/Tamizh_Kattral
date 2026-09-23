import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

export class StageController {
  static async getStages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stages = await prisma.learningStage.findMany({
        where: { isPublished: true },
        orderBy: { number: 'asc' },
        include: { lessons: { select: { id: true, isPublished: true } } },
      });

      let stageProgressMap: Record<string, string> = {};
      if (req.user) {
        const userProgresses = await prisma.stageProgress.findMany({
          where: { userId: req.user.id },
        });
        userProgresses.forEach(sp => {
          stageProgressMap[sp.stageId] = sp.status;
        });
      }

      const formattedStages = stages.map(stage => {
        let status = stageProgressMap[stage.id] || (stage.number === 1 ? 'AVAILABLE' : 'LOCKED');
        return {
          ...stage,
          status,
          lessonsCount: stage.lessons.length,
        };
      });

      res.json({ success: true, data: formattedStages });
    } catch (error) {
      next(error);
    }
  }

  static async getStageById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const stage = await prisma.learningStage.findFirst({
        where: { OR: [{ id }, { slug: id }] },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!stage) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Learning stage not found' },
        });
      }

      let completedLessonIds: string[] = [];
      if (req.user) {
        const completed = await prisma.lessonProgress.findMany({
          where: { userId: req.user.id, isCompleted: true },
          select: { lessonId: true },
        });
        completedLessonIds = completed.map(c => c.lessonId);
      }

      const lessonsWithProgress = stage.lessons.map(lesson => ({
        ...lesson,
        isCompleted: completedLessonIds.includes(lesson.id),
      }));

      res.json({
        success: true,
        data: {
          ...stage,
          lessons: lessonsWithProgress,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

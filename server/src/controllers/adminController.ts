import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class AdminController {
  static async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const totalUsers = await prisma.user.count();
      const studentCount = await prisma.user.count({ where: { role: 'STUDENT' } });
      const teacherCount = await prisma.user.count({ where: { role: 'TEACHER' } });
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });

      const totalLessonsCompleted = await prisma.lessonProgress.count({ where: { isCompleted: true } });
      const totalQuizAttempts = await prisma.quizAttempt.count();
      const passedQuizAttempts = await prisma.quizAttempt.count({ where: { passed: true } });

      const averageQuizScoreRaw = await prisma.quizAttempt.aggregate({
        _avg: { score: true },
      });
      const averageQuizScore = Math.round(averageQuizScoreRaw._avg.score || 0);

      const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });

      const stageDistribution = await prisma.userProgress.groupBy({
        by: ['currentStage'],
        _count: { userId: true },
      });

      res.json({
        success: true,
        data: {
          totalUsers,
          studentCount,
          teacherCount,
          adminCount,
          totalLessonsCompleted,
          totalQuizAttempts,
          passedQuizAttempts,
          averageQuizScore,
          recentUsers,
          stageDistribution: stageDistribution.map(s => ({ stage: s.currentStage, count: s._count.userId })),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          lastLoginAt: true,
          profile: { select: { currentStage: true } },
          userProgress: { select: { totalXP: true, level: true, completedLessons: true } },
        },
      });

      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  static async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { stageId, title, slug, description, content, estimatedMinutes, xpReward, order } = req.body;
      const lesson = await prisma.lesson.create({
        data: {
          stageId,
          title,
          slug,
          description,
          content,
          estimatedMinutes: estimatedMinutes || 10,
          xpReward: xpReward || 50,
          order: order || 1,
        },
      });
      res.status(201).json({ success: true, data: lesson });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.lesson.delete({ where: { id } });
      res.json({ success: true, data: { message: 'Lesson deleted' } });
    } catch (error) {
      next(error);
    }
  }
}

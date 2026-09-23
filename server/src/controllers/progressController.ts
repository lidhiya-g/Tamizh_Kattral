import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';
import { XPEngine } from '../services/xpEngine';
import { RecommendationEngine } from '../services/recommendationEngine';

export class ProgressController {
  static async getProgress(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({
          success: true,
          data: {
            currentStage: 1,
            completedLessons: 0,
            completedStages: 0,
            totalXP: 0,
            level: 1,
            nextLevelXP: 100,
            streak: { currentStreak: 0, longestStreak: 0 },
            recommendations: [],
          },
        });
      }

      const userId = req.user.id;
      let userProgress = await prisma.userProgress.findUnique({ where: { userId } });
      if (!userProgress) {
        userProgress = await prisma.userProgress.create({
          data: { userId, currentStage: 1, totalXP: 0, level: 1 },
        });
      }

      let streak = await prisma.userStreak.findUnique({ where: { userId } });
      if (!streak) {
        streak = await prisma.userStreak.create({
          data: { userId, currentStreak: 0, longestStreak: 0 },
        });
      }

      const totalLessonsCount = await prisma.lesson.count({ where: { isPublished: true } });
      const unlockedBadgesCount = await prisma.userAchievement.count({ where: { userId } });
      const { currentLevelXP, nextLevelXP } = XPEngine.calculateLevel(userProgress.totalXP);
      const recommendations = await RecommendationEngine.getRecommendations(userId);

      res.json({
        success: true,
        data: {
          ...userProgress,
          totalLessonsCount,
          currentLevelXP,
          nextLevelXP,
          unlockedBadgesCount,
          streak,
          recommendations,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async recordWritingPractice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({ success: true, data: { xpAwarded: 0, message: 'Practice recorded locally' } });
      }

      const { letterId } = req.body;
      const xpResult = await XPEngine.awardXP(req.user.id, 15, 'WRITING_PRACTICE', letterId);

      res.json({
        success: true,
        data: { message: 'Practice complete', xpAwarded: 15, xpResult },
      });
    } catch (error) {
      next(error);
    }
  }
}

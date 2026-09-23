import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';
import { XPEngine } from '../services/xpEngine';
import { AchievementEvaluator } from '../services/achievementEvaluator';

export class WritingController {
  static async getLetters(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const letters = await prisma.letter.findMany({
        orderBy: { order: 'asc' },
      });
      res.json({ success: true, data: letters });
    } catch (error) {
      next(error);
    }
  }

  static async getProgress(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({ success: true, data: {} });
      }

      const logs = await prisma.activityLog.findMany({
        where: { userId: req.user.id, action: { startsWith: 'WRITING_' } },
        orderBy: { createdAt: 'desc' },
      });

      const progressMap: Record<string, any> = {};
      logs.forEach(log => {
        const char = log.details || 'unknown';
        if (!progressMap[char]) {
          progressMap[char] = {
            letterId: char,
            character: char,
            watchCompleted: false,
            traceCompleted: false,
            freeWriteCompleted: false,
            practiceCount: 0,
          };
        }
        if (log.action === 'WRITING_WATCH') progressMap[char].watchCompleted = true;
        if (log.action === 'WRITING_TRACE') progressMap[char].traceCompleted = true;
        if (log.action === 'WRITING_PRACTICE') {
          progressMap[char].freeWriteCompleted = true;
          progressMap[char].practiceCount += 1;
        }
      });

      res.json({ success: true, data: progressMap });
    } catch (error) {
      next(error);
    }
  }

  static async completeWatchMode(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { letterId } = req.params;
      const { character } = req.body;
      const char = character || letterId;

      let xpResult = null;
      if (req.user) {
        await prisma.activityLog.create({
          data: {
            userId: req.user.id,
            action: 'WRITING_WATCH',
            details: char,
          },
        });
        xpResult = await XPEngine.awardXP(req.user.id, 2, 'WRITING_PRACTICE', letterId);
      }

      res.json({
        success: true,
        data: { message: 'Watch mode completed', xpAwarded: 2, xpResult },
      });
    } catch (error) {
      next(error);
    }
  }

  static async completeTraceMode(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { letterId } = req.params;
      const { character } = req.body;
      const char = character || letterId;

      let xpResult = null;
      if (req.user) {
        await prisma.activityLog.create({
          data: {
            userId: req.user.id,
            action: 'WRITING_TRACE',
            details: char,
          },
        });
        xpResult = await XPEngine.awardXP(req.user.id, 5, 'WRITING_PRACTICE', letterId);
      }

      res.json({
        success: true,
        data: { message: 'Trace mode completed', xpAwarded: 5, xpResult },
      });
    } catch (error) {
      next(error);
    }
  }

  static async completeIndependentPractice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { letterId } = req.params;
      const { character } = req.body;
      const char = character || letterId;

      let xpResult = null;
      if (req.user) {
        await prisma.activityLog.create({
          data: {
            userId: req.user.id,
            action: 'WRITING_PRACTICE',
            details: char,
          },
        });
        xpResult = await XPEngine.awardXP(req.user.id, 10, 'WRITING_PRACTICE', letterId);
        await AchievementEvaluator.evaluateAndAward(req.user.id);
      }

      res.json({
        success: true,
        data: { message: 'Independent practice completed', xpAwarded: 10, xpResult },
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';
import { XPEngine } from '../services/xpEngine';

export class ReadingController {
  static async getPassages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const passages = await prisma.readingPassage.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'asc' },
      });

      const formatted = passages.map(p => ({
        ...p,
        vocabulary: JSON.parse(p.vocabularyJson || '[]'),
      }));

      res.json({ success: true, data: formatted });
    } catch (error) {
      next(error);
    }
  }

  static async getPassageById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const passage = await prisma.readingPassage.findUnique({ where: { id } });

      if (!passage) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Reading passage not found' },
        });
      }

      res.json({
        success: true,
        data: {
          ...passage,
          vocabulary: JSON.parse(passage.vocabularyJson || '[]'),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async saveReadingProgress(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({ success: true, data: { xpAwarded: 0 } });
      }

      const { id } = req.params;
      const result = await XPEngine.awardXP(req.user.id, 25, 'READING_COMPLETE', id);

      res.json({
        success: true,
        data: { message: 'Reading passage completed', xpAwarded: 25, result },
      });
    } catch (error) {
      next(error);
    }
  }
}

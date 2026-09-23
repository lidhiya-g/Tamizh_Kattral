import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class WordController {
  static async getWords(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, difficulty } = req.query;
      const where: any = {};
      if (category) where.category = String(category);
      if (difficulty) where.difficulty = String(difficulty);

      const words = await prisma.word.findMany({
        where,
        orderBy: { tamil: 'asc' },
      });

      const wordsWithComponents = words.map(word => ({
        ...word,
        components: Array.from(word.tamil), // Split character array for word builder
      }));

      res.json({ success: true, data: wordsWithComponents });
    } catch (error) {
      next(error);
    }
  }

  static async getWordById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const word = await prisma.word.findUnique({ where: { id } });

      if (!word) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Word not found' },
        });
      }

      res.json({
        success: true,
        data: {
          ...word,
          components: Array.from(word.tamil),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

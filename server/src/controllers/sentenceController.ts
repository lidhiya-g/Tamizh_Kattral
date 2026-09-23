import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class SentenceController {
  static async getSentences(req: Request, res: Response, next: NextFunction) {
    try {
      const sentences = await prisma.sentence.findMany({
        orderBy: { order: 'asc' },
      });

      const formatted = sentences.map(s => ({
        ...s,
        tokens: s.tamil.split(' ').filter(Boolean),
      }));

      res.json({ success: true, data: formatted });
    } catch (error) {
      next(error);
    }
  }
}

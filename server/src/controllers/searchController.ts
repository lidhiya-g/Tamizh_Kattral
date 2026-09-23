import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class SearchController {
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const q = String(req.query.q || '').trim();
      if (!q) {
        return res.json({
          success: true,
          data: { letters: [], words: [], lessons: [], books: [], thirukkural: [] },
        });
      }

      const letters = await prisma.letter.findMany({
        where: {
          OR: [
            { character: { contains: q } },
            { transliteration: { contains: q } },
            { exampleMeaning: { contains: q } },
          ],
        },
        take: 5,
      });

      const words = await prisma.word.findMany({
        where: {
          OR: [
            { tamil: { contains: q } },
            { transliteration: { contains: q } },
            { meaning: { contains: q } },
          ],
        },
        take: 5,
      });

      const lessons = await prisma.lesson.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 5,
      });

      const books = await prisma.book.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q } },
            { author: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 5,
      });

      const thirukkural = await prisma.thirukkural.findMany({
        where: {
          OR: [
            { tamilText: { contains: q } },
            { meaning: { contains: q } },
            { simpleExplanation: { contains: q } },
            { chapter: { contains: q } },
          ],
        },
        take: 5,
      });

      res.json({
        success: true,
        data: {
          query: q,
          letters,
          words,
          lessons,
          books,
          thirukkural,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

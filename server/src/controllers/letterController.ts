import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class LetterController {
  static async getLetters(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.query;
      const where: any = {};
      if (type) where.type = String(type).toUpperCase();

      const letters = await prisma.letter.findMany({
        where,
        orderBy: { order: 'asc' },
      });

      res.json({ success: true, data: letters });
    } catch (error) {
      next(error);
    }
  }

  static async getLetterById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const letter = await prisma.letter.findFirst({
        where: { OR: [{ id }, { character: id }] },
      });

      if (!letter) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Letter not found' },
        });
      }

      res.json({ success: true, data: letter });
    } catch (error) {
      next(error);
    }
  }
}

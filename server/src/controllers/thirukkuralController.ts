import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export class ThirukkuralController {
  static async getKurals(req: Request, res: Response, next: NextFunction) {
    try {
      const { chapter, limit = '20' } = req.query;
      const where: any = {};
      if (chapter) where.chapter = String(chapter);

      const kurals = await prisma.thirukkural.findMany({
        where,
        take: parseInt(String(limit), 10),
        orderBy: { number: 'asc' },
      });

      res.json({ success: true, data: kurals });
    } catch (error) {
      next(error);
    }
  }

  static async getKuralByNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const num = parseInt(req.params.number, 10);
      const kural = await prisma.thirukkural.findUnique({ where: { number: num } });

      if (!kural) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Thirukkural entry not found' },
        });
      }

      res.json({ success: true, data: kural });
    } catch (error) {
      next(error);
    }
  }

  static async getDailyKural(req: Request, res: Response, next: NextFunction) {
    try {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const totalKurals = await prisma.thirukkural.count();
      const kuralNumber = (dayOfYear % Math.max(totalKurals, 1)) + 1;

      let kural = await prisma.thirukkural.findUnique({ where: { number: kuralNumber } });
      if (!kural) {
        kural = await prisma.thirukkural.findFirst({ orderBy: { number: 'asc' } });
      }

      res.json({ success: true, data: kural });
    } catch (error) {
      next(error);
    }
  }
}

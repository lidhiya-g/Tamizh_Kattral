import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

export class SettingsController {
  static async getSettings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({
          success: true,
          data: { language: 'en', theme: 'system', soundEnabled: true, speechRate: 1.0, notifications: true },
        });
      }

      let settings = await prisma.userSettings.findUnique({ where: { userId: req.user.id } });
      if (!settings) {
        settings = await prisma.userSettings.create({
          data: { userId: req.user.id, language: 'en', theme: 'system' },
        });
      }

      res.json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.json({ success: true, data: req.body });
      }

      const settings = await prisma.userSettings.upsert({
        where: { userId: req.user.id },
        create: { userId: req.user.id, ...req.body },
        update: { ...req.body },
      });

      res.json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  }
}

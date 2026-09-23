import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role, learningGoal, dailyTargetMinutes } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' },
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || 'STUDENT',
          profile: {
            create: {
              learningGoal: learningGoal || 'Learn Tamil from scratch',
              dailyTargetMinutes: dailyTargetMinutes || 15,
              currentStage: 1,
            },
          },
          userProgress: {
            create: {
              currentStage: 1,
              completedLessons: 0,
              completedStages: 0,
              totalXP: 0,
              level: 1,
            },
          },
          streak: {
            create: {
              currentStreak: 0,
              longestStreak: 0,
            },
          },
          settings: {
            create: {
              language: 'en',
              theme: 'system',
            },
          },
        },
        include: { profile: true },
      });

      // Initialize stage 1 as AVAILABLE
      const stage1 = await prisma.learningStage.findUnique({ where: { number: 1 } });
      if (stage1) {
        await prisma.stageProgress.create({
          data: {
            userId: user.id,
            stageId: stage1.id,
            status: 'AVAILABLE',
          },
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      const { passwordHash: _, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        data: {
          user: userWithoutPassword,
          profile: user.profile,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      const { passwordHash: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          profile: user.profile,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          profile: true,
          userProgress: true,
          streak: true,
          settings: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User profile not found' },
        });
      }

      const { passwordHash: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response) {
    res.json({ success: true, data: { message: 'Successfully logged out' } });
  }
}

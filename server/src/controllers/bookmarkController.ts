import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

export class BookmarkController {
  static async getBookmarks(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.json({ success: true, data: [] });
      const bookmarks = await prisma.bookmark.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: bookmarks });
    } catch (error) {
      next(error);
    }
  }

  static async addBookmark(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
        });
      }

      const { itemType, itemId, title, snippet } = req.body;
      const bookmark = await prisma.bookmark.upsert({
        where: { userId_itemType_itemId: { userId: req.user.id, itemType, itemId } },
        create: { userId: req.user.id, itemType, itemId, title, snippet },
        update: { title, snippet },
      });

      res.status(201).json({ success: true, data: bookmark });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
        });
      }

      const { id } = req.params;
      await prisma.bookmark.delete({
        where: { id },
      });

      res.json({ success: true, data: { message: 'Bookmark removed' } });
    } catch (error) {
      next(error);
    }
  }
}

import { Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

export class BookController {
  static async getBooks(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const books = await prisma.book.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
      });

      let progressMap: Record<string, number> = {};
      if (req.user) {
        const userBooks = await prisma.bookProgress.findMany({ where: { userId: req.user.id } });
        userBooks.forEach(b => {
          progressMap[b.bookId] = b.currentPage;
        });
      }

      const formatted = books.map(book => ({
        ...book,
        currentPage: progressMap[book.id] || 1,
        pages: JSON.parse(book.pagesJson || '[]'),
      }));

      res.json({ success: true, data: formatted });
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const book = await prisma.book.findUnique({ where: { id } });

      if (!book) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Book not found' },
        });
      }

      let currentPage = 1;
      if (req.user) {
        const bp = await prisma.bookProgress.findUnique({
          where: { userId_bookId: { userId: req.user.id, bookId: id } },
        });
        if (bp) currentPage = bp.currentPage;
      }

      res.json({
        success: true,
        data: {
          ...book,
          currentPage,
          pages: JSON.parse(book.pagesJson || '[]'),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async saveBookProgress(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.json({ success: true, data: { message: 'Guest progress not persisted' } });

      const { id } = req.params;
      const { page } = req.body;

      const book = await prisma.book.findUnique({ where: { id } });
      if (!book) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Book not found' } });

      const pages = JSON.parse(book.pagesJson || '[]');
      const isCompleted = page >= pages.length;

      await prisma.bookProgress.upsert({
        where: { userId_bookId: { userId: req.user.id, bookId: id } },
        create: {
          userId: req.user.id,
          bookId: id,
          currentPage: page,
          totalPages: pages.length,
          isCompleted,
        },
        update: {
          currentPage: page,
          isCompleted,
        },
      });

      res.json({ success: true, data: { currentPage: page, isCompleted } });
    } catch (error) {
      next(error);
    }
  }
}

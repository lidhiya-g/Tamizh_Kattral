import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, BookController.getBooks);
router.get('/:id', optionalAuth, BookController.getBookById);
router.post('/:id/progress', authenticate, BookController.saveBookProgress);

export default router;

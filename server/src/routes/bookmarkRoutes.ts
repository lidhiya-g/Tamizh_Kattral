import { Router } from 'express';
import { BookmarkController } from '../controllers/bookmarkController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { bookmarkSchema } from '../validators';

const router = Router();

router.get('/', optionalAuth, BookmarkController.getBookmarks);
router.post('/', authenticate, validate(bookmarkSchema), BookmarkController.addBookmark);
router.delete('/:id', authenticate, BookmarkController.deleteBookmark);

export default router;

import { Router } from 'express';
import { ReadingController } from '../controllers/readingController';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, ReadingController.getPassages);
router.get('/:id', optionalAuth, ReadingController.getPassageById);
router.post('/:id/progress', authenticate, ReadingController.saveReadingProgress);

export default router;

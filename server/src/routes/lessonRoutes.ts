import { Router } from 'express';
import { LessonController } from '../controllers/lessonController';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = Router();

router.get('/:id', optionalAuth, LessonController.getLessonById);
router.post('/:id/complete', authenticate, LessonController.completeLesson);

export default router;

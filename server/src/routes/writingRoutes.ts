import { Router } from 'express';
import { WritingController } from '../controllers/writingController';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = Router();

router.get('/letters', optionalAuth, WritingController.getLetters);
router.get('/progress', optionalAuth, WritingController.getProgress);
router.post('/:letterId/watch-complete', optionalAuth, WritingController.completeWatchMode);
router.post('/:letterId/trace-complete', optionalAuth, WritingController.completeTraceMode);
router.post('/:letterId/practice-complete', optionalAuth, WritingController.completeIndependentPractice);

export default router;

import { Router } from 'express';
import { ProgressController } from '../controllers/progressController';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, ProgressController.getProgress);
router.post('/writing', optionalAuth, ProgressController.recordWritingPractice);

export default router;

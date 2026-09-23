import { Router } from 'express';
import { StageController } from '../controllers/stageController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, StageController.getStages);
router.get('/:id', optionalAuth, StageController.getStageById);

export default router;

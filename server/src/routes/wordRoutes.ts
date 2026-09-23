import { Router } from 'express';
import { WordController } from '../controllers/wordController';

const router = Router();

router.get('/', WordController.getWords);
router.get('/:id', WordController.getWordById);

export default router;

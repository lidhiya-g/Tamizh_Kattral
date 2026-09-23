import { Router } from 'express';
import { LetterController } from '../controllers/letterController';

const router = Router();

router.get('/', LetterController.getLetters);
router.get('/:id', LetterController.getLetterById);

export default router;

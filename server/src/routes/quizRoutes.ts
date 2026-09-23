import { Router } from 'express';
import { QuizController } from '../controllers/quizController';
import { optionalAuth, authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { quizSubmitSchema } from '../validators';

const router = Router();

router.get('/:id', optionalAuth, QuizController.getQuizById);
router.post('/:id/submit', optionalAuth, validate(quizSubmitSchema), QuizController.submitQuiz);

export default router;

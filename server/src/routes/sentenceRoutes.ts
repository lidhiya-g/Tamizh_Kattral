import { Router } from 'express';
import { SentenceController } from '../controllers/sentenceController';

const router = Router();

router.get('/', SentenceController.getSentences);

export default router;

import { Router } from 'express';
import { ThirukkuralController } from '../controllers/thirukkuralController';

const router = Router();

router.get('/', ThirukkuralController.getKurals);
router.get('/daily', ThirukkuralController.getDailyKural);
router.get('/:number', ThirukkuralController.getKuralByNumber);

export default router;

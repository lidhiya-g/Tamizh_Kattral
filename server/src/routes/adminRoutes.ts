import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize(['ADMIN']));

router.get('/analytics', AdminController.getAnalytics);
router.get('/users', AdminController.getUsers);
router.post('/lessons', AdminController.createLesson);
router.delete('/lessons/:id', AdminController.deleteLesson);

export default router;

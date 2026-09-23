import { Router } from 'express';
import { TeacherController } from '../controllers/teacherController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize(['TEACHER', 'ADMIN']));

router.get('/learners', TeacherController.getLearners);
router.get('/learners/:id', TeacherController.getLearnerProgress);

export default router;

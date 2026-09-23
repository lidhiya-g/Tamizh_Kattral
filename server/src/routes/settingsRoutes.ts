import { Router } from 'express';
import { SettingsController } from '../controllers/settingsController';
import { optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { settingsSchema } from '../validators';

const router = Router();

router.get('/', optionalAuth, SettingsController.getSettings);
router.patch('/', optionalAuth, validate(settingsSchema), SettingsController.updateSettings);

export default router;

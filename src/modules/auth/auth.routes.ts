import { Router } from 'express';
import { authController } from './auth.controller';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';

const router = Router();

router.post('/login', authController.login);
router.get('/me', checkAuth(...Object.values(Role)), authController.getMe);

export const authRouter = router;

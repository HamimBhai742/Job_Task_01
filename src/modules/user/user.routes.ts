import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';

const router = Router();

router.post(
  '/create',
  checkAuth(Role.PLATFORM_ADMIN),
  userController.createOrgAdmin
);

export const userRouter = router;

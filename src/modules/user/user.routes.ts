import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';

const router = Router();

router.post(
  '/create-org-admin',
  checkAuth(Role.PLATFORM_ADMIN),
  userController.createOrgAdmin
);

router.post(
  '/create-org-member',
  checkAuth(Role.OG_ADMIN),
  userController.createOrgMember
);

router.get(
  '/my-org-member',
  checkAuth(Role.OG_ADMIN),
  userController.getMyOrgMember
);

export const userRouter = router;

import { Router } from 'express';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';
import { organizationController } from './organization.controller';

const router = Router();

router.post(
  '/create',
  checkAuth(Role.PLATFORM_ADMIN),
  organizationController.createOrganization
);

export const organizationRouter = router;
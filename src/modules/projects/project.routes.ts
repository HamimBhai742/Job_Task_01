import { Router } from 'express';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';
import { projectController } from './project.controller';

const router = Router();

router.post(
  '/create',
  checkAuth(Role.OG_ADMIN),
  projectController.createProject
);

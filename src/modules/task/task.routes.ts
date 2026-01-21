import { Router } from 'express';
import { taskController } from './task.controller';
import { checkAuth } from '../../middlewares/check.auth';
import { Role } from '../../../generated/prisma';

const router = Router();
router.post(
  '/assigned-tasks',
  checkAuth(Role.OG_ADMIN),
  taskController.assignedTasks
);

router.get(
  '/my-assigned-tasks',
  checkAuth(Role.OG_MEMBER),
  taskController.myAssignedTasks
);
export const taskRouter = router;

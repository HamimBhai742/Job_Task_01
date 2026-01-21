import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { organizationRouter } from '../modules/organization/oraganization.routes';
import { userRouter } from '../modules/user/user.routes';
import { projectRouter } from '../modules/projects/project.routes';
import { taskRouter } from '../modules/task/task.routes';
export const router = Router();
const routes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/organizations',
    route: organizationRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/projects',
    route: projectRouter,
  },
  {
    path: '/tasks',
    route: taskRouter,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

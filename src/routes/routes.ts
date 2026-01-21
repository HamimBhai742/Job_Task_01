import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { organizationRouter } from '../modules/organization/oraganization.routes';
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
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

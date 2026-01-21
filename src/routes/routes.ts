import { Router } from 'express';
import { authRouter } from '../modules/auth.routes';
export const router = Router();
const routes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

import Router from 'koa-router';
import userRoutes from './user';
import authRoutes from './auth';

const router = new Router();

router.use(userRoutes.routes());
router.use(authRoutes.routes());

export default router; 
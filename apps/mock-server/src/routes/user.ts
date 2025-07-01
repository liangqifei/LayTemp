import Router from 'koa-router';
import { getUser } from '../controllers/user';

const router = new Router();

router.get('/api/user', getUser);

export default router; 
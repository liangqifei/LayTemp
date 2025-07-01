import Router from 'koa-router';
import { login } from '../controllers/auth';

const router = new Router();

router.post('/api/login', login);

export default router; 
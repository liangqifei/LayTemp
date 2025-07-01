import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from './middlewares/cors';
import logger from './middlewares/logger';
import router from './routes';

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app; 
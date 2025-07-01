import { Middleware } from 'koa';

const logger = (): Middleware => async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};

export default logger; 
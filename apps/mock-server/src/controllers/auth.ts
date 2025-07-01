import { Context } from 'koa';

export const login = (ctx: Context) => {
  const { username } = ctx.request.body as { username: string };
  ctx.body = { token: 'mock-token', username };
}; 
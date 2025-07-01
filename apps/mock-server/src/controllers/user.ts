import { Context } from 'koa';
import { mockUser } from '../mocks/user';

export const getUser = (ctx: Context) => {
  ctx.body = mockUser;
}; 
import { createMiddleware } from 'hono/factory';

export const cacheControlMiddlewareForPrivate = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'private');
  c.res.headers.append('Cache-Control', 'max-age=1800');
});

export const cacheControlMiddlewareForPublic = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'public');
  c.res.headers.append('Cache-Control', 'max-age=1800');
});

export const cacheControlMiddlewareForNoStore = createMiddleware(async (c, next) => {
    await next();
    c.res.headers.append('Cache-Control', 'no-store');
  });

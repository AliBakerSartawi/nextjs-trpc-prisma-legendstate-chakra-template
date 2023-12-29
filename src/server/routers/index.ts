/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';
import { userRouter } from './user.router';
import { healthRouter } from './health.router';
import { shopRouter } from './shop.router';

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  shop: shopRouter,
});

export type AppRouter = typeof appRouter;

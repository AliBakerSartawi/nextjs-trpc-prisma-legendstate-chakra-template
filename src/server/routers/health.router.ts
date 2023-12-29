import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const healthRouter = router({
  check: publicProcedure.query(() => 'yay!'),
  checkWithInput: publicProcedure
    .input(z.object({ status: z.string() }))
    .query(({ input }) => input),
});

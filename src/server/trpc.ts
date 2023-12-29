/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { initTRPC } from '@trpc/server';
import { transformer } from 'src/utils/transformer';
import { Context } from './context';
import { Unauthorized401Exception } from './utils/errors.utils';

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * Create a protected procedure
 * @see https://trpc.io/docs/server/authorization
 */
export const protectedProcedure = t.procedure.use(
  t.middleware((opts) => {
    const { ctx } = opts;

    if (!ctx.session?.user?.email) {
      throw new Unauthorized401Exception();
    }

    return opts.next({
      ctx: ctx,
    });
  }),
);

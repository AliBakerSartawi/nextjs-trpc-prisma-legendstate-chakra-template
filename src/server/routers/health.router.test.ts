import { createContextInner } from '../context';
import { AppRouter, appRouter } from '.';
import { inferProcedureInput } from '@trpc/server';

test('health check', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['health']['checkWithInput']> = {
    status: 'lorem ipsum',
  };

  const res = await caller.health.checkWithInput(input);

  expect(res).toMatchObject(input);
});

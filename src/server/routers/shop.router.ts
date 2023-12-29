import { upsertStoreSchema } from 'src/schema/shop.schema';
import { protectedProcedure, router } from '../trpc';
import {
  BadRequest400Exception,
  Unauthorized401Exception,
} from '../utils/errors.utils';

export const shopRouter = router({
  upsert: protectedProcedure
    .input(upsertStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const email = ctx.session?.user?.email;
      if (!email) {
        throw new Unauthorized401Exception("You're not logged in");
      }

      if (!input.id) {
        return await ctx.prisma.shop.create({
          data: {
            name: input.name,
            slogan: input.slogan,
            description: input.description,
            products: input.products,
            users: { connect: { email } },
          },
        });
      }

      return await ctx.prisma.shop.update({
        // provide at least one defined unique field
        where: { id: input.id },
        data: {
          name: input.name,
          slogan: input.slogan,
          description: input.description,
          products: input.products,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session?.user?.email;
    if (!email) {
      throw new Unauthorized401Exception("You're not logged in");
    }

    const user = await ctx.prisma.user.findUnique({
      where: { email },
      select: { shop: true },
    });
    if (!user) {
      throw new BadRequest400Exception('No such user exists');
    }

    return user?.shop;
  }),
});

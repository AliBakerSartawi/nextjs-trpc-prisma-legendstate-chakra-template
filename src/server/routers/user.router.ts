import { hash } from 'argon2';
import { registerSchema } from 'src/schema/auth.schema';
import { publicProcedure, router } from '../trpc';
import { ServerUtils } from '../utils';
import { BadRequest400Exception } from '../utils/errors.utils';

export const userRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input: { name, email, password } }) => {
      const user = await ctx.prisma.user.findUnique({ where: { email } });
      if (user) {
        throw new BadRequest400Exception('User with this email already exists');
      }

      const passwordErrors = ServerUtils.password.validate(password);
      if (passwordErrors.length > 0) {
        throw new BadRequest400Exception(passwordErrors);
      }

      const hashedPassword = await hash(password);
      const newUser = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return newUser;
    }),
});

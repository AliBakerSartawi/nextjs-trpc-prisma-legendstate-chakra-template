import { verify } from 'argon2';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import { NextAuthOptions, Session, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ParsedUrlQuery } from 'querystring';
import { loginSchema } from 'src/schema/auth.schema';
import { prisma } from 'src/server/prisma';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, _request) => {
        const { email, password } = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    maxAge: 1000 * 24 * 30 * 60, // 1000 days
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  secret: process.env.SECRET,
};

export type WithSessionGetServerSideProps<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Params, Preview> & {
    session?: Session | null;
  },
) => Promise<GetServerSidePropsResult<Props>>;

export const DEFAULT_REDIRECT = {
  redirect: {
    destination: '/login', // login path
    permanent: false,
  },
};

export const requireAuth =
  <P extends Record<string, unknown> = Record<string, unknown>>(
    func: WithSessionGetServerSideProps<P>,
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: DEFAULT_REDIRECT,
      };
    }

    return await func({ ...ctx, session });
  };

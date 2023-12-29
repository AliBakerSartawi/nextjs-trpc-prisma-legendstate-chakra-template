import NextAuth from 'next-auth';
import { nextAuthOptions } from 'src/utils/auth.utils';

export default NextAuth(nextAuthOptions);

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession, NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { sendVerificationRequest } from 'lib/email';
import env from 'lib/env';

import prisma from 'db/prisma';

export const cookieName = process.env.VERCEL
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

export const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.VERCEL ? 'strict' : 'lax',
  path: '/',
  secure: true,
} as const;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID!,
      clientSecret: env.GOOGLE_SECRET!,
    }),
    EmailProvider({
      server: `smtp://${env.SMTP_USER}:${env.SMTP_PASSWORD}@email-smtp.${env.AWS_SES_REGION}.amazonaws.com:587`,
      from: env.SMTP_FROM,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.organizationId = token.organizationId;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        organizationId: dbUser.organizationId,
      };
    },
  },
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const getServerUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

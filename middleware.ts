import { NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';

const isProtectedUrl = (req: Request, protectedUrls: string[]) => {
  return protectedUrls.some((url) => req.url.includes(url));
};

const protectedUrls = ['/dashboard', '/projects'];

export default withAuth(
  (req) => {
    if (isProtectedUrl(req, protectedUrls)) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      if (!req.nextauth.token.organizationId) {
        return NextResponse.redirect(new URL('/organization', req.url));
      }
    }
  },
  {
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized: ({ req, token }) => {
        if (isProtectedUrl(req, protectedUrls) && !token) {
          return false;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

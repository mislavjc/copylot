import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type UserId = string;

type ExtendedJWT = {
  id: string;
  organizationId: string | null | undefined;
};

declare module 'next-auth/jwt' {
  interface JWT extends Partial<ExtendedJWT> {
    id: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & ExtendedJWT;
  }
}

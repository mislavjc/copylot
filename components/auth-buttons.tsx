'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';

export const LoginButton = () => {
  return <Button onClick={() => signIn()}>Sign in</Button>;
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

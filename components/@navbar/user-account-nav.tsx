'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';

import { UserAvatar } from './user-avatar';

interface UserAccountNavProps {
  user: User;
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.name || null, image: user?.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
            {!user && (
              <p className="text-sm text-muted-foreground">
                You are not signed in.
              </p>
            )}
          </div>
        </div>
        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/projects">Projects</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            Sign out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signIn();
            }}
          >
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

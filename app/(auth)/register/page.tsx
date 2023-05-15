import Link from 'next/link';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/user-auth-form';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
};

export default function RegisterPage() {
  return (
    <div className="container grid flex-col items-center justify-center w-screen h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="w-6 h-6 mx-auto" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-sm text-center text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline hover:text-brand underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline hover:text-brand underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

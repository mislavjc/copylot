import Link from 'next/link';

import { Icons } from 'components/icons';
import { UserAuthForm } from 'components/user-auth-form';

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
};

const RegisterPage = () => {
  return (
    <div className="container grid h-screen w-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

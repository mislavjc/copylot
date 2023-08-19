import { getCurrentUser } from 'lib/auth';

import { Icons } from '../icons';

import { Links } from './links';
import { UserAccountNav } from './user-account-nav';

export interface NavConfig {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface NavbarProps {
  config: NavConfig[];
}

export const Navbar = async ({ config }: NavbarProps) => {
  const session = await getCurrentUser();

  return (
    <nav className="border p-4 pb-0">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center gap-6">
            <span className="flex gap-2 ">
              <Icons.logo className="self-center" />
              <span className="mr-2 self-center font-bold">Copylot</span>
            </span>
            <span className="ml-auto">
              <UserAccountNav user={session!} />
            </span>
          </div>
          <Links config={config} />
        </div>
      </div>
    </nav>
  );
};

import Link from 'next/link';

import { getCurrentUser } from 'lib/auth';

import { Icons } from '../icons';

import { MobileNavWrapper } from './mobile-nav';
import { UserAccountNav } from './user-account-nav';

export interface NavbarProps {
  config: Array<{
    title: string;
    href: string;
    disabled?: boolean;
  }>;
}

export const Navbar = async ({ config }: NavbarProps) => {
  const session = await getCurrentUser();

  return (
    <nav className="border p-4">
      <div className="mx-auto flex max-w-7xl">
        <div className="hidden justify-center gap-6 md:flex">
          <span className="flex gap-2 ">
            <Icons.logo className="self-center" />
            <span className="mr-2 self-center font-bold">Copylot</span>
          </span>
          {config.map((item) => {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center "
              >
                <span className="text-sm text-gray-400">{item.title}</span>
              </Link>
            );
          })}
        </div>
        <MobileNavWrapper config={config} />
        <span className="ml-auto">
          <UserAccountNav user={session!} />
        </span>
      </div>
    </nav>
  );
};

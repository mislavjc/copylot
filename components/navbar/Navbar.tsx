import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import { Icons } from '../icons';
import { MobileNavWrapper } from './MobileNav';
import { UserAccountNav } from './UserAccountNav';

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
    <nav className="px-5 py-5 border">
      <div className="flex mx-auto max-w-7xl">
        <div className="justify-center hidden gap-6 md:flex">
          <span className="flex gap-2 ">
            <Icons.logo className="self-center" />
            <span className="self-center mr-2 font-bold">Copylot</span>
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

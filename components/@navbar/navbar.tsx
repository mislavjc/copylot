import Image from 'next/image';
import Link from 'next/link';

import { getProjects } from 'lib/api/projects';
import { getCurrentUser } from 'lib/auth';
import { cn } from 'lib/utils';

import LogoSvg from 'public/icons/logo.svg';

import { Links, LinksConfig } from './links';
import { ProjectSelect } from './project-select';
import { UserAccountNav } from './user-account-nav';

export interface NavbarProps {
  config?: LinksConfig[];
  isDashboard?: boolean;
}

export const Navbar = async ({ config = [], isDashboard }: NavbarProps) => {
  const session = await getCurrentUser();
  const projects = await getProjects();

  return (
    <nav
      className={cn('border p-4', {
        'pb-0': config,
      })}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center gap-6">
            <span className="flex items-center gap-2">
              <Link href="/">
                <div className="h-8 w-8 self-center">
                  <Image src={LogoSvg} alt="Logo" />
                </div>
              </Link>
              {isDashboard ? (
                <ProjectSelect projects={projects} />
              ) : (
                <span className="mr-2 self-center font-bold">Copylot</span>
              )}
            </span>
            <span className="ml-auto">
              <UserAccountNav user={session!} />
            </span>
          </div>
          <Links config={config} isDashboard={isDashboard} />
        </div>
      </div>
    </nav>
  );
};

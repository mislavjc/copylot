import { ReactNode } from 'react';

import { DashboardNav } from '@/components/navbar/DashboardNav';
import { navbarConfig } from '@/config/navbar';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/db/prisma';
import { Navbar } from '@/components/navbar/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const getProjects = async () => {
  const user = await getCurrentUser();

  const projects = await prisma.project.findMany({
    where: {
      organizationId: user?.organizationId,
    },
  });

  return projects;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const projects = await getProjects();

  return (
    <div>
            {/* @ts-expect-error RSC */}
      <Navbar config={navbarConfig.mainNav} />
      <div className="flex gap-6 mx-auto my-6 max-w-7xl">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav config={navbarConfig.sidebarNav} projects={projects} />
        </aside>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

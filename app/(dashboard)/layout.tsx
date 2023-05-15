import { ReactNode } from 'react';

import { DashboardNav } from '@/components/@navbar/dashboard-nav';
import { navbarConfig } from '@/config/navbar';
import { getProjects } from '@/lib/projects';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const projects = await getProjects();

  return (
    <div>
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

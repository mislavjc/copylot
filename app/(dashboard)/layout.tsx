import { ReactNode } from 'react';
import { navbarConfig } from 'config/navbar';

import { DashboardNav } from 'components/@navbar/dashboard-nav';

import { getProjects } from 'lib/api/projects';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const projects = await getProjects();

  return (
    <div>
      <div className="mx-auto my-6 flex max-w-7xl gap-6">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav config={navbarConfig.sidebarNav} projects={projects} />
        </aside>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

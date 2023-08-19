import { ReactNode } from 'react';
import { navbarConfig } from 'config/navbar';

import { Navbar } from 'components/@navbar/navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Navbar config={navbarConfig.dashboardNav} isDashboard />
      <div className="mx-auto my-6 flex max-w-screen-lg gap-6">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

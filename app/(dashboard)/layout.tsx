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
      <main className="w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;

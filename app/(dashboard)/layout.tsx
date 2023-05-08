import { Navbar } from '@/components/navbar/Navbar';
import { navbarConfig } from '@/config/navbar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      {/* @ts-expect-error RSC */}
      <Navbar config={navbarConfig.mainNav} />
      {children}
    </div>
  );
};

export default DashboardLayout;

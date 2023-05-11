import { ReactNode } from 'react';

import { Navbar } from '@/components/navbar/Navbar';
import { navbarConfig } from '@/config/navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      {/* @ts-expect-error RSC */}
      <Navbar config={navbarConfig.mainNav} />
      <div>{children}</div>
    </div>
  );
};

export default NavLayout;

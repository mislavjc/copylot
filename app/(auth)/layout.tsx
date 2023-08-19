import { ReactNode } from 'react';

import { Navbar } from 'components/@navbar/navbar';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

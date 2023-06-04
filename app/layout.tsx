import './globals.css';

import { Inter } from 'next/font/google';

import { Navbar } from '@/components/@navbar/navbar';
import { navbarConfig } from '@/config/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Copylot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script defer src="/api/script"></script>
      </head>
      <body className={inter.className}>
        <Navbar config={navbarConfig.mainNav} />
        {children}
      </body>
    </html>
  );
}

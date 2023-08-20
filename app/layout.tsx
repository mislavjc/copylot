import { navbarConfig } from 'config/navbar';
import { Inter } from 'next/font/google';

import { Navbar } from 'components/@navbar/navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
        <script defer src="/script.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

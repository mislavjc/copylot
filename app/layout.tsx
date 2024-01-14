import { Inter } from 'next/font/google';
import PlausibleProvider from 'next-plausible';

import { Toaster } from 'ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Copylot.co – AI-Powered AB Testing & GDPR-Compliant Analytics',
  description:
    "Copylot.co is an innovative open-source platform designed for AB testing, AI-driven copy generation, and GDPR-compliant analytics. It seamlessly blends artificial intelligence with user experience testing, providing a comprehensive solution for optimizing website content and performance. Perfect for businesses seeking data privacy assurance and intelligent content strategies, Copylot.co empowers users with tools for ethical data analysis and impactful content creation. Elevate your digital presence with Copylot.co's cutting-edge technology.",
  keywords:
    'copywriting, ai content optimization, copy, marketing, copylot, copylot.co, gdpr compliant, gdpr analytics, privacy focused, split testing',
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
        <PlausibleProvider domain="copylot.co" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

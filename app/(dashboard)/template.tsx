'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from 'ui/button';

import { ExperimentDialog } from 'components/@experiments/experiments-table/dialog';

interface RouteInfo {
  title: string;
  action?: ReactNode;
}

interface Routes {
  [key: string]: RouteInfo;
}

const getRouteInfo = (route: string): RouteInfo | null => {
  const pathSegments = route.split('/');

  if (pathSegments.includes('experiments') && pathSegments.length === 5) {
    return {
      title: `Experiment`,
      action: (
        <Link href={`${route}/chat`}>
          <Button>Chat with experiment</Button>
        </Link>
      ),
    };
  }

  const path = pathSegments.pop();

  if (!path) {
    return null;
  }

  return routeMapping[path] || null;
};

const routeMapping: Routes = {
  dashboard: {
    title: 'Dashboard',
  },
  stats: {
    title: 'Stats',
  },
  settings: {
    title: 'Settings',
  },
  'prompt-library': {
    title: 'Prompt Library',
  },
  experiments: {
    title: 'Experiments',
    action: <ExperimentDialog />,
  },
  chat: {
    title: 'Chat',
  },
};

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const info = getRouteInfo(pathname);

  return (
    <div>
      <div className="border-b-[1px] bg-white p-8">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between">
          <h2 className="max-w-screen-lg text-2xl text-neutral-500">
            {info?.title}
          </h2>
          {info?.action}
        </div>
      </div>
      <div className="min-h-[calc(100vh-216px)] bg-gray-50">
        <div className="mx-auto max-w-screen-lg gap-6 px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;

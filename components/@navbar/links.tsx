'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Button } from 'ui/button';

import { cn } from 'lib/utils';

export interface LinksConfig {
  title: string;
  href: string;
  disabled?: boolean;
}

interface LinksProps {
  config: LinksConfig[];
  isDashboard?: boolean;
}

export const Links = ({ config, isDashboard }: LinksProps) => {
  const pathname = usePathname();
  const { project } = useParams();

  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto">
      {config.map((item) => {
        return (
          <Link
            key={item.title}
            href={isDashboard ? `/${project}${item.href}` : item.href}
            className={cn(
              'flex items-center pb-1',

              {
                'border-b-[1px] border-gray-950':
                  pathname ===
                  (isDashboard ? `/${project}${item.href}` : item.href),
              },
            )}
          >
            <Button
              className="whitespace-nowrap text-sm text-gray-700"
              variant="ghost"
            >
              {item.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

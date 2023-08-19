'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from 'ui/button';

import { cn } from 'lib/utils';

import { NavConfig } from './navbar';

interface LinksProps {
  config: NavConfig[];
}

export const Links = ({ config }: LinksProps) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {config.map((item) => {
        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'flex items-center pb-1',

              {
                'border-b-[1px] border-gray-950': pathname === item.href,
              },
            )}
          >
            <Button className="text-sm text-gray-700" variant="ghost">
              {item.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

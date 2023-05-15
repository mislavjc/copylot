'use client';

import { Project } from '@prisma/client/edge';
import Link from 'next/link';
import { useParams,usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

import { ProjectSelect } from './project-select';

interface DashboardNavProps {
  config: Array<{
    title: string;
    href: string;
    icon?: keyof typeof Icons;
    disabled?: boolean;
  }>;
  projects: Project[];
}

export function DashboardNav({ config, projects }: DashboardNavProps) {
  const path = usePathname();
  const { project } = useParams();

  if (!config?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <ProjectSelect projects={projects} />
      {config.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? '/' : `/${project}${item.href}`}
            >
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

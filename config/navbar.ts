import { Icons } from '@/components/icons';

interface BaseNav {
  title: string;
  href: string;
  disabled?: boolean;
}

interface SidebarNav extends BaseNav {
  icon: keyof typeof Icons;
}

interface NavbarConfig {
  mainNav: BaseNav[];
  sidebarNav: SidebarNav[];
}

export const navbarConfig: NavbarConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Experiments',
      href: '/dashboard',
      icon: 'experiments',
    },
    {
      title: 'Datasets',
      href: '/dashboard/datasets',
      icon: 'page',
    },
    {
      title: 'Members',
      href: '/dashboard/settings',
      icon: 'users',
    },
    {
      title: 'Prompt library',
      href: '/dashboard/prompt-library',
      icon: 'library',
    },
    {
      title: 'Stats',
      href: '/dashboard/stats',
      icon: 'stats',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};

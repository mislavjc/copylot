import { Icons } from 'components/icons';

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
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Settings',
      href: '/settings',
    },
  ],
  sidebarNav: [
    {
      title: 'Experiments',
      href: '/dashboard/experiments',
      icon: 'experiments',
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

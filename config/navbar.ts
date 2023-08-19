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
  projectsNav: BaseNav[];
  dashboardNav: SidebarNav[];
}

export const navbarConfig: NavbarConfig = {
  projectsNav: [
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Settings',
      href: '/settings',
    },
  ],
  dashboardNav: [
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

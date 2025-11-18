import { RectangleStackIcon, CubeIcon, Squares2X2Icon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

export interface NavigationItem {
  title: string;
  href: string;
  icon: typeof RectangleStackIcon;
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: RectangleStackIcon,
    description: 'Manage your projects',
  },
  {
    title: 'Planograms',
    href: '/dashboard/planograms',
    icon: Squares2X2Icon,
    description: 'View planograms',
  },
  {
    title: 'Displays',
    href: '/dashboard/displays',
    icon: CubeIcon,
    description: 'Browse display catalog',
  },
  {
    title: 'Stores',
    href: '/dashboard/stores',
    icon: BuildingStorefrontIcon,
    description: 'Manage stores',
  },
];

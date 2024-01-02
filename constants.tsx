import { SideNavItem } from '@/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <div>Icono Home</div>,
    isLogout: false
  },
  {
    title: 'Periods',
    path: '/periods',
    icon: <div>Icono Periods</div>,
    isLogout: false
  },
  {
    title: 'Logout',
    path: '',
    icon: <div>Icono Logout</div>,
    isLogout: true
  }
];

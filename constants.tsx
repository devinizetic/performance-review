import { SideNavItem } from '@/types/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <div>Icono Home</div>,
    isLogout: false
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <div>Icono Dashboard</div>,
    isLogout: false
  },
  {
    title: 'Mi Evaluación',
    path: '/my-review',
    icon: <div>Icono review</div>,
    isLogout: false
  },
  {
    title: 'Mis Evaluados',
    path: '/reviewees',
    icon: <div>Icono reviewees</div>,
    isLogout: false
  },
  {
    title: 'Logout',
    path: '',
    icon: <div>Icono Logout</div>,
    isLogout: true
  }
];

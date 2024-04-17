import { SideNavItem } from '@/types/types';

export const REVIEWEE_ROLE_ID = 'f7bd405b-ff62-47a5-812c-c6058781b2e1';
export const REVIEWER_ROLE_ID = '34a62928-ecab-477d-bb50-210e2e2ff15e';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <div>Icono Home</div>,
    isLogout: false
  },
  /* {
    title: 'dashboard',
    path: '/dashboard',
    icon: <div>Icono Dashboard</div>,
    isLogout: false
  }, */
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

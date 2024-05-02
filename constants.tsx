import { SideNavItem } from '@/types/types';

export const REVIEWEE_ROLE_ID = 'f7bd405b-ff62-47a5-812c-c6058781b2e1';
export const REVIEWER_ROLE_ID = '34a62928-ecab-477d-bb50-210e2e2ff15e';
export const ADMIN_ROLE_ID = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Inicio',
    path: '/',
    icon: <div>Icono Home</div>,
    roles: [REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID, ADMIN_ROLE_ID],
    isLogout: false
  },
  {
    title: 'Mi Evaluación',
    path: '/my-review',
    icon: <div>Icono review</div>,
    roles: [REVIEWEE_ROLE_ID],
    isLogout: false
  },
  {
    title: 'Mis Evaluados',
    path: '/reviewees',
    icon: <div>Icono reviewees</div>,
    roles: [REVIEWER_ROLE_ID],
    isLogout: false,
    highlightAlso: '/feedback'
  },
  {
    title: 'Evaluacion Actual',
    path: '/current-review',
    icon: <div>Icono current review</div>,
    roles: [ADMIN_ROLE_ID],
    isLogout: false
  },
  {
    title: 'Resultados',
    path: '/feedback-results  ',
    icon: <div>Icono feedback result</div>,
    roles: [ADMIN_ROLE_ID],
    isLogout: false
  },
  {
    title: 'Salir',
    path: '/logout',
    icon: <div>Icono Logout</div>,
    roles: [REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID, ADMIN_ROLE_ID],
    isLogout: true
  }
];

import { SideNavItem } from '@/types/types';
import { ClipboardCheck, User, FileSpreadsheet } from 'lucide-react';

export const REVIEWEE_ROLE_ID = 'f7bd405b-ff62-47a5-812c-c6058781b2e1';
export const REVIEWER_ROLE_ID = '34a62928-ecab-477d-bb50-210e2e2ff15e';
export const ADMIN_ROLE_ID = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Mi Evaluación',
    path: '/my-review',
    icon: <ClipboardCheck className="w-6 h-6" />,
    roles: [REVIEWEE_ROLE_ID],
    isLogout: false
  },
  {
    title: 'Mis Evaluados',
    path: '/reviewees',
    icon: <User className="w-6 h-6" />,
    roles: [REVIEWER_ROLE_ID],
    isLogout: false,
    highlightAlso: '/feedback'
  },
  {
    title: 'Evaluaciones',
    path: '/reviews',
    icon: <FileSpreadsheet className="w-6 h-6" />,
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

export const COMPLETED_IMAGES: string[] = [
  'completed-1.png',
  'completed-2.gif',
  'completed-3.gif',
  'completed-4.gif',
  'completed-5.gif'
];

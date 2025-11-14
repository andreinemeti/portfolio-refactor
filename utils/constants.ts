export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  PROJECTS: '/projects',
  CONTACT: '/contact',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Services', href: ROUTES.SERVICES },
  { label: 'Projects', href: ROUTES.PROJECTS },
  { label: 'Contact', href: ROUTES.CONTACT },
];
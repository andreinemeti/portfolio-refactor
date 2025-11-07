// components/Nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <ul className="nav__list" role="menubar" aria-label="Primary">
        {links.map(({ label, href }) => {
          const active =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/');

          return (
            <li key={href} role="none">
              <Link
                href={href}
                className={`nav__link ${active ? 'is-active' : ''}`}
                role="menuitem"
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// components/Nav.tsx
'use client';
// TODO: FIX NAV ANIMATIONS - THEY SUCK
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '../utils/constants';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <ul className="nav__list" role="menubar" aria-label="Primary">
        {NAV_LINKS.map(({ label, href }) => {
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

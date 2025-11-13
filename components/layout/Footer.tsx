// components/Footer.tsx
'use client';
// TODO: FIX FOOTER ANIMATIONS - THEY SUCK
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '../../utils/constants';
import ShatterTitle from '../fx/ShatterTitle';

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glass" role="contentinfo">
      <nav aria-label="Footer">
        <ul className="footer-glass__links">
          {NAV_LINKS.map(({ label, href }) => {
            const active =
              href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link className={`footer-glass__link ${active ? 'is-active' : ''}`} href={href}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="footer-glass__copy">
        <ShatterTitle
          as="p"
          radius={150}
          maxOffset={20}
          maxRotate={12}
          popScale={1.07}
        >
          © {year} Andrei Nemeti. All rights reserved.
        </ShatterTitle>
      </div>
    </footer>
  );
}

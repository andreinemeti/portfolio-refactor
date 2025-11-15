// components/Footer.tsx
'use client';
// TODO: FIX FOOTER ANIMATIONS - THEY SUCK
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '../../utils/constants';
import ShatterTitle from '../fx/ShatterTitle';
import type { Theme } from '@/app/layout';
import { useEffect, useState } from 'react';


type FooterProps = {
  initialTheme: Theme;
};

export default function Footer({ initialTheme }: FooterProps) {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const applyTheme = (next: Theme) => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('light-mode', next === 'light');
    document.cookie = `portfolio-theme=${next}; path=/; max-age=31536000`;
  };

 useEffect(() => {
    // optional: re-read from cookie, or just trust initialTheme
    applyTheme(initialTheme);
  }, [initialTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value === 'light' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <footer className="footer-glass" role="contentinfo">
      
        <nav aria-label="Footer">
          <ul className="footer-glass__links">
            {NAV_LINKS.map(({ label, href }) => {
              const active =
                href === '/'
                  ? pathname === '/'
                  : pathname === href || pathname.startsWith(href + '/');

              return (
                <li key={href}>
                  <Link
                    className={`footer-glass__link ${
                      active ? 'is-active' : ''
                    }`}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

          {/* Theme dropdown, near Contact link */}
        <div className="footer-glass__theme">
          <label
            htmlFor="footer-theme"
            className="footer-glass__theme-label"
          >
            Appearance
          </label>
          <select
            id="footer-theme"
            className="footer-glass__theme-select"
            value={theme}
            onChange={handleChange}
          >
            <option value="dark">Dark theme</option>
            <option value="light">Light theme</option>
          </select>
        </div>

      
    

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

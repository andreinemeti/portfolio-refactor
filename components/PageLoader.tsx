// app/components/PageLoader.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/utils/hooks';

const DURATION = 1000; // ~1s
const GAGS = [
  'Assembling pixels...',
  'Deleting unused semicolons…',
  'Summoning ducks → Quack 🦆',
  'Optimizing imaginary performance…',
  'Centering divs with display:flex',
];

function slugToTitle(slug: string) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, m => m.toUpperCase());
}

export default function PageLoader() {
  const pathname = usePathname();
  const search = useSearchParams();
  const routeKey = pathname + (search?.toString() ?? '');

  // read projects from your redux slice
  const { current, list } = useAppSelector(s => s.projects);

  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState(GAGS[0]);

  const prefersReduce = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const STATIC_TITLES: Record<string, string> = {
  '/': 'Welcome',
  '/projects': 'All Projects',
  '/services': 'Services',
  '/contact': 'Contact',
};

function titleize(s: string) {
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, m => m.toUpperCase());
}

function stripLocale(path: string) {
  // If you use locales like /en/... or /ro/..., strip the first segment.
  const segs = path.split('/').filter(Boolean);
  if (segs.length && /^[a-z]{2}$/i.test(segs[0])) segs.shift();
  return '/' + segs.join('/');
}

  // Decide message for this route
  const routeMessage = useMemo(() => {
  if (!pathname) return null;

  // normalize locales, trailing slashes
  const cleanPath = stripLocale(pathname.replace(/\/+$/,'') || '/');

  // direct matches first
  if (STATIC_TITLES[cleanPath]) return STATIC_TITLES[cleanPath];

  // project detail: /project/[slug]
  if (cleanPath.startsWith('/project/')) {
    const slug = decodeURIComponent(cleanPath.split('/').pop() || '');
    const byList = list?.find(p => p.slug === slug);
    if (byList?.name) return byList.name;
    if (current?.slug === slug && current?.name) return current.name;
    return titleize(slug);
  }

  // generic fallback: prettify the last segment(s)
  const segs = cleanPath.split('/').filter(Boolean);
  if (segs.length === 0) return STATIC_TITLES['/']; // '/'
  // Join deeper paths nicely: "Services / Web" etc.
  return segs.map(titleize).join(' / ');
}, [pathname, list, current]);

  useEffect(() => {
    // prefer route-derived title; otherwise pick a fun gag
    setMsg(routeMessage || GAGS[Math.floor(Math.random() * GAGS.length)]);
    setShow(true);
    const t = setTimeout(() => setShow(false), DURATION);
    return () => clearTimeout(t);
  }, [routeKey, routeMessage]);

  if (prefersReduce) return null;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={routeKey}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0a0a0a',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', scale: 0.98 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
            exit={{ scale: 1.06, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              padding: '14px 18px',
              borderRadius: 12,
              background: '#ffb546',
              color: '#000',
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 0.2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            {msg}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

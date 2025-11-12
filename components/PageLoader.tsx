// app/components/PageLoader.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/utils/hooks';

const DURATION = 1100;
const GAGS = [
  'Assembling pixels...',
  'Deleting unused semicolons…',
  'Summoning ducks → Quack 🦆',
  'Optimizing imaginary performance…',
  'Centering divs with display:flex',
];

const STATIC_TITLES: Record<string, string> = {
  '/': 'Welcome',
  '/projects': 'All Projects',
  '/services': 'Services',
  '/contact': 'Contact',
};

function titleize(s: string) {
  return s.replace(/[-_]+/g, ' ').replace(/\b\w/g, m => m.toUpperCase());
}
function stripLocale(path: string) {
  const segs = path.split('/').filter(Boolean);
  if (segs.length && /^[a-z]{2}$/i.test(segs[0])) segs.shift();
  return '/' + segs.join('/');
}

export default function PageLoader() {
  const pathname = usePathname();
  const search = useSearchParams();
  const routeKey = pathname + (search?.toString() ?? '');

  const { current, list } = useAppSelector(s => s.projects);

  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState(GAGS[0]);

  const prefersReduce = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const routeMessage = useMemo(() => {
    if (!pathname) return null;
    const cleanPath = stripLocale(pathname.replace(/\/+$/, '') || '/');
    if (STATIC_TITLES[cleanPath]) return STATIC_TITLES[cleanPath];

    if (cleanPath.startsWith('/project/')) {
      const slug = decodeURIComponent(cleanPath.split('/').pop() || '');
      const byList = list?.find(p => p.slug === slug);
      if (byList?.name) return byList.name;
      if (current?.slug === slug && current?.name) return current.name;
      return titleize(slug);
    }

    const segs = cleanPath.split('/').filter(Boolean);
    if (segs.length === 0) return STATIC_TITLES['/'];
    return segs.map(titleize).join(' / ');
  }, [pathname, list, current]);

  // Pick message + show loader on route change
  useEffect(() => {
    setMsg(routeMessage || GAGS[Math.floor(Math.random() * GAGS.length)]);
    setShow(true);

    // Re-enable the auto-hide if you want ~1.1s overlays
    const t = setTimeout(() => setShow(false), DURATION);
    return () => clearTimeout(t);
  }, [routeKey, routeMessage]);

  //  Scroll lock while the loader is visible
  const scrollRef = useRef(0);
  useEffect(() => {
    if (!show) return;
    const { documentElement: html, body } = document;

    // remember current scroll
    scrollRef.current = window.scrollY || window.pageYOffset;

    // lock
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');

    // iOS-safe body freeze
    body.style.position = 'fixed';
    body.style.top = `-${scrollRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overscrollBehavior = 'none';
    html.style.overscrollBehavior = 'none';

    return () => {
      // unlock
      html.classList.remove('no-scroll');
      body.classList.remove('no-scroll');

      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overscrollBehavior = '';
      html.style.overscrollBehavior = '';

      // restore scroll
      window.scrollTo(0, scrollRef.current);
    };
  }, [show]);

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
            overflow: 'hidden',
          }}
          aria-live="polite"
          aria-busy="true"
        >
          <Aurora />

          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              paddingInline: 24,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)', scale: 0.985 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                margin: 0,
                lineHeight: 1.05,
                fontWeight: 900,
                fontSize: 'clamp(36px, 6.2vw, 88px)',
                letterSpacing: '-0.02em',
                background:
                  'linear-gradient(92deg, #ffffff 0%, #ffe9c6 40%, #ffb546 65%, #ffd59a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 0 rgba(0,0,0,0)',
              }}
            >
              {msg}
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0, x: '-50%' }}
              animate={{ width: '60vw', opacity: 1, x: '-50%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '-18px',
                height: 3,
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, rgba(255,181,70,0) 0%, rgba(255,181,70,1) 20%, rgba(255,181,70,1) 80%, rgba(255,181,70,0) 100%)',
                boxShadow: '0 0 24px rgba(255,181,70,0.45)',
              }}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                right: '14%',
                top: '-16px',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#ffb546',
                filter: 'blur(1px)',
                boxShadow:
                  '0 0 12px rgba(255,181,70,0.8), 0 0 36px rgba(255,181,70,0.6)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Aurora() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '60vmax',
          height: '60vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(255,181,70,0.45), rgba(255,181,70,0) 70%)',
          top: '-10vmax',
          left: '-10vmax',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '55vmax',
          height: '55vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(109,205,255,0.35), rgba(109,205,255,0) 70%)',
          bottom: '-12vmax',
          right: '-8vmax',
          filter: 'blur(34px)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}

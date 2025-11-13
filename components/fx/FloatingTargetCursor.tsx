// app/components/FloatingTargetCursor.tsx
'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type Props = {
 activeAttr?: string;
  size?: number;
  activeSize?: number;
  within?: string;
  ringText?: string;
  ringDuration?: number;
  /** Disable on touch/coarse pointers (mobile/tablet). Default: true */
  disableOnCoarsePointer?: boolean;
  /** Optional extra guard: only enable at/above this width (px). */
  minWidth?: number;
};

export default function FloatingTargetCursor({
  activeAttr = '[data-cursor="target"]',
  size = 24,
  activeSize = 160,
  within,
  ringText = 'SEE MORE • ',
  ringDuration = 8,
  disableOnCoarsePointer = true,
  minWidth,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.6 });

  const [diameter, setDiameter] = useState(size);
  const [active, setActive] = useState(false);     // <-- only true over a card
  const [images, setImages] = useState<string[]>([]);
  const ring = useMemo(() => new Array(20).fill(ringText).join(''), [ringText]);
  const [enabled, setEnabled] = useState(false);
   useEffect(() => {
    const check = () => {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const widthOK = typeof minWidth === 'number' ? window.innerWidth >= minWidth : true;
      setEnabled(disableOnCoarsePointer ? (fine && widthOK) : widthOK);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [disableOnCoarsePointer, minWidth]);

  // Respect prefers-reduced-motion as well (optional)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (m.matches) setEnabled(false);
  }, []);

  

  useEffect(() => {
    const area: HTMLElement | Document = within
      ? (document.querySelector(within) as HTMLElement | null) ?? document
      : document;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onAreaLeave = () => {
      setActive(false);
      setImages([]);
      setDiameter(size);
    };

    const findTarget = (evt: Event): Element | null => {
      const tgt = evt.target as unknown;
      if (tgt instanceof Element) {
        const viaClosest = tgt.closest?.(activeAttr);
        if (viaClosest) return viaClosest;
      }
      // composedPath fallback (text nodes / SVG)
      // @ts-ignore
      const path: EventTarget[] = evt.composedPath?.() ?? [];
      for (const n of path) {
        if (n instanceof Element && n.matches?.(activeAttr)) return n;
      }
      return null;
    };

    const onEnterCapture = (e: Event) => {
      const el = findTarget(e);
      if (!el) return;
      setActive(true);
      setDiameter(activeSize);

      const raw = el.getAttribute('data-cursor-images') ?? '';
      const imgs = raw.split(/[\|,]/).map(s => s.trim()).filter(Boolean);
      setImages(imgs);
    };

    const onLeaveCapture = (e: Event) => {
      const el = findTarget(e);
      if (!el) return;
      setActive(false);
      setDiameter(size);
      setImages([]);
    };

    area.addEventListener('pointermove', onMove as any);
    (area as any).addEventListener?.('pointerleave', onAreaLeave);

    document.addEventListener('pointerenter', onEnterCapture, true);
    document.addEventListener('pointerleave', onLeaveCapture, true);

    return () => {
      area.removeEventListener('pointermove', onMove as any);
      (area as any).removeEventListener?.('pointerleave', onAreaLeave);
      document.removeEventListener('pointerenter', onEnterCapture, true);
      document.removeEventListener('pointerleave', onLeaveCapture, true);
    };
  }, [activeAttr, within, x, y, size, activeSize]);

  // cycle images while active
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active || images.length === 0) return;
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 1200);
    return () => clearInterval(id);
  }, [active, images.length]);

  const currentImage = active && images.length ? images[idx] : undefined;

  if (!enabled) return null; // <-- do not render the cursor at all on mobile

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: sx,
        y: sy,
        width: diameter,
        height: diameter,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: active ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
    >
      {/* image fill */}
      {currentImage && (
        <motion.img
          key={currentImage}
          src={currentImage}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', borderRadius: '9999px'
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* border ring */}
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '9999px',
          border: '2px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.35) inset',
          
          mixBlendMode: 'difference',
        }}
      />

  {/* rotating SEE MORE ring – solid white donut, no gaps */}
<motion.svg
  viewBox="0 0 100 100"
  style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%' }}
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, ease: 'linear', duration: ringDuration }}
>
  {/*
    Tune these numbers if you change font size.
    rOuter close to 49 fills to the edge; rInner sets thickness.
  */}
  <defs>
    <mask id="ring-mask-tight">
      <rect x="0" y="0" width="100" height="100" fill="black" />
      <circle cx="50" cy="50" r="49" fill="white" />   {/* outer edge: almost the SVG edge */}
      <circle cx="50" cy="50" r="33" fill="black" />   {/* inner hole: controls thickness */}
    </mask>

    {/* text path at the midpoint between rOuter and rInner */}
    <path id="ring-path-tight" d="
      M 50,50
      m -41,0
      a 41,41 0 1,1 82,0
      a 41,41 0 1,1 -82,0
    " />
  </defs>

  {/* solid white donut fills to the circle edge */}
  <rect x="0" y="0" width="100" height="100" fill="white" mask="url(#ring-mask-tight)" />

  {/* Optional faint outline of the donut (very subtle) */}
  <circle cx="50" cy="50" r="49" fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="0.6" />
  <circle cx="50" cy="50" r="33" fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="0.6" />

  {/* Black text on top, with a small white stroke to kill any micro-gaps on retina */}
  <text
    fill="black"
    stroke="white"
    strokeWidth={0.8}                 // increase to 1.0–1.4 if you still see a hairline gap
    style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1, paintOrder: 'stroke' }}
  >
    <textPath href="#ring-path-tight" startOffset="0%">{ring}</textPath>
  </text>
</motion.svg>

    </motion.div>
  );
}

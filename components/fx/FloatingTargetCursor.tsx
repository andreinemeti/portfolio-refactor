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
  const [active, setActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const ring = useMemo(() => new Array(20).fill(ringText).join(''), [ringText]);
  const [enabled, setEnabled] = useState(false);

  // 🔹 Detect light/dark based on body.light-mode
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const updateThemeFlag = () => {
      setIsLight(document.body.classList.contains('light-mode'));
    };

    updateThemeFlag();

    // Watch body class changes so the cursor updates when theme changes
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          updateThemeFlag();
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const check = () => {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const widthOK =
        typeof minWidth === 'number' ? window.innerWidth >= minWidth : true;
      setEnabled(disableOnCoarsePointer ? fine && widthOK : widthOK);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [disableOnCoarsePointer, minWidth]);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (m.matches) setEnabled(false);
  }, []);

  useEffect(() => {
    const area: HTMLElement | Document =
      within ? (document.querySelector(within) as HTMLElement | null) ?? document : document;

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
      // composedPath fallback
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
      const imgs = raw
        .split(/[\|,]/)
        .map((s) => s.trim())
        .filter(Boolean);
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

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active || images.length === 0) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 1200);
    return () => clearInterval(id);
  }, [active, images.length]);

  const currentImage = active && images.length ? images[idx] : undefined;

  if (!enabled) return null;

  //  Theme-aware colors
  const ringBorderColor = isLight
    ? 'rgba(0, 0, 0, 0.85)'
    : 'rgba(255, 255, 255, 0.95)';

  const donutFill = isLight ? '#000000' : '#ffffff';
  const donutStroke = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.35)';

  const textFill = isLight ? '#ffffff' : '#000000';
  const textStroke = isLight ? '#000000' : '#ffffff';

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
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '9999px',
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* border ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '9999px',
          border: `2px solid ${ringBorderColor}`,
          boxShadow: `0 0 0 1px ${donutStroke} inset`,
          mixBlendMode: isLight ? 'normal' : 'difference',
        }}
      />

      {/* rotating SEE MORE ring */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: ringDuration }}
      >
        <defs>
          <mask id="ring-mask-tight">
            <rect x="0" y="0" width="100" height="100" fill="black" />
            <circle cx="50" cy="50" r="49" fill="white" />
            <circle cx="50" cy="50" r="33" fill="black" />
          </mask>

          <path
            id="ring-path-tight"
            d="
              M 50,50
              m -41,0
              a 41,41 0 1,1 82,0
              a 41,41 0 1,1 -82,0
            "
          />
        </defs>

        {/* donut background */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill={donutFill}
          mask="url(#ring-mask-tight)"
        />

        {/* subtle outlines */}
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke={donutStroke}
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="33"
          fill="none"
          stroke={donutStroke}
          strokeWidth="0.6"
        />

        {/* text */}
        <text
          fill={textFill}
          stroke={textStroke}
          strokeWidth={0.8}
          style={{
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: 1,
            paintOrder: 'stroke',
          }}
        >
          <textPath href="#ring-path-tight" startOffset="0%">
            {ring}
          </textPath>
        </text>
      </motion.svg>
    </motion.div>
  );
}

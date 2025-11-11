// components/ShatterTitle.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

type Props = {
  children: string;                 // your title text
  as?: keyof JSX.IntrinsicElements; // h1 | h2 | span...
  className?: string;
  /** maximum explode radius in px where effect is active */
  radius?: number;                  // default 140
  /** how far a letter can travel at the center hit (px) */
  maxOffset?: number;               // default 18
  /** max rotation (deg) at center hit */
  maxRotate?: number;               // default 10
  /** z-pop (via text-shadow scale) feel */
  popScale?: number;                // default 1.06
  /** disable on coarse pointers (mobile/tablet) */
  disableOnCoarsePointer?: boolean; // default true
};

export default function ShatterTitle({
  children,
  as: Tag = 'h1',
  className,
  radius = 140,
  maxOffset = 18,
  maxRotate = 10,
  popScale = 1.06,
  disableOnCoarsePointer = true,
}: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!disableOnCoarsePointer) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine);
  }, [disableOnCoarsePointer]);

  const tokens = useMemo(
    () => children.split(''), // per-char, preserve spaces too
    [children]
  );

  // per-letter target transforms managed in parent; springs live in child
  const [targets, setTargets] = useState(
    () => tokens.map(() => ({ x: 0, y: 0, r: 0, s: 1 }))
  );

  // helper: compute effect falloff (0..1)
  const falloff = (d: number) => {
    if (d >= radius) return 0;
    const t = 1 - d / radius;
    // smoother curve
    return t * t;
  };

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      // compute once, then reuse
      const next = targets.slice();

      for (let i = 0; i < charRefs.current.length; i++) {
        const el = charRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = cx - clientX;
        const dy = cy - clientY;
        const d = Math.hypot(dx, dy);
        const f = falloff(d); // 0..1

        if (f === 0) {
          next[i] = { x: 0, y: 0, r: 0, s: 1 };
        } else {
          // push away from cursor, scaled by falloff
          const nx = (dx / (d || 1)) * maxOffset * f;
          const ny = (dy / (d || 1)) * maxOffset * f;
          // rotate slightly depending on vector (gives nice swirl)
          const rot = ((dx - dy) / (radius || 1)) * maxRotate * f;
          const sc = 1 + (popScale - 1) * f;

          next[i] = { x: nx, y: ny, r: rot, s: sc };
        }
      }

      setTargets(next);
    },
    [maxOffset, maxRotate, popScale, radius, targets]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      updateFromPointer(e.clientX, e.clientY);
    },
    [enabled, updateFromPointer]
  );

  const onPointerLeave = useCallback(() => {
    // spring everything back to zero
    setTargets(tokens.map(() => ({ x: 0, y: 0, r: 0, s: 1 })));
  }, [tokens]);

  return (
    <Tag className={className} style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          cursor: enabled ? 'default' : 'auto',
          userSelect: 'none',
          willChange: 'transform',
          perspective: 800,
          // a touch of letter spacing helps readability when moving
          letterSpacing: '0.01em',
        }}
      >
        {tokens.map((ch, i) => (
          <Char
            key={`${ch}-${i}`}
            refCb={(el) => (charRefs.current[i] = el)}
            ch={ch}
            target={targets[i]}
            reduce={reduce}
          />
        ))}
      </div>
    </Tag>
  );
}

function Char({
  ch,
  target,
  reduce,
  refCb,
}: {
  ch: string;
  target: { x: number; y: number; r: number; s: number };
  reduce: boolean;
  refCb: (el: HTMLSpanElement | null) => void;
}) {
  // springs per letter (safe: each Char is its own component)
  const sx = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
  const sr = useSpring(0, { stiffness: 300, damping: 30, mass: 0.7 });
  const ss = useSpring(1, { stiffness: 250, damping: 26, mass: 0.7 });

  useEffect(() => {
    if (reduce) {
      sx.set(0); sy.set(0); sr.set(0); ss.set(1);
      return;
    }
    sx.set(target.x);
    sy.set(target.y);
    sr.set(target.r);
    ss.set(target.s);
  }, [target.x, target.y, target.r, target.s, reduce, sx, sy, sr, ss]);

  const isSpace = ch === ' ';

  return (
    <span
      ref={refCb}
      aria-hidden={isSpace ? true : undefined}
      style={{
        display: 'inline-block',
        whiteSpace: isSpace ? 'pre' : 'normal',
        // keeping separate wrapper to allow overflow-hidden masking
        overflow: 'visible',
      }}
    >
      <motion.span
        style={{
          display: 'inline-block',
          translateX: sx,
          translateY: sy,
          rotate: sr,
          // faux 3D “pop” via scale + fancy shadow
          scale: ss,
          willChange: 'transform, filter',
          textShadow:
            '0 0.5px 0 rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.25)',
        }}
        transition={{ type: 'spring' }}
      >
        {isSpace ? '\u00A0' : ch}
      </motion.span>
    </span>
  );
}

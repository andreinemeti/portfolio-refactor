// components/ShatterTitle.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

type Props = {
  children: React.ReactNode;          // <— accept ReactNode, not just string
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  radius?: number;
  maxOffset?: number;
  maxRotate?: number;
  popScale?: number;
  disableOnCoarsePointer?: boolean;
};

// Flatten ReactNode -> string (recursively)
function nodeToText(node: React.ReactNode): string {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(n => nodeToText(n)).join('');
  if (React.isValidElement(node)) return nodeToText(node.props?.children);
  return '';
}

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
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!disableOnCoarsePointer) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine);
  }, [disableOnCoarsePointer]);

  // Convert any ReactNode children into plain text for per-char animation
  const text = useMemo(() => nodeToText(children), [children]);

  // If we can’t get text, just render the children as-is (no effect)
  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  const ZERO = { x: 0, y: 0, r: 0, s: 1 };


  // Use Array.from() so emojis/graphemes don’t split incorrectly
  const tokens = useMemo(() => Array.from(text), [text]);

  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [targets, setTargets] = useState(
    () => tokens.map(() => ({ x: 0, y: 0, r: 0, s: 1 }))
  );

  const falloff = (d: number) => {
    if (d >= radius) return 0;
    const t = 1 - d / radius;
    return t * t;
  };

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
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
      const f = falloff(d);

      if (f === 0) next[i] = { x: 0, y: 0, r: 0, s: 1 };
      else {
        const nx = (dx / (d || 1)) * maxOffset * f;
        const ny = (dy / (d || 1)) * maxOffset * f;
        const rot = ((dx - dy) / (radius || 1)) * maxRotate * f;
        const sc = 1 + (popScale - 1) * f;
        next[i] = { x: nx, y: ny, r: rot, s: sc };
      }
    }
    setTargets(next);
  }, [maxOffset, maxRotate, popScale, radius, targets]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!enabled) return;
    updateFromPointer(e.clientX, e.clientY);
  }, [enabled, updateFromPointer]);

  const onPointerLeave = useCallback(() => {
    setTargets(tokens.map(() => ({ x: 0, y: 0, r: 0, s: 1 })));
  }, [tokens]);


  // Keep targets array length in sync with tokens
useEffect(() => {
  setTargets(prev => {
    if (prev.length === tokens.length) return prev;
    const next = new Array(tokens.length).fill(0).map((_, i) => prev[i] ?? ZERO);
    return next;
  });
}, [tokens.length]);

  return (
    <Tag className={className} style={{ position: 'relative' }}>
      <span
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          display: 'inline-flex',
          flexWrap: 'nowrap',
          cursor: enabled ? 'default' : 'auto',
          userSelect: 'none',
          willChange: 'transform',
          perspective: 800,
          letterSpacing: '0.01em',
        }}
      >
      {tokens.map((ch, i) => (
  <Char
    key={`${ch}-${i}`}
    refCb={(el) => (charRefs.current[i] = el)}
    ch={ch}
    target={targets[i] ?? ZERO}   // <— safe fallback
    reduce={reduce}
  />
))}
      </span>
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
      style={{ display: 'inline-block', whiteSpace: isSpace ? 'pre' : 'normal' }}
    >
      <motion.span
        style={{
          display: 'inline-block',
          translateX: sx,
          translateY: sy,
          rotate: sr,
          scale: ss,
          willChange: 'transform, filter',
          textShadow: '0 0.5px 0 rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.25)',
        }}
        transition={{ type: 'spring' }}
      >
        {isSpace ? '\u00A0' : ch}
      </motion.span>
    </span>
  );
}

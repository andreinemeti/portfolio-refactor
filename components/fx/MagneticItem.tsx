// app/components/MagneticItem.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PropsWithChildren, useCallback } from 'react';

type Props = {
  radius?: number;   // px of influence from the center
  strength?: number; // 0..1 how much to move
  tilt?: number;     // deg max tilt
  className?: string;
};

export default function MagneticItem({
  children,
  radius = 80,
  strength = 0.25,
  tilt = 4,
  className,
}: PropsWithChildren<Props>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const tx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ty = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  // Derive rotations from the spring values
  const rotateX = useTransform(ty, (v) => (-v / (radius * strength || 1)) * tilt);
  const rotateY = useTransform(tx, (v) => ( v / (radius * strength || 1)) * tilt);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    tx.set((mx - cx) * strength);
    ty.set((my - cy) * strength);
  }, [tx, ty, strength]);

  const onLeave = useCallback(() => {
    tx.set(0);
    ty.set(0);
  }, [tx, ty]);

  return (
    <motion.div
      className={className}
      style={{
        transformPerspective: 600,
        translateX: tx,
        translateY: ty,
        rotateX,
        rotateY,
        willChange: 'transform',
      } as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

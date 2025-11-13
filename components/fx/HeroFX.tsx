// components/HeroFX.tsx
'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroFX() {
    // Spotlight follows cursor
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.6 });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, [mx, my]);

    return (
        <div aria-hidden className="hero-fx">
            {/* Aurora blobs */}
            <motion.span
                className="hero-fx__blob hero-fx__blob--a"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.75, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.span
                className="hero-fx__blob hero-fx__blob--b"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.65, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            />

            {/* Soft spotlight that “reveals” color */}
            <motion.span
                className="hero-fx__spot"
                style={{
                    left: sx,
                    top: sy,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />
        </div>
    );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  poster?: string;
  webmSrc: string;
  mp4Src: string;
  className?: string;
};

export default function HeroVideo({ poster = '/images/hero-poster.jpg', webmSrc, mp4Src, className }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Try to kick autoplay if needed
    const play = async () => {
      try { await v.play(); } catch {}
    };
    const onCanPlay = () => { setReady(true); play(); };

    v.addEventListener('canplay', onCanPlay, { once: true });
    play(); // attempt immediately for browsers that allow it
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <>
      <video
        ref={ref}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        // iOS hint to avoid fullscreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* Gentle fade overlay once ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,11,.65) 0%, rgba(10,10,11,.25) 40%, rgba(10,10,11,0) 70%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

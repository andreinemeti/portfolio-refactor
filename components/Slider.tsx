// components/Slider.tsx
'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;

  // Autoplay options
  autoplay?: boolean;          // enable/disable
  delay?: number;              // ms between slides
  pauseOnHover?: boolean;      // pause when mouse is over
  pauseOnFocus?: boolean;      // pause when any child is focused (keyboard users)
};

export default function Slider({
  images = [],
  className,
  showArrows = true,
  showDots = true,
  autoplay = true,
  delay = 5000,
  pauseOnHover = true,
  pauseOnFocus = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const total = images?.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const indexRef = useRef(index);

  const go = useCallback(
    (i: number) => {
      if (!total) return;
      const next = ((i % total) + total) % total;
      setIndex(next);
      indexRef.current = next;
    },
    [total]
  );

  const next = useCallback(() => go(indexRef.current + 1), [go]);
  const prev = useCallback(() => go(indexRef.current - 1), [go]);

  // Keyboard navigation
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Keep ref in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || !total || total < 2) return;

    // Respect user preference
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const shouldPause =
      (pauseOnHover && hovered) ||
      (pauseOnFocus && focused) ||
      document.hidden;

    // Clear any existing timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!shouldPause) {
      timerRef.current = window.setInterval(() => {
        next();
      }, delay) as unknown as number;
    }

    const onVisibility = () => {
      // retrigger effect when tab visibility changes
      // (cleanup happens automatically on rerun)
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoplay, total, delay, hovered, focused, pauseOnHover, pauseOnFocus, next]);

  if (!total) return null;

  return (
    <div
      className={`slider ${className ?? ''}`}
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setHovered(false) : undefined}
      onFocusCapture={pauseOnFocus ? () => setFocused(true) : undefined}
      onBlurCapture={pauseOnFocus ? () => setFocused(false) : undefined}
    >
      <div
        ref={trackRef}
        className="slider__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Image slider"
      >
        {images.map((src, i) => (
          <div key={i} className="slider__slide" aria-hidden={i !== index}>
            <Image
              className="slider__img"
              src={src}
              alt={`Slide ${i + 1} of ${total}`}
              width={1400}
              height={800}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="slider__arrow slider__arrow--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg fill="#fff" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            type="button"
            className="slider__arrow slider__arrow--next"
            onClick={next}
            aria-label="Next slide"
          >
            <svg fill="#fff" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="m8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </>
      )}

      {showDots && (
        <div className="slider__nav" role="tablist" aria-label="Slide navigation">
          {images.map((_, i) => (
            <button
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              key={i}
              onClick={() => go(i)}
              className={`slider__dot ${i === index ? 'slider__dot--active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

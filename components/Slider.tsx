// components/Slider.tsx
'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  swipeNextOn?: 'left' | 'right';
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
  swipeNextOn = 'left',
}: Props) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragDx, setDragDx] = useState(0);

  const total = images?.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const indexRef = useRef(index);

  const go = useCallback((i: number) => {
    if (!total) return;
    const next = ((i % total) + total) % total;
    setIndex(next);
    indexRef.current = next;
  }, [total]);

  const next = useCallback(() => go(indexRef.current + 1), [go]);
  const prev = useCallback(() => go(indexRef.current - 1), [go]);

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

  useEffect(() => { indexRef.current = index; }, [index]);

  useEffect(() => {
    if (!autoplay || !total || total < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const shouldPause = dragging || (pauseOnHover && hovered) || (pauseOnFocus && focused) || document.hidden;

    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (!shouldPause) {
      timerRef.current = window.setInterval(() => { next(); }, delay) as unknown as number;
    }

    const onVisibility = () => {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoplay, total, delay, hovered, focused, pauseOnHover, pauseOnFocus, dragging, next]);

  // --- Drag/Swipe: Pointer Events + iOS touch fallback ---
  const startXRef = useRef(0);
  const hasPointerCaptureRef = useRef(false);
  const widthRef = useRef(1);

  const isIOS = typeof navigator !== 'undefined' && /iP(hone|ad|od)/.test(navigator.userAgent);
  const goByDx = (dx: number) => {
    const goNext = swipeNextOn === 'left' ? dx < 0 : dx > 0;
    if (goNext) next(); else prev();
  };

  // 🚫 On iOS, ignore pointer events for touch/pen to avoid double-handling with the touch fallback.
  const ignorePointerOnIOS = (e: React.PointerEvent) => isIOS && (e.pointerType === 'touch' || e.pointerType === 'pen');

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ignorePointerOnIOS(e)) return;               // <-- guard
    if (!rootRef.current) return;
    widthRef.current = rootRef.current.getBoundingClientRect().width || 1;

    setDragging(true);
    setDragDx(0);
    startXRef.current = e.clientX;

    // we can keep capture for desktop
    if (!isIOS) {
      e.currentTarget.setPointerCapture?.(e.pointerId);
      hasPointerCaptureRef.current = true;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ignorePointerOnIOS(e)) return;               // <-- guard
    if (!dragging) return;
    setDragDx(e.clientX - startXRef.current);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ignorePointerOnIOS(e)) return;               // <-- guard
    if (!dragging) return;
    setDragging(false);
    if (hasPointerCaptureRef.current) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      hasPointerCaptureRef.current = false;
    }
    const dx = dragDx;
    setDragDx(0);

    const width = widthRef.current || 1;
    const threshold = Math.max(50, width * 0.15);
    if (Math.abs(dx) >= threshold) {
      goByDx(dx);
    }
  };

  // Touch fallback for iOS (non-passive move so we can preventDefault on horizontal lock)
  useEffect(() => {
    if (!rootRef.current) return;
    // If PointerEvent exists and not iOS, pointer path is enough
    if (window.PointerEvent && !isIOS) return;

    const el = rootRef.current;
    let startX = 0;
    let dx = 0;
    let draggingTouch = false;
    let lock: 'none' | 'x' | 'y' = 'none';

    const onTouchStart = (ev: TouchEvent) => {
      if (ev.touches.length !== 1) return;
      widthRef.current = el.getBoundingClientRect().width || 1;
      draggingTouch = true;
      lock = 'none';
      startX = ev.touches[0].clientX;
      dx = 0;
      setDragging(true);
      setDragDx(0);
    };

    const onTouchMove = (ev: TouchEvent) => {
      if (!draggingTouch) return;
      const tx = ev.touches[0].clientX;

      if (lock === 'none') {
        const ax = Math.abs(tx - startX);
        if (ax > 8) lock = 'x';
      }
      if (lock === 'x') {
        ev.preventDefault(); // needs passive:false
        dx = tx - startX;
        setDragDx(dx);
      }
    };

    const end = () => {
      if (!draggingTouch) return;
      draggingTouch = false;
      setDragging(false);

      const width = widthRef.current || 1;
      const threshold = Math.max(50, width * 0.15);
      const move = dx;
      setDragDx(0);

      if (Math.abs(move) >= threshold) {
        goByDx(move);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', end, { passive: true });
    el.addEventListener('touchcancel', end, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchend', end as any);
      el.removeEventListener('touchcancel', end as any);
    };
  }, [next, prev, isIOS, swipeNextOn]);

  if (!total) return null;

  const dragOffsetPx = dragging ? dragDx : 0;
  const transform = `translate3d(calc(-${index * 100}% + ${dragOffsetPx}px), 0, 0)`;

  return (
    <div
      ref={rootRef}
      className={`slider ${className ?? ''}`}
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setHovered(false) : undefined}
      onFocusCapture={pauseOnFocus ? () => setFocused(true) : undefined}
      onBlurCapture={pauseOnFocus ? () => setFocused(false) : undefined}
    >
      <div
        ref={trackRef}
        className="slider__track"
        style={{ transform }}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Image slider"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {images.map((src, i) => (
          <div key={i} className="slider__slide" aria-hidden={i !== index}>
            <Image
              className="slider__img"
              src={src}
              alt={`Slide ${i + 1} of ${total}`}
              width={1400}
              height={800}
              draggable={false}
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

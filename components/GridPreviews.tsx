'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

type GridPreviewsProps = {
  images: string[];
  className?: string;
};

export default function GridPreviews({ images = [], className }: GridPreviewsProps) {
  const [isOpen, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  // Keyboard support when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    // Prevent body scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [isOpen, close, next, prev]);

  if (!images?.length) return null;

  return (
    <>
      {/* PREVIEW GRID */}
      <div className={`grid-previews ${className ?? ''}`}>
        {images.slice(0, 4).map((src, i) => (
          <button
            key={src + i}
            className="grid-previews__item"
            onClick={() => openAt(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Preview ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="grid-previews__img"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => {
            // Close when clicking the dark backdrop only
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="lightbox__stage">
            <Image
              key={images[index]} // force fade re-run when src changes
              src={images[index]}
              alt={`Image ${index + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="lightbox__img"
              priority
            />

            {/* Controls */}
            <button className="lightbox__btn lightbox__btn--close" onClick={close} aria-label="Close viewer">
              ×
            </button>
            {images.length > 1 && (
              <>
                <button className="lightbox__btn lightbox__btn--prev" onClick={prev} aria-label="Previous image">
                  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                  </svg>
                </button>
                <button className="lightbox__btn lightbox__btn--next" onClick={next} aria-label="Next image">
                  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                    <path d="m8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
                  </svg>
                </button>
              </>
            )}
            <div className="lightbox__counter" aria-hidden="true">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

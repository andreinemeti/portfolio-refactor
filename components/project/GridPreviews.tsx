// components/GridPreviews.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import MagneticItem from '../fx/MagneticItem';

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

  // Robust scroll lock (desktop + iOS)
  useEffect(() => {
    if (!isOpen) return;

    const { documentElement: html, body } = document;
    const scrollY = window.scrollY || window.pageYOffset;


    html.classList.add('no-scroll');
    body.classList.add('no-scroll');

    // freeze body in place to prevent iOS scroll-through
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    // also prevent overscroll rubber-banding inside
    body.style.overscrollBehavior = 'none';
    html.style.overscrollBehavior = 'none';

    return () => {
      html.classList.remove('no-scroll');
      body.classList.remove('no-scroll');

      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overscrollBehavior = '';
      html.style.overscrollBehavior = '';

      // restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Keyboard support when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  if (!images?.length) return null;


  return (
    <>
      {/* PREVIEW GRID */}
      <div className={`grid-previews ${className ?? ''}`}>
        {images.map((src, i) => (
          <MagneticItem className="card-container" key={i } radius={90} strength={0.22} tilt={3}>
          <button
            key={src + i}
            className="grid-previews__item"
            onClick={() => openAt(i)}
            aria-label={`Open image ${i + 1}`}
            data-cursor="target"
            data-cursor-images={src}             
          >
            
            <Image
              src={src}
              alt={`Preview ${i + 1}`}
              fill
              quality={95}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="grid-previews__img"
              priority={i === 0}
            />
           
          </button>
          </MagneticItem>
          
        
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="lightbox__stage">
            <Image
              key={images[index]}
              src={images[index]}
              alt={`Image ${index + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="lightbox__img"
              priority
            />

            <button className="lightbox__btn lightbox__btn--close" onClick={close} aria-label="Close viewer">×</button>
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

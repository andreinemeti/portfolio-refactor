// components/ServiceCard.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import NextIcon from './icons/NextIcon';
import MagneticItem from './MagneticItem';

type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  features?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string; // allows modifiers like "service-card--highlight"
};

export default function ServiceCard({
  icon,
  title,
  desc,
  features = [],
  ctaHref,
  ctaLabel,
  className,
}: ServiceCardProps) {
  return (
    <MagneticItem className="card-container"  radius={90} strength={0.22} tilt={3}>
    <article className={`service-card ${className ?? ''}`}>
      <div className="service-card__icon" aria-hidden="true">
        {icon}
      </div>

      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>

      {features.length > 0 && (
        <ul className="service-card__features">
          {features.map((f) => (
            <li key={f} className="service-card__feature">{f}</li>
          ))}
        </ul>
      )}

      {ctaHref && ctaLabel && (
        <div className="service-card__actions">
          <Link href={ctaHref} className="btn btn--ghost">
            <span className="btn__text">{ctaLabel}</span> <NextIcon className="icon" size={20} />
          </Link>
        </div>
      )}
    </article>
    </MagneticItem>
  );
}

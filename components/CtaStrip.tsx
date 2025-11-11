// components/CtaStrip.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import MagneticItem from './MagneticItem';
import ShatterTitle from './ShatterTitle';

type CtaStripProps = {
  title: string;              // main heading text
  subtitle?: string;          // optional helper text
  href?: string;              // optional primary action href
  actionLabel?: string;       // button label
  icon?: ReactNode;           // optional icon element (e.g. <NextIcon />)
  className?: string;         // optional modifier, e.g. "cta-strip--alt"
  rightSlot?: ReactNode;      // render anything on the right instead of the button
};

export default function CtaStrip({
  title,
  subtitle,
  href,
  actionLabel,
  icon,
  className,
  rightSlot,
}: CtaStripProps) {
  return (

    <section className={`cta-strip container ${className ?? ''}`}>
      <div className="cta-strip__text">
        <h3 className="cta-strip__title h2">
          <ShatterTitle
            as="p"
            className="hero__title"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            {title}
          </ShatterTitle>
        </h3>
        {subtitle && 
        
         <ShatterTitle
            as="p"
            className="strip__subtitle muted"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            {subtitle}
          </ShatterTitle>
       
       



        }
      </div>

      {rightSlot ? (
        <MagneticItem className="" radius={90} strength={0.22} tilt={3}>
          <div className="cta-strip__actions">
            {rightSlot}
          </div>
        </MagneticItem>
      ) : (
        href && actionLabel && (
          <Link href={href} className="btn btn--primary">
            <span className="btn__text">{actionLabel}</span>
            {icon}
          </Link>
        )
      )}
    </section>
  );
}

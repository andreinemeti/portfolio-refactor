'use client';
import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { label: string, href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumbs" className="breadcrumbs">
      <div className="container">
<ol className="breadcrumbs__list">
        {items.map((it, i) => (
          <li key={i} className="breadcrumbs__item">
            {it.href ? <Link className="breadcrumbs__link" href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          </li>
        ))}
      </ol>
      </div>
      
    </nav>
  );
}

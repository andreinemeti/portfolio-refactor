// components/layout/HighlightsStrip.tsx
import type { ReactNode } from 'react';

type HighlightItem = {
  icon: ReactNode;
  value: string;
  label: string;
};

type Props = {
  items: HighlightItem[];
};

export default function HighlightsStrip({ items }: Props) {
  return (
    <section className="stats-strip">
      <div className="container stats-strip__inner">
        {items.map((item, index) => (
          <div className="stats-strip__item" key={index}>
            <div className="stats-strip__icon-wrap">
              {item.icon}
            </div>
            <div className="stats-strip__value">{item.value}</div>
            <div className="stats-strip__label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// components/icons/DevIcon.tsx
import * as React from 'react';

export default function DevIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#ffb546" d="M3 5h18v12H3V5zm2 2v8h14V7H5zm-2 12h18v2H3v-2z" />
    </svg>
  );
}
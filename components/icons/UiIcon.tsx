// components/icons/UiIcon.tsx
import * as React from 'react';

export default function UiIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#ffb546" d="M4 6h16v2H4V6zm0 4h10v2H4v-2zm0 4h16v2H4v-2z" />
    </svg>
  );
}

// components/icons/ToolsIcon.tsx
import * as React from 'react';

export default function ToolsIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#ffb546" d="M19 7V4H5v3H3v13h18V7h-2zM7 6h10v1H7V6zm12 12H5V9h14v9z" />
    </svg>
  );
}

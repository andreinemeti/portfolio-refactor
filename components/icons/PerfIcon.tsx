// components/icons/PerfIcon.tsx
import * as React from 'react';

export default function PerfIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#ffb546" d="M12 3l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4z" />
    </svg>
  );
}

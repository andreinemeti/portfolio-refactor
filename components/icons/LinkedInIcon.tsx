import * as React from 'react';

export default function LinkedInIcon(
  { size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.63-1.18 2.17-2.42 4.47-2.42 4.78 0 5.66 3.15 5.66 7.25V24h-5v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24h-5V8z"
      />
    </svg>
  );
}

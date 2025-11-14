// components/icons/UiIcon.tsx
import * as React from 'react';

export default function UiIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml w-12 h-12 text-orange-400 mb-4"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
  );
}




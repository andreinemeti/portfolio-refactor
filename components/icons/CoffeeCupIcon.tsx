// components/icons/UiIcon.tsx
import * as React from 'react';

export default function CoffeeCupIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coffee w-10 h-10 text-white" aria-hidden="true" data-react-source="[project]/src/app/page.tsx:283:19"><path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path></svg>
  );
}





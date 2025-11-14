// components/icons/UiIcon.tsx
import * as React from 'react';

export default function UsersIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-10 h-10 text-white" aria-hidden="true" data-react-source="[project]/src/app/page.tsx:283:19"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
  );
}





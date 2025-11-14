// components/icons/DevIcon.tsx
import * as React from 'react';


export default function FilterIcon(
  { size = 26, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg className="nQao3 hcDLf YgmFC" width="16" height="16" viewBox="0 0 24 24" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9 9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9ZM11.8293 7C11.4175 5.83481 10.3062 5 9 5C7.69378 5 6.58254 5.83481 6.17071 7H2V9H6.17071C6.58254 10.1652 7.69378 11 9 11C10.3062 11 11.4175 10.1652 11.8293 9H22V8V7H11.8293ZM12.1707 15H2V17H12.1707C12.5825 18.1652 13.6938 19 15 19C16.3062 19 17.4175 18.1652 17.8293 17H22V15H17.8293C17.4175 13.8348 16.3062 13 15 13C13.6938 13 12.5825 13.8348 12.1707 15ZM14 16C14 16.5523 14.4477 17 15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16Z" fill="currentColor"></path></svg>
   
  );
}




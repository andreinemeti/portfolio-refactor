// app/contact/page.tsx
import ContactView from '@/views/contact/ContactView';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Andrei to discuss frontend development, UI/UX, or performance-focused projects.',
};

export default function ContactPage() {
  return <ContactView />;
}

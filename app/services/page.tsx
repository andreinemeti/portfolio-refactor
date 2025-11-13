// app/services/page.tsx
import type { Metadata } from 'next';
import ServicesView from '@/views/services/ServicesView';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Frontend development, UI/UX implementation, and performance/SEO services by Andrei.',
};

export default function ServicesPage() {
  return <ServicesView />;
}

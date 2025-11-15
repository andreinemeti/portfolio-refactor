// app/layout.tsx
import { cookies } from 'next/headers';
import './styles/globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Nav from '@/components/navigation/Nav';
import Footer from '@/components/layout/Footer';

export type Theme = 'light' | 'dark';

export const metadata: Metadata = { /* ... */ };

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const cookieTheme = cookieStore.get('portfolio-theme')?.value as Theme | undefined;
  const initialTheme: Theme =
    cookieTheme === 'light' || cookieTheme === 'dark' ? cookieTheme : 'dark';

  return (
    <html lang="en" className={inter.variable}>
      <body className={initialTheme === 'light' ? 'light-mode' : undefined}>
        <Nav />
        {children}
        <Footer initialTheme={initialTheme} />
      </body>
    </html>
  );
}

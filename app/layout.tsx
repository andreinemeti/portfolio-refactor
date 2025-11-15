import './styles/globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Nav from '@/components/navigation/Nav';
import Footer from '@/components/layout/Footer';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
   title: {
    default: 'Andrei Nemeti – Frontend Developer',
    template: '%s | Andrei Nemeti',
  },
  description: 'Freelance Front‑end Developer portfolio',
   icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon.ico' }, // fallback
    ],
    apple: '/favicon/apple-icon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export type Theme = 'light' | 'dark';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const cookieTheme = (await cookieStore).get('portfolio-theme')?.value as Theme | undefined;
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

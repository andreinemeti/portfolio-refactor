import './styles/globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from '@/store/Providers';
import Nav from '@/components/Nav';
export const metadata: Metadata = {
  title: 'Andrei Nemeti – Portfolio',
  description: 'Freelance Front‑end Developer portfolio'
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}

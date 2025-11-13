import './styles/globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Nav from '@/components/navigation/Nav';
import Footer from '@/components/layout/Footer';


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



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
      
          <Nav />
          {children}
           <Footer />
       
      </body>
    </html>
  );
}

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import MainWrapper from '@/components/layout/MainWrapper';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { HeaderProvider } from '@/components/layout/HeaderContext';
import ClientWidgetsLazy from '@/components/layout/ClientWidgetsLazy';
import '@/styles/globals.css';

const Footer = dynamic(() => import('@/components/layout/Footer'));

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://horeca-demo.vercel.app'),
  title: {
    default: 'Готель | Розкішний відпочинок на природі',
    template: '%s | Готель',
  },
  description: 'Відкрийте для себе ідеальне поєднання розкоші та природи',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased font-sans">
        <LanguageProvider>
          <HeaderProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <Footer />
              <ClientWidgetsLazy />
            </div>
          </HeaderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter } from "next/font/google";

import cx from 'clsx';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

import '@/styles/globals.scss';


const inter = Inter({
  display: 'swap',
  variable: '--font-inter',
  subsets: ['latin']
});

const title = 'mineralogy.rocks';

export const metadata: Metadata = {
  title: { template: `%s | ${title}`, default: title },
  description: 'A service provides access to mineralogical and related data.',
  generator: 'Next.js',
  keywords: ['mineralogy', 'geology', 'minerals', 'rocks', 'earth', 'science'],
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const theme = '';

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cx(theme, inter.className)}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="tracking-normal font-normal antialiased selection:bg-sky-400 selection:text-white max-w-full mx-auto relative text-font dark:bg-slate-900 dark:bg-none"
            suppressHydrationWarning={true}>
        <main className="max-w-full mx-auto relative text-font">
          <NavBar/>
          <div className="min-h-[70vh] pt-10">
            {children}
          </div>
          <Footer/>
        </main>
      </body>
    </html>
  );
}

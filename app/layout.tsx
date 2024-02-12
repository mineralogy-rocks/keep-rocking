import { Metadata } from 'next';
import {Inter} from "@next/font/google";

const inter = Inter({
  display: 'swap',
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Mineralogy Rocks',
  description: 'A service provides access to mineralogical and related data.',
  themeColor: '#ffffff',

  generator: 'Next.js',
  author: 'Mineralogy Rocks',
  keywords: ['mineralogy', 'geology', 'minerals', 'rocks', 'earth', 'science'],

};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-black tracking-normal font-normal antialiased selection:bg-sky-400 selection:text-white">
        {children}
      </body>
    </html>
  );
}

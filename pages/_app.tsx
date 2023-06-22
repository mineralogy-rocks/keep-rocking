import '../styles/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { Inter } from '@next/font/google';

import clsx from 'clsx';


const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={clsx("max-w-full mx-auto relative pt-10 text-font", inter.className)}>
        <NavBar />
        <div className="min-h-[70vh]">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </>
  )
};

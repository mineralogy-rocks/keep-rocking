import '../styles/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { Inter } from '@next/font/google';
import clsx from 'clsx';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={clsx("max-w-full mx-auto relative text-font font-sans", inter.variable)}>
        <NavBar />
        <div className="min-h-[70vh] pt-10">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </>
  )
};

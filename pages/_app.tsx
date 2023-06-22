import Head from 'next/head';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/globals.scss';

import { Inter } from '@next/font/google';

import clsx from 'clsx';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <main className={clsx("max-w-full min-h-[70vh] mx-auto relative pt-10 text-font font-sans", inter.variable)}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </main>
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
    </>
  )
};

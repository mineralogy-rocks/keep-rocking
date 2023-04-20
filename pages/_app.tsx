import Head from 'next/head';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import '../styles/globals.scss';

import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};

        }
      `}</style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
};

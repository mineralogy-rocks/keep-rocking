import Head from 'next/head';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
};

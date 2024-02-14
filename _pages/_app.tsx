import '../styles/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

// import localFont from '@next/font/local';
import { Inter } from '@next/font/google';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


// const inter = localFont({
//   src: '../public/assets/fonts/Inter-VariableFont_slnt,wght.ttf',
//   weight: '100..900',
//   display: 'swap',
//   variable: '--font-inter'
// });

const inter = Inter({
  display: 'swap',
  variable: '--font-inter',
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
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

      <main className="max-w-full mx-auto relative text-font">
        <NavBar />
        <div className="min-h-[70vh] pt-10">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </>
  )
};

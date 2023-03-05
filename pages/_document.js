import { Html, Head, Main, NextScript } from 'next/document';
import { Inter } from '@next/font/google';


export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <meta name="author" content="mineralogy.rocks" />
        <meta name="description" content="A service provides access to mineralogical and related data." />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-slate-100 text-black tracking-normal font-normal antialiased selection:bg-sky-400 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

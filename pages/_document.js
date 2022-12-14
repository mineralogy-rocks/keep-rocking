import { Html, Head, Main, NextScript } from 'next/document';
import { Inter } from '@next/font/google';


export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-slate-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

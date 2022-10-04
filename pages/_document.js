import { Html, Head, Main, NextScript } from 'next/document';


export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" />
      </Head>
      <body className="bg-white min-h-full flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

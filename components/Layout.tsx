import NavBar from './NavBar';
import Footer from './Footer';

import clsx from 'clsx';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main className={clsx("max-w-full min-h-[70vh] mx-auto relative pt-10", inter.className)}>{children}</main>
      <Footer />
    </>
  );
}

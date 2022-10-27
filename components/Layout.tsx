import NavBar from './NavBar';
import Footer from "./Footer";
import { Inter } from '@next/font/google';

const inter = Inter();


export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main className={inter.className}>{children}</main>
      <Footer />
    </>
  );
}

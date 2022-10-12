import NavBar from './NavBar';
import Footer from "./Footer";



export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main className="">{children}</main>
      <Footer />
    </>
  );
}

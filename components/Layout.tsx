import NavBar from './NavBar';
import Footer from './Footer';


export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main className="max-w-full min-h-[70vh] mx-auto relative pt-10">{children}</main>
      <Footer />
    </>
  );
}

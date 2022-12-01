import NavBar from './NavBar';
import Footer from './Footer';


export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main className="max-w-8xl mx-auto relative pt-10">{children}</main>
      <Footer />
    </>
  );
}

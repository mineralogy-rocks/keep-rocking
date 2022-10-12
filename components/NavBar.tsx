import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'clsx';
import utilsStyle from 'styles/Utils.module.css';


function NavItem({href, text}) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
      <Link href={href}>
        <a className={cx({ 'text-zinc-100/90': isActive }, utilsStyle.link)}>{text}</a>
      </Link>
  );
}

export default function Navbar() {
  return (
    <header className="flex h-14 sticky top-0 z-20 w-full bg-black drop-shadow-xl">
      <nav className="flex w-full items-center justify-around text-sm sm:text-lg md:text-base">
        <ul className="flex font-semibold text-white text-sm sm:text-lg md:text-lg">
          <Link href="/">
            <div className="flex">
              <div className="mr-0.5 self-center bg-white text-center">
                <span className="text-black">M</span>
              </div>
              <a className={'cursor-pointer ' + utilsStyle.link}>ineralogy.rocks</a>
            </div>
          </Link>
        </ul>
        <ul className="flex space-x-2 font-semibold text-zinc-300/70 sm:space-x-6 md:space-x-10">
          <NavItem href="/explore" text="Explore" />
          <NavItem href="/about" text="About" />
          <NavItem href="/contact" text="Contact" />
        </ul>
      </nav>
    </header>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import utilsStyle from 'styles/Utils.module.css';


function NavItem({href, text}) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
      <Link href={href}>
        <a className={cn(isActive ? '' : '', utilsStyle.hoverUnderline)}>{text}</a>
      </Link>
  );
}

export default function Navbar() {
  return (
    <header className="flex h-14 sticky top-0 z-20 w-full bg-black shadow-xl">
      <nav className="flex w-full items-center justify-around text-sm sm:text-lg md:text-xl">
        <ul className="flex font-semibold text-white">
          <Link href="/">
            <div className="flex">
              <div className="mr-0.5 self-center bg-white text-center">
                <span className="text-black">M</span>
              </div>
              <a className={'cursor-pointer ' + utilsStyle.hoverUnderline}>ineralogy.rocks</a>
            </div>
          </Link>
        </ul>
        <ul className="flex space-x-2 font-semibold text-white sm:space-x-6 md:space-x-10">
          <Link href="/explore">
            <a className={utilsStyle.hoverUnderline}>Explore</a>
          </Link>
          <Link href="/about">
            <a className={utilsStyle.hoverUnderline}>About</a>
          </Link>
          <Link href="/contact">
            <a className={utilsStyle.hoverUnderline}>Contact us</a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

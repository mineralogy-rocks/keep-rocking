import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cx from 'clsx';


function NavItem({href, text}) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
      <Link href={href}>
        <span className={cx({ 'text-zinc-100/90': isActive }, 'hover:text-zinc-100 transition-all duration-300 ease-in-out')}>{text}</span>
      </Link>
  );
}

export default function Navbar() {
  return (
    <header className="flex h-14 sticky top-0 z-20 w-full bg-black drop-shadow-xl">
      <nav className="flex w-full items-center justify-around text-sm sm:text-lg md:text-base">
        <ul className="flex font-semibold text-zinc-300/70 text-sm sm:text-lg md:text-lg">
          <Link href="/">
            <div className="flex items-end">
              <div className="mr-0.5">
                <Image src="/assets/logo.svg" width={40} height={40} alt="logo" />
              </div>
              <span className='cursor-pointer hover:text-zinc-100 transition-all duration-300 ease-in-out'>ineralogy.rocks</span>
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

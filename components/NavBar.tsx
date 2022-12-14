import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import NavPopover from '@/components/NavPopover';
import { LogoCube } from '@/components/Logo';
import utilsStyles from '@/styles/utils.module.scss';


function NavItem({href, text}) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
      <Link href={href}>
        <span className={clsx({ "text-gray-500/70": isActive }, utilsStyles.NavBarLink, "transition-all duration-300 ease-in-out")}>{text}</span>
      </Link>
  );
}

export default function Navbar() {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="flex h-14 mt-2 z-20 w-full">
      <nav className="flex w-full items-center justify-between mx-5 md:justify-around text-sm sm:text-lg md:text-base">
        <ul className="flex text-sm sm:text-lg md:text-lg">
          <Link href="/">
            <div className="flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="mr-0.5">
                <LogoCube isHovered={isHovered} />
              </div>
              <span className={clsx(utilsStyles.NavBarLink, "cursor-pointer hover:text-gray-500/70 transition-all duration-300 ease-in-out")}>ineralogy.rocks</span>
            </div>
          </Link>
        </ul>
        <NavPopover className="text-black" display="md:hidden" />
        <ul className="hidden md:flex space-x-2 sm:space-x-6 md:space-x-10">
          <NavItem href="/explore" text="Explore" />
          <NavItem href="/about" text="About" />
          <NavItem href="/contact" text="Contact" />
        </ul>
      </nav>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import cx from 'clsx';

import NavPopover from '@/components/NavPopover';
import { LogoCube } from '@/components/Logo';


function NavItem({href, text}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
      <Link href={href}>
        <span className={cx({ "text-slate-900 dark:text-slate-300": isActive }, "text-lg font-medium dark:hover:text-slate-300 hover:text-slate-900 cursor-pointer transition-all duration-300 ease-in-out")}>{text}</span>
      </Link>
  );
}

export default function Navbar() {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="flex h-14 mt-2 z-20 w-full">
      <nav className="flex w-full items-center justify-between mx-5 md:justify-around text-sm sm:text-lg md:text-base">
        <ul className="flex text-sm sm:text-lg md:text-lg">
          <li>
            <Link href="/">
              <div className="flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="mr-0.5">
                  <LogoCube isHovered={isHovered} />
                </div>
                <span className="text-lg font-medium cursor-pointer dark:hover:text-slate-300 hover:text-slate-900 transition-all duration-300 ease-in-out">ineralogy.rocks</span>
              </div>
            </Link>
          </li>
        </ul>
        <NavPopover display="md:hidden" />
        <ul className="hidden md:flex space-x-2 sm:space-x-6 md:space-x-10">
          <li>
            <NavItem href="/explore" text="Explore"/>
          </li>
          <li>
            <NavItem href="/blog" text="Blog"/>
          </li>
          <li>
            <NavItem href="/about" text="About"/>
          </li>
          <li>
            <NavItem href="/contact" text="Contact"/>
          </li>
        </ul>
      </nav>
    </header>
  );
}

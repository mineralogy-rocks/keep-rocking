import { useEffect, useState, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Dialog } from '@headlessui/react';
import cx from 'clsx';

import mobileStyles from '@/styles/mobile-menu.module.scss';

function NavItem({href, text}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
      <Link href={href} className="flex items-center">
        {isActive && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-4 w-4 mr-2 shrink-0 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        )}
        <span className={mobileStyles.Link}>{text}</span>
      </Link>
  );
}

export default function NavPopover({ className, display = "md:hidden" }: { className?: string, display?: string }) {

  const pathname = usePathname();
  const ref = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (ref.current !== pathname) {
      ref.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);


  return (
    <div className={cx(display, "text-font-primary")}>
      <button type="button" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <Dialog as="div"
              className="fixed inset-0 z-50"
              open={isOpen}
              onClose={setIsOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/10 backdrop-blur-sm" />
          <div className="fixed top-4 right-4 w-full max-w-xs bg-white dark:bg-slate-800 rounded shadow-md p-4">
            <button type="button" className="absolute top-3 right-2 text-font-primary" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col space-y-4">
              <NavItem href="/" text="Home" />
              <NavItem href="/explore" text="Explore" />
              {/*<NavItem href="/blog" text="Blog" />*/}
              <NavItem href="/about" text="About" />
              <NavItem href="/contact" text="Contact" />
            </div>
          </div>
        </Dialog>
    </div>
  );
}

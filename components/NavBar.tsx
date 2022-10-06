import Link from 'next/link';

import styles from '../styles/Utils.module.css';


export default function Navbar() {
  return (
    <header className="flex h-14 sticky top-0 z-20 w-full bg-black shadow-xl items-center">
      <div className="flex mx-auto">
        <div className="mx-4 py-2 lg:mx-2">
          <nav className="flex items-center justify-between text-sm sm:justify-around sm:text-lg md:text-xl">
            <ul className="flex font-semibold text-white">
              <Link className={styles.underlineAnimation} href="/">
                <div className="flex flex-row">
                  <div className="mr-0.5 self-center bg-white text-center">
                    <span className="text-black">M</span>
                  </div>
                  <span>ineralogy.rocks</span>
                </div>
              </Link>
            </ul>
            <ul className="mr-4 flex space-x-2 font-semibold text-white sm:space-x-6 md:space-x-10">
              <Link href="/explore">
                <a className={styles.underlineAnimation}>Explore</a>
              </Link>
              <Link href="/about">
                <a className={styles.underlineAnimation}>About</a>
              </Link>
              <Link href="/contact">
                <a className={styles.underlineAnimation}>Contact us</a>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

export default function Navbar() {
    return (
        <header className="bg-black sticky min-h-2 sm:min-h-3 top-0 z-20 w-full shadow-xl">
            <div className="mx-auto">
                <div className="py-2 mx-4 lg:mx-2">
                    <nav className="flex items-center justify-between sm:justify-around text-sm sm:text-lg md:text-xl">
                        <ul className="flex text-white font-semibold">
                            <Link className={utilStyles.underlineAnimation} href="/">
                                <div className="flex flex-row">
                                    <div className="bg-white mr-0.5 text-center self-center">
                                        <span className="text-black">M</span>
                                    </div>
                                    <span>ineralogy.rocks</span>
                                </div>
                            </Link>
                        </ul>
                        <ul className="flex text-white font-semibold mr-4 space-x-2 sm:space-x-6 md:space-x-10">
                            <Link href="/explore"><a className={utilStyles.underlineAnimation}>Explore</a></Link>
                            <Link href="/about"><a className={utilStyles.underlineAnimation} >About</a></Link>
                            <Link href="/contact"><a className={utilStyles.underlineAnimation} >Contact us</a></Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
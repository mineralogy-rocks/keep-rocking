import utilStyles from '../styles/utils.module.css';

export default function Footer() {
    return (
        <footer className="bg-black min-h-4 bottom-0 z-20 w-full shadow-xl mt-20 mx-auto">
            <div className="max-w-7xl mx-auto divide-y divide-gray-600 px-10 sm:px-16 md:px-18 py-2">
                <div className="flex flex-col sm:flex-row text-white text-sm gap-y-6">
                    <div className="flex-none justify-center w-full sm:w-1/3 space-y-10 sm:space-y-8 lg:flex lg:space-y-0 px-2">
                        <div className="lg:flex-none">
                            <h2 className="font-semibold underline text-slate-900 dark:text-slate-100">Links</h2>
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Comenius University</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Marie Skłodowska-Curie Actions</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://fns.uniba.sk/en/" target="_blank" rel="noreferrer">Faculty of Natural Sciences</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://kmplg.sk/?lang=en" target="_blank" rel="noreferrer">KMPLG</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex-none justify-center w-full sm:w-1/3 space-y-10 sm:space-y-8 lg:flex lg:space-y-0 px-2">
                        <div className="lg:flex-none">
                            <h2 className="font-semibold underline text-slate-900 dark:text-slate-100">Contribute</h2>
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Research</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Donate data</a>
                                </li>
                                <li>
                                    <a href='https://ko-fi.com/I2I43R998' target='_blank' rel="noreferrer" className="flex items-center">
                                        <span className="underline-animation mr-2">Buy us a Coffee</span><img src="/img/kofilogo_bluebg.png" alt="Buy us a coffee at ko-fi.com" className="w-8 h-auto" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex-none justify-center w-full sm:w-1/3 space-y-10 sm:space-y-8 lg:flex lg:space-y-0 px-2">
                        <div className="lg:flex-none">
                            <h2 className="font-semibold underline text-slate-900 dark:text-slate-100">Legal</h2>
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Privacy Policy</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Terms of Service</a>
                                </li>
                                <li>
                                    <a className={utilStyles.underlineAnimation} href="https://fns.uniba.sk/en/" target="_blank" rel="noreferrer">Infrastructure</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center text-white text-xs font-bold mt-5 pt-2">
                    <div className="bg-white mr-1 text-center self-center">
                        <span className="text-black">M</span>
                    </div>
                    <span className="text-center">Copyright of mineralogy.rocks (2022). All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}
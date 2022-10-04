import Image from 'next/image';

import styles from '../styles/Utils.module.css';


export default function Footer() {
  const links = [
    {
      link: 'https://uniba.sk/en/',
      name: 'Comenius University'
    },
    {
      link: 'https://marie-sklodowska-curie-actions.ec.europa.eu/',
      name: 'Marie Skłodowska-Curie Actions'
    },
    {
      link: 'https://fns.uniba.sk/en/',
      name: 'Faculty of Natural Sciences'
    },
    {
      link: 'https://kmplg.sk/?lang=en',
      name: 'KMPLG'
    },
  ]

  return (
    <footer className="min-h-4 bottom-0 z-20 mx-auto mt-20 w-full bg-black shadow-xl">
      <div className="md:px-18 mx-auto max-w-7xl px-10 py-6 sm:px-16">
        <div className="mt-4 flex flex-col gap-y-6 text-sm md:text-base text-white sm:flex-row">
          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-base md:text-lg font-bold text-slate-100">Links</h2>
              <ul className="mt-3 space-y-2">
                 <li>
                   <a className={styles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Comenius University</a>
                 </li>
                 <li>
                   <a className={styles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Marie Skłodowska-Curie Actions</a>
                 </li>
                 <li>
                   <a className={styles.underlineAnimation} href="https://fns.uniba.sk/en/" target="_blank" rel="noreferrer">Faculty of Natural Sciences</a>
                 </li>
                 <li>
                   <a className={styles.underlineAnimation} href="https://kmplg.sk/?lang=en" target="_blank" rel="noreferrer">Our Department</a>
                 </li>
              </ul>
            </div>
          </div>

          <hr className="bg-gray-50" />

          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-base md:text-lg font-bold text-slate-100">Contribute</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className={styles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Research</a>
                </li>
                <li>
                  <a className={styles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Donate data</a>
                </li>
                <li>
                  <a href="https://ko-fi.com/I2I43R998" target="_blank" rel="noreferrer" className="flex items-center">
                    <span className="underline-animation mr-2">Buy us a Coffee</span>
                    <Image src="/assets/kofilogo_bluebg.png" alt="Buy us a coffee at ko-fi.com"  width="30" height="30" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="bg-gray-50" />

          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-base md:text-lg font-bold text-slate-100">Legal</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className={styles.underlineAnimation} href="https://uniba.sk/en/" target="_blank" rel="noreferrer">Privacy Policy</a>
                </li>
                <li>
                  <a className={styles.underlineAnimation} href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">Terms of Service</a>
                </li>
                <li>
                  <a className={styles.underlineAnimation} href="https://fns.uniba.sk/en/" target="_blank" rel="noreferrer">Infrastructure</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-row justify-center text-xs md:text-sm text-white border-t border-gray-100 pt-5">
          <div className="mr-1 self-center bg-white text-center px-0.5">
            <span className="text-black">M</span>
          </div>
          <span className="font-normal">Copyright of mineralogy.rocks (2022). All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

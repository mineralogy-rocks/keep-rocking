import Link from 'next/link';

import cx from 'clsx';

import { LogoCube } from '@/components/Logo';
import utilsStyles from '../styles/utils.module.scss';


const ExternalLink = ({ href, children }) => (
  <a className={utilsStyles.subtleLink} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

const InternalLink = ({ href, children }) => (
  <Link href={href} className={utilsStyles.subtleLink}>{children}</Link>
);

export default function Footer() {

  return (
    <footer className="relative min-h-4 bottom-0 z-20 mx-auto mt-20 w-full font-medium">
      <div className="absolute bottom-0 w-full overflow-hidden">
        <svg width="1728" height="400" viewBox="0 0 1728 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_521_76)">
            <path d="M0 127.5L77.5 99.5C125.5 90.0033 202 130.737 298 127.5C394 124.262 546.5 74.2408 642.5 80.5C738.5 86.5433 810.5 58.0041 906.5 48.2916C1002.5 38.5791 1093 3.1824 1189 14.4057C1285 25.4132 1344 41.1691 1440 48.2916C1536 55.4141 1632 28.219 1680 14.4057L1728 0.808228V428.158H1680C1632 428.158 1536 428.158 1440 428.158C1344 428.158 1248 428.158 1152 428.158C1056 428.158 960 428.158 864 428.158C768 428.158 672 428.158 576 428.158C480 428.158 384 428.158 288 428.158C192 428.158 96 428.158 48 428.158H0V127.5Z" fill="#B659B7" fillOpacity="0.05"/>
            <path d="M0 267L143.5 290C254.5 323.5 315 262.252 411 267C507 271.533 556 228.363 652 227.5C748 226.853 820 245.093 916 252C1089.5 252 1078 221.4 1174 195.5C1379 130.5 1405 139 1405 139C1540 130 1526.5 203.223 1655 175L1728 160.525V428.158H1680C1632 428.158 1536 428.158 1440 428.158C1344 428.158 1248 428.158 1152 428.158C1056 428.158 960 428.158 864 428.158C768 428.158 672 428.158 576 428.158C480 428.158 384 428.158 288 428.158C192 428.158 96 428.158 48 428.158H0V267Z" fill="#4913B4" fillOpacity="0.05"/>
          </g>
          <defs>
            <clipPath id="clip0_521_76">
              <rect width="1728" height="400" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative md:px-18 mx-auto max-w-7xl px-10 py-6 sm:px-16 z-10">
        <div className="mt-4 flex flex-col gap-y-6 text-sm sm:text-base sm:flex-row">
          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-font-primary font-semibold">Links</h2>
              <ul className="mt-3 space-y-2">
                 <li>
                  <ExternalLink href="https://uniba.sk/en/">Comenius University</ExternalLink>
                 </li>
                 <li>
                  <ExternalLink href="https://marie-sklodowska-curie-actions.ec.europa.eu/">Marie Skłodowska-Curie Actions</ExternalLink>
                 </li>
                 <li>
                  <ExternalLink href="https://fns.uniba.sk/en/">Faculty of Natural Sciences</ExternalLink>
                 </li>
                 <li>
                  <ExternalLink href="https://kmplg.sk/?lang=en">Our Department</ExternalLink>
                 </li>
              </ul>
            </div>
          </div>

          <hr className="bg-zinc-300" />

          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-font-primary font-semibold">Contribute</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <ExternalLink href="https://www.researchgate.net/profile/Liubomyr-Gavryliv">Research Gate</ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://github.com/mineralogy-rocks">GitHub</ExternalLink>
                </li>
                <li>
                  <a href="https://ko-fi.com/I2I43R998" target="_blank" rel="noreferrer" className="flex items-center">
                    <span className={cx(utilsStyles.subtleLink, 'mr-2')}>Buy us a Coffee</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="bg-zinc-300" />

          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-font-primary font-semibold">Legal</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <InternalLink href='/privacy-policy'>Privacy Policy</InternalLink>
                </li>
                <li>
                  <InternalLink href="/terms-of-service">Terms of Service</InternalLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-row justify-center items-center text-xs md:text-sm text-font-secondary border-t border-zinc-300 pt-5">
          <LogoCube animate={false} />
          <span className="ml-1 font-medium">©2022—present mineralogy.rocks. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

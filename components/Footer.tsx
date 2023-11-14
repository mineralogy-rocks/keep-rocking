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
      <div className="md:px-18 mx-auto max-w-7xl px-10 py-6 sm:px-16">
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

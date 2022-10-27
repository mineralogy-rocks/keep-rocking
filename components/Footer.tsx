import cx from 'clsx';

import Logo from './common/Logo';
import utilsStyles from '../styles/Utils.module.scss';


const ExternalLink = ({ href, children }) => (
  <a className={utilsStyles.subtleLink} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

export default function Footer() {

  return (
    <footer className="min-h-4 bottom-0 z-20 mx-auto mt-20 w-full bg-black text-zinc-400/70 font-semibold drop-shadow-xl">
      <div className="md:px-18 mx-auto max-w-7xl px-10 py-6 sm:px-16">
        <div className="mt-4 flex flex-col gap-y-6 text-sm md:text-sm sm:flex-row">
          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-slate-100">Links</h2>
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
              <h2 className="text-slate-100">Contribute</h2>
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
              <h2 className="text-slate-100">Legal</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <ExternalLink href="https://uniba.sk/en/">Privacy Policy</ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://marie-sklodowska-curie-actions.ec.europa.eu/">Terms of Service</ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://uniba.sk/en/">Infrastructure</ExternalLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-row justify-center text-xs md:text-sm text-zinc-200 border-t border-zinc-300 pt-5">
          <Logo />
          <span className="font-light">©2022—present mineralogy.rocks. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

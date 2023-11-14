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
    <footer className="min-h-4 bottom-0 z-20 mx-auto mt-20 w-full font-medium">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="800" viewBox="0 0 800 800" className="absolute bottom-0">
        <defs>
          <linearGradient gradientTransform="rotate(270)" x1="50%" y1="0%" x2="50%" y2="100%" id="sssquiggly-grad">
            <stop stop-color="hsla(242, 100%, 50%, 1.00)" stop-opacity="1" offset="0%"></stop>
            <stop stop-color="hsla(310, 100%, 50%, 1.00)" stop-opacity="1" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke-width="1" stroke="url(#sssquiggly-grad)" fill="none" stroke-linecap="round" transform="matrix(1,0,0,1,-5,255.1091194152832)">
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,266)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,228)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,190)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,152)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,114)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,76)"></path>
          <path d="M10,10C35.69444444444444,13.75,79.86111111111111,32.166666666666664,133.33333333333334,28C186.80555555555557,23.833333333333332,211.11111111111114,-11.875,266.6666666666667,-10C322.22222222222223,-8.125,344.44444444444446,37.625,400,37C455.55555555555554,36.375,477.7777777777778,-9.666666666666668,533.3333333333334,-13C588.8888888888889,-16.333333333333332,611.1111111111112,18.5,666.6666666666667,21C722.2222222222223,23.5,772.2222222222223,3.583333333333333,800,-1" transform="matrix(1,0,0,1,0,38)"></path>
        </g>
      </svg>
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

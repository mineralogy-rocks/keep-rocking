import Image from 'next/image';

import styles from '../styles/Utils.module.css';


const ExternalLink = ({ href, children }) => (
  <a className="hover:underline underline-offset-2 decoration-gray-300" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

export default function Footer() {

  return (
    <footer className="min-h-4 bottom-0 z-20 mx-auto mt-20 w-full bg-black shadow-xl">
      <div className="md:px-18 mx-auto max-w-7xl px-10 py-6 sm:px-16">
        <div className="mt-4 flex flex-col gap-y-6 text-sm md:text-base text-white sm:flex-row">
          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-base md:text-lg font-bold text-slate-100">Links</h2>
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

          <hr className="bg-gray-50" />

          <div className="w-full flex-none justify-center space-y-10 px-2 sm:w-1/3 sm:space-y-8 lg:flex lg:space-y-0">
            <div className="lg:flex-none">
              <h2 className="text-base md:text-lg font-bold text-slate-100">Contribute</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <ExternalLink href="https://www.researchgate.net/profile/Liubomyr-Gavryliv">Research Gate</ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://github.com/mineralogy-rocks">Git Hub</ExternalLink>
                </li>
                <li>
                  <a href="https://ko-fi.com/I2I43R998" target="_blank" rel="noreferrer" className="flex items-center">
                    <span className="hover:underline underline-offset-2 decoration-gray-300 mr-2">Buy us a Coffee</span>
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

import Link from 'next/link'
import cx from 'clsx'

import { HiArrowRight } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";

import Terminal from '../components/content/Terminal';
import utilsStyles from '../styles/Utils.module.scss'


export default function Home() {
  return <>
    <header>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mt-24 text-center justify-center">
          <h1 className="max-w-md font-black text-6xl sm:text-7xl md:text-8xl mx-auto">
            Explore.
            Extract.
            Research.
          </h1>
        </div>

        <div className="mx-auto px-6 sm:px-8 mt-14 md:mt-20">
          <div className="flex justify-center">
            <Link href="/explore" legacyBehavior>
                <span className={cx(utilsStyles.link, 'group flex items-center')}>Start Exploring
                  <HiArrowRight size="1.5rem" className="ml-2 group-hover:translate-x-2 group-hover:transition-all ease-in-out duration-300" />
                </span>
            </Link>
          </div>

          <p className="text-sm md:text-base text-left mt-7">
            <span className="font-bold">Mineralogy.rocks</span> provide seamless and simple way to access and filter mineralogical and related data.
            Our platform is designed both for researchers and developers.
          </p>
        </div>
      </div>
    </header>

    <section>
      <div className="mt-20 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex justify-center items-center">
            <div className="flex self-center items-center justify-center bg-teal-300 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
                <BsSearch size="20" />
            </div>
            <h3 id="explore" className="font-bold text-2xl md:text-4xl">Explore</h3>
        </div>
        <h2 className="text-center font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Start with exploring the data</h2>
        <p className="text-sm md:text-base text-start mt-7">
            The platform is developed by the researchers for the researchers. Our goal is to provide data for scientific needs in a coherent fashion.
            Find the right data subset and explore the relations between minerals.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
            <div className="md:col-span-6 flex flex-col">
                <h4 className="font-bold text-xl md:text-2xl">Researcher?</h4>
                <p className="text-sm md:text-base text-left mt-5">
                    Check out our filtering system at <Link href="/explore" className={utilsStyles.link}>mineralogy.rocks/explore</Link>.
                    You are able to make complex queries, combine those and explore the results.
                </p>
            </div>

            <div className="md:col-span-6 flex flex-col">
                <div className="text-left text-sm">
                    <div className="flex items-center">
                        <span className="bg-black/50 text-white w-5 h-5 rounded-full justify-center font-semibold flex items-center mr-2">1</span>
                        <p className="text-xs sm:text-sm md:text-base">Discovery year between 1999 and 2001</p>
                        <p className="font-semibold text-xs sm:text-sm md:text-base">1, 401 species</p>
                    </div>
                    <div className="flex items-center">
                        <span className="bg-black/60 text-white w-5 h-5 rounded-full justify-center font-semibold flex items-center mr-2">2</span>
                        <p className="text-xs sm:text-sm md:text-base">Discovery country in EU</p>
                        <p className="font-semibold text-xs sm:text-sm md:text-base">198 minerals</p>
                    </div>
                    <div className="flex items-center">
                        <span className="bg-black/70 text-white w-5 h-5 rounded-full justify-center font-semibold flex items-center mr-2">3</span>
                        <p className="text-xs sm:text-sm md:text-base">Mineral formula contains As<sup>5+</sup></p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-black text-white w-5 h-5 rounded-full justify-center flex font-semibold items-center mr-2">4</span>
                      <p className="font-semibold text-xs sm:text-sm md:text-base">Vicanite-(Ce)</p>
                    </div>
                </div>
            </div>
            <div className="md:col-span-6 flex flex-col"></div>
        </div>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
          <div className="md:col-span-6 flex flex-col">
            <h4 className="font-bold text-xl md:text-2xl">Developer?</h4>
            <p className="text-sm md:text-base mt-5">
              The data is accessible via <a className={utilsStyles.linkExternal} href="https://api.mineralogy.rocks" target="_blank" rel="noopener noreferrer">api.mineralogy.rocks</a> through your favourite <code className="font-normal bg-slate-200 px-1 py-0.5 rounded">http client</code>. Check out current state of <a className={utilsStyles.linkExternal} href="https://api.mineralogy.rocks/docs" target="_blank" rel="noopener noreferrer">API documentation</a>.
            </p>
          </div>

          <div className="md:col-span-6">
            <Terminal>
              <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-semibold text-gray-900 flex ligatures-none overflow-auto">
                <code className="flex-none min-w-full p-5">
                  <span className="flex">
                    <svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3">
                      <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="flex-auto">
                      <span className="text-indigo-700">curl</span>
                      <span> -X GET \</span>{'\n'}
                      <span>     -H &quot;Content-type: application/json&quot; \</span>{'\n'}
                      <span>     -H &quot;Accept: application/json&quot; \</span>{'\n'}
                      <span>     -d &quot;offset=10&quot; \</span>{'\n'}
                      <span>     -d &quot;ordering=status_id&quot; \</span>{'\n'}
                      <span>     &quot;https://api.mineralogy.rocks/status&quot; </span>
                    </span>
                  </span>
                </code>
              </pre>
            </Terminal>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="mt-20 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex justify-center items-center">
          <div className="flex self-center justify-center bg-pink-200 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
            <span className="mdi text-3xl md:text-5xl mdi-cloud-download"></span>
          </div>
          <h3 className="font-bold text-2xl md:text-4xl">Extract</h3>
        </div>
        <h2 className="font-black text-3xl sm:text-4xl md:text-6xl text-center mt-4">Download the data</h2>
        <p className="text-sm md:text-base text-left mt-5">
          The platform makes the <strong>data extraction</strong> easy and simple. No matter <em>what</em> data you need -
          you can savely extract it to your local machine.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
          <div className="md:col-span-6">
            <Terminal>
              <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-semibold text-gray-900 flex ligatures-none overflow-auto">
                <code className="flex-none min-w-full p-5">
                  <span className="flex">
                    <svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3">
                      <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="flex-auto">
                      <span className="text-indigo-600"><span className="text-violet-800">let</span> queryParams</span> = &#123;{'\n'}
                      <span className="text-pink-600">   color</span>: &quot;blue&quot;,{'\n'}
                      <span className="text-pink-600">   cations__in</span>: [&quot;Cu2+&quot;],{'\n'}
                      <span className="text-pink-600">   anions__in</span>: [&quot;OH-&quot;, &quot;O2-&quot;],{'\n'}
                      <span className="text-pink-600">   discovery_year_max</span>: 1998,{'\n'}
                      <span>   ...</span>{'\n'}
                      <span>&#125;</span>
                    </span>
                  </span>
                </code>
              </pre>
            </Terminal>
          </div>

          <div className="md:col-span-6 flex flex-col space-y-2 md:space-y-4">
            <div>
              <div className="flex items-center">
                <h4 className="font-bold text-xl md:text-3xl">Fetch data flexibly<span className="mdi text-2xl md:text-3xl mdi-code-tags ml-2"></span></h4>
              </div>
              <p className="text-sm md:text-base mt-5">
                  Export the data in a preferred format or connect your application directly to our <strong>API</strong>.
                  We are updating our data services in order to meet the evolving demands of research community, please contact us in case of specific data format/output needs.
              </p>

            </div>
            <div>
              <div className="flex">
                <h4 className="font-bold text-xl md:text-3xl">Share the query<span className="mdi text-2xl md:text-3xl mdi-check-circle-outline ml-2"></span></h4>
              </div>
              <p className="text-sm md:text-base mt-5">
                  All filtering systems are connected to the query params of the <strong>URL string</strong> - you’ll <em>never</em> loose your results once you obtained them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="mt-20 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex justify-center items-center">
          <div className="flex self-center justify-center bg-yellow-300 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
            <span className="mdi text-3xl md:text-5xl mdi-cloud-download"></span>
          </div>
          <h3 className="font-bold text-2xl md:text-4xl">Research</h3>
        </div>
        <h2 className="font-black text-3xl sm:text-4xl md:text-6xl text-center mt-4">Do research with us</h2>
        <p className="text-sm md:text-base mt-7">
          We will gladly assist you in finding the right data in a right format.
          We believe in open science and open source - things that make our lives better.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-0 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14">
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className="font-bold text-xl md:text-3xl">Contribute<span className="mdi text-2xl md:text-3xl mdi-github ml-2"></span></h4>
            </div>
            <p className="text-sm md:text-base text-justify mt-5">
              Join our computing community <a className={utilsStyles.linkExternal} href="https://github.com/mineralogy-rocks" target="_blank" rel="noreferrer">mineralogy-rocks</a> and start contributing as a member. For code-related threads and suggestions, visit our
              <a className={utilsStyles.linkExternal} href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className="font-bold text-xl md:text-3xl">Core team<span className="mdi text-2xl md:text-3xl mdi-account-group ml-2"></span></h4>
            </div>
            <p className="text-sm md:text-base text-justify mt-5">
              The core team includes world className researchers in the area of mineralogy, geochemistry, petrology and geology from <a className={utilsStyles.linkExternal} href="https://uniba.sk" target="_blank" rel="noreferrer">Comenius University (Slovakia) 🇸🇰</a>,
              <a className={utilsStyles.linkExternal} href="https://www.unibe.ch/index_eng.html" target="_blank" rel="noreferrer">University of Bern (Switzerland) 🇨🇭</a>
              and <a className={utilsStyles.linkExternal} href="https://www.oulu.fi/en" target="_blank" rel="noreferrer">University of Oulu (Finland) 🇫🇮</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>;
}

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cx from 'clsx';

import Terminal from '@/components/content/Terminal';
import utilsStyles from '@/styles/utils.module.scss';
import typographyStyles from '@/styles/typography.module.scss';

import SAVLogo from 'public/assets/SAV_logo.jpg';
import UKLogo from 'public/assets/UK_logo.png';
import FNSLogo from 'public/assets/UK_FNS_logo.png';
import MSCALogo from 'public/assets/MSCA.png';


export default function Home() {
  return (
  <>
    <Head>
      <title>mineralogy.rocks</title>
    </Head>

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
            <Link href="/explore">
                <span className={cx(utilsStyles.link, 'group flex items-center')}>Start Exploring
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2 group-hover:animate-[wiggleRight_1s_infinite]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                </span>
            </Link>
          </div>

          <p className="text-base md:text-lg leading-normal text-left mt-7">
            <strong>Mineralogy.rocks</strong> provide seamless and simple way to access and filter mineralogical and related data.
            Our platform is designed both for researchers and developers.
          </p>
        </div>
      </div>
    </header>

    <section>
      <div className={typographyStyles.Section}>
        <div className="flex justify-center items-center">
            <div className="flex items-center justify-center bg-teal-300 rounded-full h-10 w-10 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h2 className="font-bold text-2xl md:text-4xl">Explore</h2>
        </div>
        <h3 className="text-center font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Start with exploring the data</h3>
        <p className="text-base md:text-lg leading-normal text-start mt-7">
            The platform is developed by the researchers for the researchers. Our goal is to provide data for scientific needs in a coherent fashion.
            Find the proper data subset and explore the relations between minerals.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
            <div className="md:col-span-6 flex flex-col">
                <h4 className="font-bold text-xl md:text-3xl">Researcher?</h4>
                <p className="text-base md:text-lg leading-normal text-left mt-5">
                    Check out our filtering system at <Link href="/explore" className={utilsStyles.link}>mineralogy.rocks/explore</Link>.
                    We are working towards a platform that would allow making complex queries, combining those and exploring the results.
                </p>
            </div>

            <div className="md:col-span-6 flex flex-col">
              <div className="flex flex-col gap-2 text-left text-base md:text-lg leading-normal">
                <div className="flex flex-wrap items-center">
                  <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-semibold flex items-center mr-2">1</span>
                  <p className="flex-1">
                    <code className="font-normal bg-slate-200 px-1 py-0.5 rounded">WHERE</code> discovery year <em>between</em> 1999 and 2001
                  </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1, 401 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-semibold flex items-center mr-2">2</span>
                    <p className="flex-1">
                      <code className="font-normal bg-slate-200 px-1 py-0.5 rounded">AND</code> discovery country <em>in</em> EU
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 198 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-semibold flex items-center mr-2">3</span>
                    <p className="text-base md:text-lg leading-normal">
                      <code className="font-normal bg-slate-200 px-1 py-0.5 rounded">AND</code> mineral formula <em>contains</em> As<sup>5+</sup>
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1 species — Vicanite-(Ce)</span>
                </div>
              </div>
            </div>
        </div>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
          <div className="md:col-span-6 flex flex-col">
            <h3 className="font-bold text-xl md:text-3xl">Developer?</h3>
            <p className="text-base md:text-lg leading-normal mt-5">
              The data is accessible via <a className={utilsStyles.linkExternal} href="https://api.mineralogy.rocks" target="_blank" rel="noopener noreferrer">api.mineralogy.rocks</a>{' '}
              through your favourite <code className="font-normal bg-slate-200 px-1 py-0.5 rounded">http client</code>.
              Reach out to us if you need an API key.
            </p>
            <p className="text-base md:text-lg leading-normal mt-2">
              Importantly, our system is built around <a className={utilsStyles.linkExternal} href="https://api.mindat.org" target="_blank" rel="noopener noreferrer">Mindat API</a>, which is a fascinating and a well-documented resource!
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
      <div className={typographyStyles.Section}>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center bg-pink-200 rounded-full h-10 w-10 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl md:text-4xl">Extract</h2>
        </div>
        <h3 className="font-black text-3xl sm:text-4xl md:text-6xl text-center mt-4">Download the data</h3>
        <p className="text-base md:text-lg leading-normal text-left mt-5">
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
                      <span className="text-rose-700">   color</span>: &quot;blue&quot;,{'\n'}
                      <span className="text-rose-700">   cations__in</span>: [&quot;Cu2+&quot;],{'\n'}
                      <span className="text-rose-700">   anions__in</span>: [&quot;OH-&quot;, &quot;O2-&quot;],{'\n'}
                      <span className="text-rose-700">   discovery_year_max</span>: 1998,{'\n'}
                      <span>   ...</span>{'\n'}
                      <span>&#125;</span>
                    </span>
                  </span>
                </code>
              </pre>
            </Terminal>
          </div>


          <div className="md:col-span-6 flex flex-col space-y-6 md:space-y-2">
            <div className="flex flex-col">
              <h4 className="font-bold text-xl md:text-3xl">Flexible data fetching</h4>
              <p className="text-base md:text-lg leading-normal mt-5">
                Export the data in a preferred format or connect your application directly to our <strong>API</strong>.
                We are updating our data services in order to meet the evolving demands of research community, please contact us in case of specific data format/output needs.
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold text-xl md:text-3xl">Share the query</h4>
              <p className="text-base md:text-lg leading-normal mt-5">
                All filtering systems are connected to the query params of the <strong>URL string</strong> - you’ll <em>never</em> loose your results once you obtained them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className={typographyStyles.Section}>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center bg-yellow-300 rounded-full h-10 w-10 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl md:text-4xl">Research</h2>
        </div>
        <h3 className="font-black text-3xl sm:text-4xl md:text-6xl text-center mt-4">Do research with us</h3>
        <p className="text-base md:text-lg leading-normal mt-7">
          We will gladly assist you in finding the right data in a right format.
          We believe in open science and open source—things that make our lives better.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-0 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14">
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className="font-bold text-xl md:text-3xl">Contribute<span className="mdi text-2xl md:text-3xl mdi-github ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg leading-normal mt-5">
              Join our computing community <a className={utilsStyles.linkExternal} href="https://github.com/mineralogy-rocks" target="_blank" rel="noreferrer">mineralogy-rocks</a> and start contributing as a member. For code-related threads and suggestions, visit our
              <a className={utilsStyles.linkExternal} href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className="font-bold text-xl md:text-3xl">Core team<span className="mdi text-2xl md:text-3xl mdi-account-group ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg leading-normal mt-5">
              The core team includes world-class mineralogy, geochemistry, petrology and geology researchers from <a className={utilsStyles.linkExternal} href="https://uniba.sk" target="_blank" rel="noreferrer">Comenius University (Slovakia) 🇸🇰</a>,
              <a className={utilsStyles.linkExternal} href="https://www.unibe.ch/index_eng.html" target="_blank" rel="noreferrer">University of Bern (Switzerland) 🇨🇭</a>
              and <a className={utilsStyles.linkExternal} href="https://www.oulu.fi/en" target="_blank" rel="noreferrer">University of Oulu (Finland) 🇫🇮</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 sm:px-8 mt-40 mx-auto">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl md:text-4xl">Supported by</h2>
        <div className="flex flex-row flex-wrap max-w-screen-xl mx-auto mt-10 gap-2 md:gap-5 lg:gap-10 items-center justify-evenly">
          <a href="https://www.sav.sk/" target="_blank" rel="noreferrer">
            <Image src={SAVLogo} alt="SAV" className="w-24 h-auto" />
          </a>
          <a href="https://uniba.sk" target="_blank" rel="noreferrer">
            <Image src={UKLogo} alt="UK" className="w-52 h-auto" />
          </a>
          <a href="https://fns.uniba.sk/" target="_blank" rel="noreferrer">
            <Image src={FNSLogo} alt="PrifUK" className="w-60 h-auto" />
          </a>
          <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">
            <Image src={MSCALogo} alt="MSCA" className="w-14 h-auto" />
          </a>
        </div>

        <div className="max-w-screen-md text-center mt-10">
          <p className="text-base md:text-lg">
            This project 3007/01/01 has received funding from the European Union&apos;s Horizon 2020 research and innovation programme
            under the <strong>Marie Skłodowska-Curie grant agreement No 945478</strong>.
          </p>
        </div>
      </div>
    </section>
  </>
  )};

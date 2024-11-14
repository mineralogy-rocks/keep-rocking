'use client'

import Image from 'next/image';

import { motion } from 'framer-motion';

import { InternalLink } from "@/components/Link";
import Terminal from '@/components/Content/Terminal';
import TypingTerminal from "@/components/Content/TypingTerminal";

import styles from './index.module.scss';
import typographyStyles from '@/styles/typography.module.scss';


import SAVLogo from 'public/assets/SAV_logo-light.jpg';
import UKLogo from 'public/assets/UK_logo.png';
import UKLogoDark from 'public/assets/UK_logo-dark.png';
import FNSLogo from 'public/assets/UK_FNS_logo.png';
import FNSLogoDark from 'public/assets/UK_FNS_logo-dark.png';
import MSCALogo from 'public/assets/MSCA.png';


export default function Home() {

   const variants = {
    enabled: (degrees: number) => ({
      rotate: degrees,
      transition: {
        type: "spring",
        bounce: 0.3,
        damping: 10,
        mass: 4,
        stiffness: 20,
        delay: 1,
      },
    }),
    initial: (degrees: number) => ({
      rotate: 0,
    })
  };


  return (
  <>
    <header>
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-center mt-24 text-center justify-center">
          <h1 className="max-w-md font-black text-font-primary text-6xl md:text-8xl mx-auto">
            Explore.
            Extract.
            Research.
          </h1>
          <div className="absolute translate-x-2 lg:translate-x-5 translate-y-2 mx-1 sm:mx-10 -z-10">
            <svg style={{ width: '100%', height: 640 }} viewBox="0 0 650 640" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <g className={styles.wrapper} clipPath="url(#a)">
                <motion.path custom={28}
                             variants={variants}
                             animate='enabled'
                             initial='initial'
                             d="M368.258 110.152C421.109 106.696 486.348 98.7746 509.39 125.905C532.345 153.084 512.967 215.277 497.689 265.478C482.411 315.678 471.098 353.849 450.144 398.965C429.189 444.08 398.592 496.141 351.893 516.882C305.144 537.536 242.341 526.957 187.87 497.582C133.312 468.255 87.1828 420.308 88.0845 370.987C88.9473 321.801 136.754 271.292 169.061 227.886C201.281 184.53 217.954 148.19 246.429 130.462C274.953 112.822 315.368 113.744 368.258 110.152Z"
                             fill="url(#b)"/>
                <motion.path custom={13}
                             variants={variants}
                             animate='enabled'
                             initial='initial'
                             d="M404.966 130.266C460.381 137.625 525.113 166.208 553.357 217.825C581.6 269.442 573.355 344.093 540.242 401.502C507.128 458.91 449.145 499.076 387.053 516.86C325.022 534.517 258.818 529.921 202.77 503.213C146.626 476.538 100.638 427.753 76.3293 367.906C51.8938 307.998 49.2002 236.901 82.9475 198.841C116.789 160.748 187.072 155.69 245.262 146.23C303.453 136.77 349.551 122.906 404.966 130.266Z"
                             fill="url(#c)"/>
              </g>
              <defs>
                <linearGradient id="b" x1="29.7463" y1="-30.7026" x2="529.305" y2="-30.7026"
                                gradientUnits="userSpaceOnUse">
                  <stop className={styles.gradientFrom}/>
                  <stop offset="1" className={styles.gradientTo}/>
                </linearGradient>
                <linearGradient id="c" x1="27.7238" y1="-32.7187" x2="529.686" y2="-32.7187"
                                gradientUnits="userSpaceOnUse">
                  <stop className={styles.gradientFrom} />
                  <stop offset="1" className={styles.gradientTo} />
                </linearGradient>
                <clipPath id="a">
                  <rect width="650" height="640" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

        </div>

        <div className="relative mx-auto px-6 sm:px-8 mt-20 md:mt-28">
          <div className="flex justify-center">
            <InternalLink hasIcon={false} href="/explore" {...{ prefetch: true }}>
              <span className='group link flex items-center text-base md:text-lg font-semibold'>Start Exploring
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                 stroke="currentColor" className="w-6 h-6 ml-2 group-hover:animate-[wiggleRight_1s_infinite]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
              </svg>
              </span>
            </InternalLink>
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
        <h3 className="text-font-primary text-start font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Start with exploring the data</h3>
        <p className="text-base md:text-lg leading-normal text-start mt-7">
            The platform is developed by the researchers for the researchers. Our goal is to provide data for scientific needs in a coherent fashion.
            Find the proper data subset and explore the relations between minerals.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-start">
            <div className="md:col-span-6 flex flex-col">
                <h4 className={typographyStyles.subtitle}>Researchers</h4>
                <p className="text-base md:text-lg leading-normal text-left mt-5">
                    Check out our filtering system at <InternalLink href="/explore" hasIcon={false}>mineralogy.rocks/explore</InternalLink>.
                    We are working towards a platform that would allow making complex queries, combining those and exploring the results.
                </p>
            </div>

            <div className="md:col-span-6 flex flex-col">
              <div className="flex flex-col gap-2 text-left text-base md:text-lg font-normal leading-normal">
                <div className="flex flex-wrap items-center">
                  <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">1</span>
                  <p className="flex-1">
                    <code className="font-normal bg-slate-500 px-1 py-0.5 rounded text-font-orange dark:text-font-primary">WHERE</code> discovery year <b>between</b> 1999 and 2001
                  </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1, 401 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">2</span>
                    <p className="flex-1">
                      <code className="bg-slate-500 px-1 py-0.5 rounded text-font-orange dark:text-font-primary">AND</code> discovery country <b>in</b> EU
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 198 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">3</span>
                    <p className="text-base md:text-lg leading-normal">
                      <code className="bg-slate-500 px-1 py-0.5 rounded text-font-orange dark:text-font-primary">AND</code> mineral formula <b>contains</b> As<sup>5+</sup>
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1 species — Vicanite-(Ce)</span>
                </div>
              </div>
            </div>
        </div>

        <div className="relative md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-start md:min-h-[200px]">
          <div className="md:col-span-6 flex flex-col">
            <h3 className={typographyStyles.subtitle}>Developers</h3>
            <p className="text-base md:text-lg leading-normal mt-5">
              The data is accessible via <a className="link external" href="https://api.mineralogy.rocks" target="_blank" rel="noopener noreferrer">api.mineralogy.rocks</a>{' '}
              through your favourite <code className="font-normal bg-slate-500 px-1 py-0.5 rounded text-font-orange dark:text-font-primary">http client</code>.
              Reach out to us if you need an API key.
            </p>
          </div>

          <TypingTerminal />
        </div>
      </div>
    </section>

    <section>
      <div className={typographyStyles.Section}>
        <h3 className="text-font-primary font-black text-3xl sm:text-4xl md:text-6xl text-start mt-4">Extract the data</h3>
        <p className="text-base md:text-lg leading-normal text-left mt-5">
          The platform makes the <strong>data extraction</strong> easy and simple. No matter <em>what</em> data you need -
          you can savely extract it to your local machine.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
          <div className="md:col-span-6">
            <Terminal>
              <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-semibold flex ligatures-none overflow-auto">
                <code className="flex-none min-w-full p-5">
                  <span className="flex">
                    <svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3">
                      <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="flex-auto">
                      <span className="text-indigo-600 dark:text-indigo-400"><span className="text-violet-800 dark:text-violet-200">let</span> queryParams</span> = &#123;{'\n'}
                      <span className="text-rose-700 dark:text-rose-300">   color</span>: &quot;blue&quot;,{'\n'}
                      <span className="text-rose-700 dark:text-rose-300">   cations__in</span>: [&quot;Cu2+&quot;],{'\n'}
                      <span className="text-rose-700 dark:text-rose-300">   anions__in</span>: [&quot;OH-&quot;, &quot;O2-&quot;],{'\n'}
                      <span className="text-rose-700 dark:text-rose-300">   discovery_year_max</span>: 1998,{'\n'}
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
              <h4 className={typographyStyles.subtitle}>Flexible data fetching</h4>
              <p className="text-base md:text-lg leading-normal mt-5">
                Export the data in a preferred format or connect your application directly to our <b>API</b>.
                We are updating our data services in order to meet the evolving demands of research community, please contact us in case of specific data format/output needs.
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className={typographyStyles.subtitle}>Share the query</h4>
              <p className="text-base md:text-lg leading-normal mt-5">
                All filtering systems are connected to the query params of the <b>URL string</b> - you’ll <em>never</em> loose your results once you obtained them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className={typographyStyles.Section}>
        <h3 className="text-font-primary font-black text-3xl sm:text-4xl md:text-6xl text-start mt-4">Do research</h3>
        <p className="text-base md:text-lg leading-normal mt-7">
          We will gladly assist you in finding the right data in a right format.
          We believe in open science and open source—things that make our lives better.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-0 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14">
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className={typographyStyles.subtitle}>Contribute<span className="mdi text-2xl md:text-3xl mdi-github ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg leading-normal mt-5">
              Join our computing community <a className="link external" href="https://github.com/mineralogy-rocks" target="_blank" rel="noreferrer">mineralogy-rocks</a> and start contributing as a member. For code-related threads and suggestions, visit our
              <a className="link external" href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className={typographyStyles.subtitle}>Core team<span className="mdi text-2xl md:text-3xl mdi-account-group ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg leading-normal mt-5">
              The core team includes world-class mineralogy, geochemistry, petrology and geology researchers from <a className="link external" href="https://uniba.sk" target="_blank" rel="noreferrer">Comenius University (Slovakia) 🇸🇰</a>,
              <a className="link external" href="https://www.unibe.ch/index_eng.html" target="_blank" rel="noreferrer"> University of Bern (Switzerland) 🇨🇭</a>
              and <a className="link external" href="https://www.oulu.fi/en" target="_blank" rel="noreferrer">University of Oulu (Finland) 🇫🇮</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 sm:px-8 mt-40 mx-auto max-w-6xl">
      <div className="flex flex-col">
        <h2 className="text-font-primary font-black text-xl sm:text-4xl md:text-4xl text-start mt-4">Funding and Sponsors</h2>

         <div className="flex flex-col md:flex-row justify-between items-center mt-7 gap-10 md:gap-5">
           <div className="max-w-md md:max-w-lg text-base md:text-lg leading-normal">
             <p className="">
               <strong>mineralogy.rocks</strong> is a non-profit outreach research project funded by academia since 2021. We always seek sponsors and donations to help us improve and evolve.
             </p>
             <p className="mt-4">
                We extend our heartfelt gratitude to our esteemed tech partners whose generous support and sponsorship have played a pivotal role in enhancing and sustaining our services.
             </p>
           </div>

           <div className="max-w-lg px-2 w-full">
            <svg width="100%" height="100%" viewBox="0 0 651 351" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200.5 225.5L225.5 238V263L200.5 250.5V225.5Z" fill="#7D3CEC"/>
              <path d="M225.5 238L250.5 225.5V250.5L225.5 263V238Z" fill="#000087"/>
              <path d="M175.5 238L200.5 250.5V275.5L175.5 263V238Z" fill="#7D3CEC"/>
              <path d="M200.5 250.5L225.5 238V263L200.5 275.5V250.5Z" fill="#000087"/>
              <path d="M100.5 213L125.5 200.5L150.5 213L125.5 225.5L100.5 213Z" fill="#4300B8"/>
              <path d="M100.5 213L125.5 225.5V250.5L100.5 238V213Z" fill="#7D3CEC"/>
              <path d="M125.5 225.5L150.5 213V238L125.5 250.5V225.5Z" fill="#000087"/>
              <path d="M138 175.5L163 163L188 175.5L163 188L138 175.5Z" fill="#4300B8"/>
              <path d="M138 175.5L163 188V213L138 200.5V175.5Z" fill="#7D3CEC"/>
              <path d="M163 188L188 175.5V200.5L163 213V188Z" fill="#000087"/>
              <path d="M138 263L163 250.5L188 263L163 275.5L138 263Z" fill="#4300B8"/>
              <path d="M138 263L163 275.5V300.5L138 288V263Z" fill="#7D3CEC"/>
              <path d="M163 275.5L188 263V288L163 300.5V275.5Z" fill="#000087"/>
              <path d="M163 188L188 175.5L213 188L188 200.5L163 188Z" fill="#4300B8"/>
              <path d="M163 188L188 200.5V225.5L163 213V188Z" fill="#7D3CEC"/>
              <path d="M188 200.5L213 188V213L188 225.5V200.5Z" fill="#000087"/>
              <path d="M200.5 200.5L225.5 188L250.5 200.5L225.5 213L200.5 200.5Z" fill="#4300B8"/>
              <path d="M200.5 200.5L225.5 213V238L200.5 225.5V200.5Z" fill="#7D3CEC"/>
              <path d="M225.5 213L250.5 200.5V225.5L225.5 238V213Z" fill="#000087"/>
              <path d="M175.5 213L200.5 200.5L225.5 213L200.5 225.5L175.5 213Z" fill="#4300B8"/>
              <path d="M175.5 213L200.5 225.5V250.5L175.5 238V213Z" fill="#7D3CEC"/>
              <path d="M200.5 225.5L225.5 213V238L200.5 250.5V225.5Z" fill="#000087"/>
              <path d="M225.5 250.5L250.5 238L275.5 250.5L250.5 263L225.5 250.5Z" fill="#4300B8"/>
              <path d="M225.5 250.5L250.5 263V288L225.5 275.5V250.5Z" fill="#7D3CEC"/>
              <path d="M250.5 263L275.5 250.5V275.5L250.5 288V263Z" fill="#000087"/>
              <path d="M200.5 150.5L225.5 138L250.5 150.5L225.5 163L200.5 150.5Z" fill="#4D00D1"/>
              <path d="M200.5 150.5L225.5 163V188L200.5 175.5V150.5Z" fill="#8941FF"/>
              <path d="M225.5 163L250.5 150.5V175.5L225.5 188V163Z" fill="#00009E"/>
              <path d="M250.5 163L275.5 150.5L300.5 163L275.5 175.5L250.5 163Z" fill="#5700A3"/>
              <path d="M250.5 163L275.5 175.5V200.5L250.5 188V163Z" fill="#8B3DD5"/>
              <path d="M275.5 175.5L300.5 163V188L275.5 200.5V175.5Z" fill="#1D0073"/>
              <path d="M275.5 175.5L300.5 163L325.5 175.5L300.5 188L275.5 175.5Z" fill="#5700A3"/>
              <path d="M275.5 175.5L300.5 188V213L275.5 200.5V175.5Z" fill="#8B3DD5"/>
              <path d="M300.5 188L325.5 175.5V200.5L300.5 213V188Z" fill="#1D0073"/>
              <path d="M275.5 150.5L300.5 138L325.5 150.5L300.5 163L275.5 150.5Z" fill="#5700A3"/>
              <path d="M275.5 150.5L300.5 163V188L275.5 175.5V150.5Z" fill="#8B3DD5"/>
              <path d="M300.5 163L325.5 150.5V175.5L300.5 188V163Z" fill="#1D0073"/>
              <path d="M225.5 113L250.5 100.5L275.5 113L250.5 125.5L225.5 113Z" fill="#5700A3"/>
              <path d="M225.5 113L250.5 125.5V150.5L225.5 138V113Z" fill="#8B3DD5"/>
              <path d="M250.5 125.5L275.5 113V138L250.5 150.5V125.5Z" fill="#1D0073"/>
              <path d="M225.5 88L250.5 75.5L275.5 88L250.5 100.5L225.5 88Z" fill="#5700A3"/>
              <path d="M225.5 88L250.5 100.5V125.5L225.5 113V88Z" fill="#8B3DD5"/>
              <path d="M250.5 100.5L275.5 88V113L250.5 125.5V100.5Z" fill="#1D0073"/>
              <path d="M313 263L338 250.5L363 263L338 275.5L313 263Z" fill="#7A08DD"/>
              <path d="M313 263L338 275.5V300.5L313 288V263Z" fill="#B14BFF"/>
              <path d="M338 275.5L363 263V288L338 300.5V275.5Z" fill="#4000AA"/>
              <path d="M350.5 238L375.5 225.5L400.5 238L375.5 250.5L350.5 238Z" fill="#7A08DD"/>
              <path d="M350.5 232L375.5 244.5V269.5L350.5 257V232Z" fill="#B14BFF"/>
              <path d="M375.5 250.5L400.5 238V263L375.5 275.5V250.5Z" fill="#4000AA"/>
              <path d="M350.5 188L375.5 175.5L400.5 188L375.5 200.5L350.5 188Z" fill="#7A08DD"/>
              <path d="M350.5 188L375.5 200.5V225.5L350.5 213V188Z" fill="#B14BFF"/>
              <path d="M375.5 200.5L400.5 188V213L375.5 225.5V200.5Z" fill="#4000AA"/>
              <path d="M375.5 200.5L400.5 188L425.5 200.5L400.5 213L375.5 200.5Z" fill="#7A08DD"/>
              <path d="M375.5 200.5L400.5 213V238L375.5 225.5V200.5Z" fill="#B14BFF"/>
              <path d="M400.5 213L425.5 200.5V225.5L400.5 238V213Z" fill="#4000AA"/>
              <path d="M400.5 188L425.5 175.5L450.5 188L425.5 200.5L400.5 188Z" fill="#7A08DD"/>
              <path d="M400.5 188L425.5 200.5V225.5L400.5 213V188Z" fill="#B14BFF"/>
              <path d="M425.5 200.5L450.5 188V213L425.5 225.5V200.5Z" fill="#4000AA"/>
              <path d="M375.5 175.5L400.5 163L425.5 175.5L400.5 188L375.5 175.5Z" fill="#7A08DD"/>
              <path d="M375.5 175.5L400.5 188V213L375.5 200.5V175.5Z" fill="#B14BFF"/>
              <path d="M400.5 188L425.5 175.5V200.5L400.5 213V188Z" fill="#4000AA"/>
              <path d="M400.5 213L425.5 200.5L450.5 213L425.5 225.5L400.5 213Z" fill="#7A08DD"/>
              <path d="M400.5 213L425.5 225.5V250.5L400.5 238V213Z" fill="#B14BFF"/>
              <path d="M425.5 225.5L450.5 213V238L425.5 250.5V225.5Z" fill="#4000AA"/>
              <path d="M350.5 225.5L375.5 213L400.5 225.5L375.5 238L350.5 225.5Z" fill="#7A08DD"/>
              <path d="M350.5 225.5L375.5 238V263L350.5 250.5V225.5Z" fill="#B14BFF"/>
              <path d="M375.5 238L400.5 225.5V250.5L375.5 263V238Z" fill="#4000AA"/>
              <path d="M358 204.5L383 192L408 204.5L383 217L358 204.5Z" fill="#7A08DD"/>
              <path d="M358 204.5L383 217V242L358 229.5V204.5Z" fill="#B14BFF"/>
              <path d="M383 217L408 204.5V229.5L383 242V217Z" fill="#4000AA"/>
              <path d="M388 250.5L413 238L438 250.5L413 263L388 250.5Z" fill="#7A08DD"/>
              <path d="M388 250.5L413 263V288L388 275.5V250.5Z" fill="#B14BFF"/>
              <path d="M413 263L438 250.5V275.5L413 288V263Z" fill="#4000AA"/>
              <path d="M363 263L388 250.5L413 263L388 275.5L363 263Z" fill="#7A08DD"/>
              <path d="M363 263L388 275.5V300.5L363 288V263Z" fill="#B14BFF"/>
              <path d="M388 275.5L413 263V288L388 300.5V275.5Z" fill="#4000AA"/>
              <path d="M288 225.5L313 213L338 225.5L313 238L288 225.5Z" fill="#7A08DD"/>
              <path d="M288 225.5L313 238V263L288 250.5V225.5Z" fill="#B14BFF"/>
              <path d="M313 238L338 225.5V250.5L313 263V238Z" fill="#4000AA"/>
              <path d="M50.5 263L75.5 250.5L100.5 263L75.5 275.5L50.5 263Z" fill="#2800B8"/>
              <path d="M50.5 263L75.5 275.5V300.5L50.5 288V263Z" fill="#6B39EC"/>
              <path d="M75.5 275.5L100.5 263V288L75.5 300.5V275.5Z" fill="#000087"/>
              <path d="M463 25.5L488 13L513 25.5L488 38L463 25.5Z" fill="#9400BD"/>
              <path d="M463 25.5L488 38V63L463 50.5V25.5Z" fill="#C94BF0"/>
              <path d="M488 38L513 25.5V50.5L488 63V38Z" fill="#60008C"/>
              <path d="M438 38L463 25.5L488 38L463 50.5L438 38Z" fill="#9400BD"/>
              <path d="M438 38L463 50.5V75.5L438 63V38Z" fill="#C94BF0"/>
              <path d="M463 50.5L488 38V63L463 75.5V50.5Z" fill="#60008C"/>
              <path d="M425.5 50.5L450.5 38L475.5 50.5L450.5 63L425.5 50.5Z" fill="#9400BD"/>
              <path d="M425.5 50.5L450.5 63V88L425.5 75.5V50.5Z" fill="#C94BF0"/>
              <path d="M450.5 63L475.5 50.5V75.5L450.5 88V63Z" fill="#60008C"/>
              <path d="M413 63L438 50.5L463 63L438 75.5L413 63Z" fill="#9400BD"/>
              <path d="M413 63L438 75.5V100.5L413 88V63Z" fill="#C94BF0"/>
              <path d="M438 75.5L463 63V88L438 100.5V75.5Z" fill="#60008C"/>
              <path d="M400.5 75.5L425.5 63L450.5 75.5L425.5 88L400.5 75.5Z" fill="#9400BD"/>
              <path d="M400.5 75.5L425.5 88V113L400.5 100.5V75.5Z" fill="#C94BF0"/>
              <path d="M425.5 88L450.5 75.5V100.5L425.5 113V88Z" fill="#60008C"/>
              <path d="M426 25.5L451 13L476 25.5L451 38L426 25.5Z" fill="#9400BD"/>
              <path d="M426 25.5L451 38V63L426 50.5V25.5Z" fill="#C94BF0"/>
              <path d="M451 38L476 25.5V50.5L451 63V38Z" fill="#60008C"/>
              <path d="M388 100.5L413 88L438 100.5L413 113L388 100.5Z" fill="#9400BD"/>
              <path d="M388 100.5L413 113V138L388 125.5V100.5Z" fill="#C94BF0"/>
              <path d="M413 113L438 100.5V125.5L413 138V113Z" fill="#60008C"/>
              <path d="M388 75.5L413 63L438 75.5L413 88L388 75.5Z" fill="#9400BD"/>
              <path d="M388 75.5L413 88V113L388 100.5V75.5Z" fill="#C94BF0"/>
              <path d="M413 88L438 75.5V100.5L413 113V88Z" fill="#60008C"/>
              <path d="M388 50.5L413 38L438 50.5L413 63L388 50.5Z" fill="#9400BD"/>
              <path d="M388 50.5L413 63V88L388 75.5V50.5Z" fill="#C94BF0"/>
              <path d="M413 63L438 50.5V75.5L413 88V63Z" fill="#60008C"/>
              <path d="M413 125.5L438 113L463 125.5L438 138L413 125.5Z" fill="#9400BD"/>
              <path d="M413 125.5L438 138V163L413 150.5V125.5Z" fill="#C94BF0"/>
              <path d="M438 138L463 125.5V150.5L438 163V138Z" fill="#60008C"/>
              <path d="M475.5 113L500.5 100.5L525.5 113L500.5 125.5L475.5 113Z" fill="#9400BD"/>
              <path d="M475.5 113L500.5 125.5V150.5L475.5 138V113Z" fill="#C94BF0"/>
              <path d="M500.5 125.5L525.5 113V138L500.5 150.5V125.5Z" fill="#60008C"/>
              <path d="M475.5 88L500.5 75.5L525.5 88L500.5 100.5L475.5 88Z" fill="#9400BD"/>
              <path d="M475.5 88L500.5 100.5V125.5L475.5 113V88Z" fill="#C94BF0"/>
              <path d="M500.5 100.5L525.5 88V113L500.5 125.5V100.5Z" fill="#60008C"/>
              <path d="M463 138L488 125.5L513 138L488 150.5L463 138Z" fill="#9400BD"/>
              <path d="M463 138L488 150.5V175.5L463 163V138Z" fill="#C94BF0"/>
              <path d="M488 150.5L513 138V163L488 175.5V150.5Z" fill="#60008C"/>
              <path d="M463 125.5L488 113L513 125.5L488 138L463 125.5Z" fill="#9400BD"/>
              <path d="M463 125.5L488 138V163L463 150.5V125.5Z" fill="#C94BF0"/>
              <path d="M488 138L513 125.5V150.5L488 163V138Z" fill="#60008C"/>
              <path d="M500.5 138L525.5 125.5L550.5 138L525.5 150.5L500.5 138Z" fill="#9400BD"/>
              <path d="M500.5 138L525.5 150.5V175.5L500.5 163V138Z" fill="#C94BF0"/>
              <path d="M525.5 150.5L550.5 138V163L525.5 175.5V150.5Z" fill="#60008C"/>
              <path d="M488 150.5L513 138L538 150.5L513 163L488 150.5Z" fill="#9400BD"/>
              <path d="M488 150.5L513 163V188L488 175.5V150.5Z" fill="#C94BF0"/>
              <path d="M513 163L538 150.5V175.5L513 188V163Z" fill="#60008C"/>
              <path d="M525.5 175.5L550.5 163L575.5 175.5L550.5 188L525.5 175.5Z" fill="#9400BD"/>
              <path d="M525.5 175.5L550.5 188V213L525.5 200.5V175.5Z" fill="#C94BF0"/>
              <path d="M550.5 188L575.5 175.5V200.5L550.5 213V188Z" fill="#60008C"/>
              <path d="M550.5 163L575.5 150.5L600.5 163L575.5 175.5L550.5 163Z" fill="#9400BD"/>
              <path d="M550.5 163L575.5 175.5V200.5L550.5 188V163Z" fill="#C94BF0"/>
              <path d="M575.5 175.5L600.5 163V188L575.5 200.5V175.5Z" fill="#60008C"/>
              <path d="M550.5 188L575.5 175.5L600.5 188L575.5 200.5L550.5 188Z" fill="#9400BD"/>
              <path d="M550.5 188L575.5 200.5V225.5L550.5 213V188Z" fill="#C94BF0"/>
              <path d="M575.5 200.5L600.5 188V213L575.5 225.5V200.5Z" fill="#60008C"/>
              <path d="M550.5 163L575.5 150.5L600.5 163L575.5 175.5L550.5 163Z" fill="#9400BD"/>
              <path d="M550.5 163L575.5 175.5V200.5L550.5 188V163Z" fill="#C94BF0"/>
              <path d="M575.5 175.5L600.5 163V188L575.5 200.5V175.5Z" fill="#60008C"/>
              <path d="M338 113L363 100.5L388 113L363 125.5L338 113Z" fill="#9400BD"/>
              <path d="M338 113L363 125.5V150.5L338 138V113Z" fill="#C94BF0"/>
              <path d="M363 125.5L388 113V138L363 150.5V125.5Z" fill="#60008C"/>
              <path d="M350.5 38L375.5 25.5L400.5 38L375.5 50.5L350.5 38Z" fill="#9400BD"/>
              <path d="M350.5 38L375.5 50.5V75.5L350.5 63V38Z" fill="#C94BF0"/>
              <path d="M375.5 50.5L400.5 38V63L375.5 75.5V50.5Z" fill="#60008C"/>
              <path d="M350.5 13L375.5 0.5L400.5 13L375.5 25.5L350.5 13Z" fill="#9400BD"/>
              <path d="M350.5 13L375.5 25.5V50.5L350.5 38V13Z" fill="#C94BF0"/>
              <path d="M375.5 25.5L400.5 13V38L375.5 50.5V25.5Z" fill="#60008C"/>
              <path d="M388 25.5L413 13L438 25.5L413 38L388 25.5Z" fill="#9400BD"/>
              <path d="M388 25.5L413 38V63L388 50.5V25.5Z" fill="#C94BF0"/>
              <path d="M413 38L438 25.5V50.5L413 63V38Z" fill="#60008C"/>
              <path d="M388 13L413 0.5L438 13L413 25.5L388 13Z" fill="#9400BD"/>
              <path d="M388 13L413 25.5V50.5L388 38V13Z" fill="#C94BF0"/>
              <path d="M413 25.5L438 13V38L413 50.5V25.5Z" fill="#60008C"/>
              <path d="M363 25.5L388 13L413 25.5L388 38L363 25.5Z" fill="#9400BD"/>
              <path d="M363 25.5L388 38V63L363 50.5V25.5Z" fill="#C94BF0"/>
              <path d="M388 38L413 25.5V50.5L388 63V38Z" fill="#60008C"/>
              <path d="M338 38L363 25.5L388 38L363 50.5L338 38Z" fill="#9400BD"/>
              <path d="M338 38L363 50.5V75.5L338 63V38Z" fill="#C94BF0"/>
              <path d="M363 50.5L388 38V63L363 75.5V50.5Z" fill="#60008C"/>
              <path d="M338 63L363 75.5V100.5L338 88V63Z" fill="#C94BF0"/>
              <path d="M363 75.5L388 63V88L363 100.5V75.5Z" fill="#60008C"/>
              <path d="M338 88L363 100.5V125.5L338 113V88Z" fill="#C94BF0"/>
              <path d="M363 100.5L388 88V113L363 125.5V100.5Z" fill="#60008C"/>
              <path d="M550.5 138L575.5 150.5V175.5L550.5 163V138Z" fill="#C94BF0"/>
              <path d="M575.5 150.5L600.5 138V163L575.5 175.5V150.5Z" fill="#60008C"/>
              <path d="M550.5 113L575.5 100.5L600.5 113L575.5 125.5L550.5 113Z" fill="#9400BD"/>
              <path d="M550.5 113L575.5 125.5V150.5L550.5 138V113Z" fill="#C94BF0"/>
              <path d="M575.5 125.5L600.5 113V138L575.5 150.5V125.5Z" fill="#60008C"/>
              <path d="M575.5 125.5L600.5 113L625.5 125.5L600.5 138L575.5 125.5Z" fill="#9400BD"/>
              <path d="M575.5 125.5L600.5 138V163L575.5 150.5V125.5Z" fill="#C94BF0"/>
              <path d="M600.5 138L625.5 125.5V150.5L600.5 163V138Z" fill="#60008C"/>
              <path d="M600.5 138L625.5 125.5L650.5 138L625.5 150.5L600.5 138Z" fill="#9400BD"/>
              <path d="M600.5 138L625.5 150.5V175.5L600.5 163V138Z" fill="#C94BF0"/>
              <path d="M625.5 150.5L650.5 138V163L625.5 175.5V150.5Z" fill="#60008C"/>
              <path d="M600.5 163L625.5 175.5V200.5L600.5 188V163Z" fill="#C94BF0"/>
              <path d="M625.5 175.5L650.5 163V188L625.5 200.5V175.5Z" fill="#60008C"/>
              <path d="M600.5 188L625.5 200.5V225.5L600.5 213V188Z" fill="#C94BF0"/>
              <path d="M625.5 200.5L650.5 188V213L625.5 225.5V200.5Z" fill="#60008C"/>
              <path d="M600.5 213L625.5 225.5V250.5L600.5 238V213Z" fill="#C94BF0"/>
              <path d="M625.5 225.5L650.5 213V238L625.5 250.5V225.5Z" fill="#60008C"/>
              <path d="M575.5 225.5L600.5 213L625.5 225.5L600.5 238L575.5 225.5Z" fill="#9400BD"/>
              <path d="M575.5 225.5L600.5 238V263L575.5 250.5V225.5Z" fill="#C94BF0"/>
              <path d="M600.5 238L625.5 225.5V250.5L600.5 263V238Z" fill="#60008C"/>
              <path d="M550.5 238L575.5 225.5L600.5 238L575.5 250.5L550.5 238Z" fill="#9400BD"/>
              <path d="M550.5 238L575.5 250.5V275.5L550.5 263V238Z" fill="#C94BF0"/>
              <path d="M575.5 250.5L600.5 238V263L575.5 275.5V250.5Z" fill="#60008C"/>
              <path d="M525.5 250.5L550.5 238L575.5 250.5L550.5 263L525.5 250.5Z" fill="#9400BD"/>
              <path d="M525.5 250.5L550.5 263V288L525.5 275.5V250.5Z" fill="#C94BF0"/>
              <path d="M550.5 263L575.5 250.5V275.5L550.5 288V263Z" fill="#60008C"/>
              <path d="M500.5 88L525.5 75.5L550.5 88L525.5 100.5L500.5 88Z" fill="#9400BD"/>
              <path d="M525.5 100.5L550.5 88V113L525.5 125.5V100.5Z" fill="#60008C"/>
              <path d="M525.5 75.5L550.5 63L575.5 75.5L550.5 88L525.5 75.5Z" fill="#9400BD"/>
              <path d="M550.5 88L575.5 75.5V100.5L550.5 113V88Z" fill="#60008C"/>
              <path d="M0.5 275.5L25.5 263L50.5 275.5L25.5 288L0.5 275.5Z" fill="#200080"/>
              <path d="M0.5 275.5L25.5 288V313L0.5 300.5V275.5Z" fill="#5930B1"/>
              <path d="M25.5 288L50.5 275.5V300.5L25.5 313V288Z" fill="#000053"/>
              <path d="M13 225.5L38 213L63 225.5L38 238L13 225.5Z" fill="#200080"/>
              <path d="M13 225.5L38 238V263L13 250.5V225.5Z" fill="#5930B1"/>
              <path d="M38 238L63 225.5V250.5L38 263V238Z" fill="#000053"/>
              <path d="M288 100.5L313 88L338 100.5L313 113L288 100.5Z" fill="#7C00DB"/>
              <path d="M288 100.5L313 113V138L288 125.5V100.5Z" fill="#B349FF"/>
              <path d="M313 113L338 100.5V125.5L313 138V113Z" fill="#4200A8"/>
              <path d="M450.5 250.5L475.5 238L500.5 250.5L475.5 263L450.5 250.5Z" fill="#7C00DB"/>
              <path d="M450.5 250.5L475.5 263V288L450.5 275.5V250.5Z" fill="#B349FF"/>
              <path d="M475.5 263L500.5 250.5V275.5L475.5 288V263Z" fill="#4200A8"/>
              <path d="M425.5 263L450.5 250.5L475.5 263L450.5 275.5L425.5 263Z" fill="#7C00DB"/>
              <path d="M425.5 263L450.5 275.5V300.5L425.5 288V263Z" fill="#B349FF"/>
              <path d="M450.5 275.5L475.5 263V288L450.5 300.5V275.5Z" fill="#4200A8"/>
              <path d="M450.5 225.5L475.5 213L500.5 225.5L475.5 238L450.5 225.5Z" fill="#7C00DB"/>
              <path d="M450.5 225.5L475.5 238V263L450.5 250.5V225.5Z" fill="#B349FF"/>
              <path d="M475.5 238L500.5 225.5V250.5L475.5 263V238Z" fill="#4200A8"/>
              <path d="M163 313L188 300.5L213 313L188 325.5L163 313Z" fill="#020080"/>
              <path d="M163 313L188 325.5V350.5L163 338V313Z" fill="#4D2EB1"/>
              <path d="M188 325.5L213 313V338L188 350.5V325.5Z" fill="#000053"/>
              <path d="M163 113L188 100.5L213 113L188 125.5L163 113Z" fill="#020080"/>
              <path d="M163 113L188 125.5V150.5L163 138V113Z" fill="#4D2EB1"/>
              <path d="M188 125.5L213 113V138L188 150.5V125.5Z" fill="#000053"/>
              <path d="M13 213L38 200.5L63 213L38 225.5L13 213Z" fill="#020080"/>
              <path d="M13 213L38 225.5V250.5L13 238V213Z" fill="#4D2EB1"/>
              <path d="M38 225.5L63 213V238L38 250.5V225.5Z" fill="#000053"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-10 mt-10 md:mt-20">
            <a href="https://www.datadoghq.com/" target="_blank" rel="noreferrer" className="h-20 md:h-24 p-2">
              <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_538_124)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.81275 119.834H0.0371094V101.933H7.81275C13.4147 101.933 16.2195 104.755 16.2195 110.395C16.2195 116.684 13.4147 119.834 7.81275 119.834ZM3.36203 116.952H7.31056C11.0327 116.952 12.8916 114.767 12.8916 110.392C12.8916 106.669 11.0327 104.807 7.31056 104.807H3.36203V116.952ZM19.7033 119.834H16.29L23.9037 101.933H27.4775L35.2576 119.834H31.6808L29.4232 114.951H23.6773L24.8196 112.074H28.5463L25.6096 105.35L19.7033 119.834ZM33.3778 101.933H46.9893V104.811H41.846V119.834H38.5226V104.811H33.3763L33.3778 101.933ZM48.6982 119.834H45.2848L52.9001 101.933H56.4738L64.2525 119.834H60.6757L58.4181 114.951H52.6722L53.8115 112.074H57.5382L54.6015 105.35L48.6982 119.834ZM74.2332 119.834H66.4576V101.933H74.2332C79.8382 101.933 82.64 104.755 82.64 110.395C82.64 116.684 79.8382 119.834 74.2332 119.834ZM69.781 116.952H73.7325C77.4517 116.952 79.3151 114.767 79.3151 110.392C79.3151 106.669 77.4517 104.807 73.7325 104.807H69.781V116.952ZM84.8901 110.908C84.8901 104.838 87.8957 101.804 93.8994 101.804C99.8118 101.804 102.766 104.838 102.766 110.908C102.766 116.942 99.8118 119.963 93.8994 119.963C88.161 119.961 85.1614 116.942 84.8901 110.908ZM93.8994 117.077C97.5107 117.077 99.3171 114.996 99.3171 110.832C99.3171 106.732 97.5107 104.68 93.8994 104.68C90.1938 104.68 88.3424 106.732 88.3424 110.832C88.3439 114.996 90.1953 117.077 93.8994 117.077ZM116.637 112.59V116.78C115.87 116.981 115.182 117.078 114.581 117.078C110.514 117.078 108.484 114.93 108.484 110.632C108.484 106.664 110.639 104.681 114.943 104.681C116.742 104.681 118.414 105.015 119.961 105.684V102.678C118.415 102.095 116.66 101.801 114.693 101.801C108.254 101.801 105.033 104.743 105.033 110.631C105.033 116.846 108.199 119.96 114.53 119.96C116.708 119.96 118.517 119.642 119.962 119.006V109.641H114.594L113.471 112.587H116.637V112.59Z" fill="#632CA6"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M89.9992 67.5673L82.0872 62.3475L75.4868 73.3731L67.8101 71.129L61.0508 81.4456L61.3971 84.6926L98.1496 77.9198L96.015 54.9557L89.9992 67.5673ZM55.7262 57.6675L61.6235 56.8565C62.5769 57.2852 63.241 57.4486 64.3848 57.7394C66.1671 58.2026 68.2284 58.6478 71.2819 57.1098C71.9925 56.7575 73.4736 55.4039 74.0717 54.6319L98.2306 50.2501L100.695 80.0785L59.3044 87.5378L55.7262 57.6675ZM100.602 46.9192L98.2171 47.3734L93.636 0.0389709L15.5723 9.09031L25.1903 87.1345L34.3285 85.8079C33.5985 84.766 32.4622 83.5053 30.5224 81.8923C27.8316 79.6572 28.782 75.8586 30.371 73.4601C32.4712 69.4081 43.2929 64.2588 42.6798 57.7829C42.4595 55.4279 42.0862 52.3638 39.8991 50.2621C39.8166 51.1345 39.965 51.9725 39.965 51.9725C39.965 51.9725 39.0671 50.8272 38.6204 49.2667C38.1766 48.6671 37.8274 48.4767 37.3551 47.6762C37.0179 48.6011 37.0628 49.6744 37.0628 49.6744C37.0628 49.6744 36.3283 47.94 36.2099 46.4755C35.7751 47.1305 35.6657 48.3748 35.6657 48.3748C35.6657 48.3748 34.7123 45.6405 34.9297 44.1669C34.4949 42.8852 33.2042 40.3413 33.5685 34.5609C35.9505 36.2294 41.1957 35.8336 43.239 32.822C43.9165 31.8236 44.3828 29.1013 42.9002 23.7347C41.9483 20.2943 39.5918 15.1705 38.6728 13.2262L38.5634 13.3057C39.0476 14.8722 40.046 18.1537 40.4297 19.7472C41.59 24.5741 41.9003 26.2561 41.3561 28.4822C40.8929 30.4175 39.7821 31.6827 36.9669 33.0978C34.1517 34.5174 30.4145 31.0621 30.1791 30.8717C27.4433 28.6921 25.3267 25.1378 25.0913 23.4094C24.8455 21.519 26.1811 20.3843 26.8542 18.8387C25.8903 19.1131 24.817 19.6032 24.817 19.6032C24.817 19.6032 26.0987 18.2766 27.6787 17.1298C28.3338 16.6966 28.7175 16.4207 29.4071 15.8481C28.4087 15.8316 27.5977 15.8601 27.5977 15.8601C27.5977 15.8601 29.2632 14.9606 30.9886 14.3056C29.7264 14.2501 28.5167 14.2966 28.5167 14.2966C28.5167 14.2966 32.2328 12.6341 35.1665 11.4154C37.1843 10.5879 39.1555 10.8322 40.2633 12.4347C41.7174 14.5334 43.245 15.6727 46.4814 16.3788C48.4692 15.4973 49.0718 15.0461 51.5693 14.364C53.7669 11.946 55.4923 11.6342 55.4923 11.6342C55.4923 11.6342 54.6363 12.4197 54.407 13.6535C55.6527 12.6716 57.0184 11.8516 57.0184 11.8516C57.0184 11.8516 56.4892 12.5037 55.996 13.541L56.1099 13.7119C57.564 12.8395 59.2729 12.1529 59.2729 12.1529C59.2729 12.1529 58.7843 12.7705 58.2116 13.5695C59.3089 13.5605 61.532 13.616 62.3955 13.7134C67.4908 13.8259 68.5476 8.27333 70.5024 7.57626C72.9504 6.70231 74.0447 6.17314 78.2166 10.2716C81.7949 13.7914 84.5921 20.0874 83.2025 21.4981C82.0377 22.6688 79.7412 21.0408 77.1957 17.8688C75.8511 16.1884 74.8332 14.2021 74.3565 11.6777C73.9548 9.54753 72.3897 8.3123 72.3897 8.3123C72.3897 8.3123 73.2967 10.336 73.2967 12.1184C73.2967 13.0928 73.4181 16.734 74.9801 18.7788C74.8257 19.0771 74.7538 20.2568 74.5829 20.4832C72.766 18.2871 68.864 16.716 68.2269 16.2528C70.381 18.0172 75.3309 22.0707 77.2317 25.9578C79.0306 29.632 77.9708 33.0004 78.8807 33.8713C79.14 34.1202 82.7483 38.6174 83.4423 40.8764C84.6536 44.813 83.5143 48.9519 81.9298 51.5183L77.5031 52.2079C76.8555 52.028 76.4192 51.938 75.8391 51.6022C76.1599 51.0356 76.7955 49.6235 76.8015 49.3312L76.5511 48.8934C75.1735 50.8452 72.8665 52.74 70.9492 53.8284C68.4397 55.251 65.548 55.0306 63.6652 54.449C58.3225 52.8015 53.2692 49.1903 52.0505 48.2413C52.0505 48.2413 52.013 48.9984 52.2423 49.1693C53.5885 50.6893 56.6751 53.4371 59.6597 55.3544L53.2992 56.0545L56.3063 79.4653C54.9736 79.6557 54.7653 79.7502 53.3067 79.957C52.0205 75.4134 49.5605 72.4467 46.8712 70.7183C44.4997 69.1938 41.2287 68.8505 38.0987 69.4711L37.8978 69.7049C40.0744 69.4786 42.6438 69.7934 45.2837 71.4648C47.8741 73.1033 49.9623 77.3352 50.7313 79.8821C51.7162 83.138 52.3967 86.6219 49.7464 90.314C47.8621 92.9389 42.3605 94.3885 37.9143 91.251C39.1016 93.1608 40.7056 94.7213 42.8672 95.0151C46.0752 95.4513 49.1198 94.8937 51.2155 92.7425C53.0039 90.9032 53.9543 87.0566 53.7039 83.0061L56.5357 82.5954L57.558 89.8658L104.426 84.2219L100.602 46.9192ZM72.0869 27.175C71.9565 27.4733 71.7496 27.6697 72.0585 28.6411L72.0764 28.6966L72.1259 28.8225L72.2548 29.1133C72.811 30.2511 73.4211 31.3229 74.4435 31.8716C74.7073 31.8266 74.9816 31.7966 75.2649 31.7831C76.2243 31.7412 76.83 31.8926 77.2122 32.0994C77.2467 31.9076 77.2542 31.6287 77.2332 31.2165C77.1583 29.7759 77.518 27.3264 74.7493 26.0372C73.7044 25.553 72.2383 25.7014 71.7496 26.3071C71.8381 26.319 71.9175 26.337 71.9805 26.358C72.721 26.6144 72.2204 26.8692 72.0869 27.175ZM79.8491 40.6156C79.4863 40.4147 77.7894 40.4942 76.5961 40.6366C74.3235 40.9049 71.8696 41.6919 71.3329 42.1117C70.3555 42.8672 70.7992 44.1834 71.5218 44.7245C73.547 46.2371 75.3219 47.252 77.1942 47.0046C78.344 46.8532 79.3589 45.0319 80.0769 43.3799C80.5686 42.2421 80.5686 41.0144 79.8491 40.6156ZM59.7302 28.9574C60.3703 28.3488 56.5387 27.5498 53.5645 29.578C51.3714 31.0741 51.3009 34.2821 53.4011 36.1004C53.611 36.2803 53.7849 36.4077 53.9453 36.5127C54.5584 36.2234 55.257 35.9325 56.062 35.6717C57.4201 35.231 58.5504 35.0031 59.4783 34.8817C59.922 34.3855 60.4392 33.5116 60.3103 31.9285C60.1334 29.7804 58.5084 30.1207 59.7302 28.9574Z" fill="#632CA6"/>
                </g>
                <defs>
                  <clipPath id="clip0_538_124">
                    <rect width="120" height="120" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
          <a href="https://sentry.io/" target="_blank" rel="noreferrer" className="h-20 md:h-24 p-4">
            <svg width="100%" height="100%" viewBox="0 0 365 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_539_780)">
                <path d="M53.3584 4.63355C52.6035 3.38081 51.5377 2.34445 50.2643 1.62503C48.9909 0.905609 47.5532 0.527557 46.0906 0.527557C44.628 0.527557 43.1903 0.905609 41.9169 1.62503C40.6435 2.34445 39.5777 3.38081 38.8228 4.63355L26.8673 25.1105C36.0008 29.6705 43.7827 36.5402 49.4402 45.0377C55.0977 53.5351 58.4341 63.3646 59.1181 73.5502H50.7238C50.0411 64.8192 47.0904 56.4179 42.1636 49.1776C37.2369 41.9372 30.5049 36.1088 22.6339 32.2692L11.5687 51.4017C15.9935 53.3861 19.8484 56.4513 22.7789 60.3152C25.7094 64.1791 27.6214 68.7178 28.3391 73.5138H9.0613C8.83267 73.4977 8.61167 73.4248 8.41821 73.3019C8.22476 73.179 8.06494 73.0099 7.95317 72.8098C7.84141 72.6097 7.7812 72.3849 7.778 72.1557C7.77479 71.9266 7.82868 71.7002 7.9348 71.497L13.2766 62.4123C11.4668 60.9024 9.39845 59.7327 7.17168 58.9601L1.88438 68.0448C1.33394 68.989 0.976606 70.0331 0.833122 71.1165C0.689639 72.1999 0.762871 73.301 1.04856 74.3559C1.33426 75.4108 1.82672 76.3983 2.49733 77.2613C3.16795 78.1242 4.00335 78.8453 4.95501 79.3826C6.20888 80.089 7.62213 80.4642 9.0613 80.4727H35.4615C35.9518 74.4224 34.8713 68.348 32.3248 62.8379C29.7782 57.3277 25.8518 52.5686 20.9259 49.0215L25.1231 41.7537C31.3396 46.0234 36.3354 51.8403 39.6173 58.6303C42.8992 65.4204 44.3538 72.9488 43.8376 80.4727H66.2042C66.725 69.075 64.2454 57.7402 59.0132 47.601C53.781 37.4618 45.9795 28.8734 36.3881 22.694L44.8732 8.15842C45.0623 7.84162 45.3689 7.61234 45.7262 7.52046C46.0835 7.42858 46.4626 7.48155 46.781 7.66784C47.744 8.19475 83.6468 70.8429 84.3191 71.5697C84.4375 71.7821 84.4978 72.0219 84.4938 72.2651C84.4898 72.5082 84.4216 72.746 84.2962 72.9543C84.1709 73.1626 83.9927 73.3342 83.7798 73.4516C83.5668 73.569 83.3267 73.6281 83.0836 73.6229H74.4349C74.5439 75.9364 74.5439 78.244 74.4349 80.5454H83.1199C84.2227 80.5526 85.316 80.341 86.3366 79.9229C87.3571 79.5047 88.2845 78.8883 89.0652 78.1093C89.8459 77.3303 90.4643 76.4042 90.8847 75.3846C91.305 74.365 91.519 73.2722 91.5142 72.1693C91.5153 70.7126 91.1263 69.2822 90.3877 68.0267L53.3584 4.63355ZM226.549 51.9104L199.731 17.2795H193.045V63.7024H199.822V28.1266L227.403 63.7024H233.327V17.2795H226.549V51.9104ZM159.014 43.2981H183.052V37.2658H158.995V23.2935H186.122V17.2613H152.091V63.7024H186.468V57.6701H158.995L159.014 43.2981ZM130.742 37.4112C121.385 35.1582 118.768 33.3776 118.768 29.0533C118.768 25.165 122.202 22.5304 127.326 22.5304C131.992 22.6671 136.493 24.2903 140.172 27.1636L143.806 22.0217C139.148 18.3705 133.37 16.4445 127.453 16.5709C118.26 16.5709 111.846 22.0217 111.846 29.78C111.846 38.138 117.297 41.0269 127.217 43.4434C136.047 45.4784 138.755 47.368 138.755 51.6015C138.755 55.835 135.121 58.4514 129.506 58.4514C123.917 58.4258 118.539 56.3133 114.426 52.5282L110.338 57.4157C115.606 61.9422 122.325 64.4248 129.27 64.411C139.227 64.411 145.623 59.051 145.623 50.7657C145.568 43.7523 141.426 39.9913 130.742 37.4112ZM356.243 17.2795L342.27 39.0828L328.389 17.2795H320.285L338.618 45.3512V63.7205H345.595V45.1332L364.056 17.2795H356.243ZM238.814 23.5661H254.022V63.7205H260.999V23.5661H276.206V17.2795H238.832L238.814 23.5661ZM308.475 45.5874C315.489 43.6433 319.377 38.7376 319.377 31.7242C319.377 22.803 312.854 17.1886 302.334 17.1886H281.694V63.6842H288.598V47.0047H300.317L312.091 63.7205H320.158L307.44 45.8781L308.475 45.5874ZM288.58 41.0451V23.4207H301.607C308.403 23.4207 312.291 26.6367 312.291 32.2147C312.291 37.7928 308.13 41.0451 301.68 41.0451H288.58Z"
                      className="fill-violet-900 dark:fill-white" />
              </g>
              <defs>
                <clipPath id="clip0_539_780">
                  <rect width="364" height="81" fill="white" transform="translate(0.680664 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://uptimerobot.com" target="_blank" rel="noreferrer" className="h-12 md:h-14 p-2">
            <svg className="uptime-robot" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 547.8 78.5">
              <path className="fill-black dark:fill-white" d="M96.1 3.2v38.3c0 4.3-.9 8.1-2.8 11.3-1.9 3.2-4.5 5.6-8 7.3-3.5 1.7-7.6 2.5-12.3 2.5-7.1 0-12.8-1.9-16.9-5.6-4.1-3.7-6.2-8.8-6.3-15.2V3.2H64v38.9c.2 6.4 3.1 9.6 8.9 9.6 2.9 0 5.1-.8 6.6-2.4 1.5-1.6 2.3-4.2 2.3-7.8V3.2h14.3zM146 40.4c0 6.8-1.5 12.2-4.6 16.2-3 4-7.2 6.1-12.3 6.1-4 0-7.3-1.5-9.9-4.4v20.3h-13.6V18.3h12.7l.4 4c2.6-3.2 6-4.8 10.3-4.8 5.4 0 9.5 2 12.5 5.9s4.5 9.4 4.5 16.3v.7zm-13.6-.9c0-7.7-2.3-11.6-6.8-11.6-3.2 0-5.4 1.2-6.4 3.5v17.1c1.2 2.4 3.4 3.6 6.5 3.6 4.3 0 6.5-3.7 6.7-11.2v-1.4zM169 7.4v10.8h7.2v9.4H169v19.9c0 1.6.3 2.8.9 3.4.6.6 1.8 1 3.5 1 1.3 0 2.5-.1 3.4-.2v9.7c-2.4.8-5 1.2-7.6 1.2-4.7 0-8.1-1.1-10.3-3.3-2.2-2.2-3.3-5.5-3.3-10V27.7H150v-9.4h5.6V7.4H169zm13.6-.4c0-1.9.7-3.5 2.1-4.8 1.4-1.2 3.2-1.9 5.4-1.9s4 .6 5.4 1.9c1.4 1.2 2.1 2.8 2.1 4.8 0 1.9-.7 3.5-2.1 4.8-1.4 1.2-3.2 1.9-5.4 1.9s-4-.6-5.4-1.9c-1.4-1.3-2.1-2.9-2.1-4.8zM197 61.8h-13.6V18.3H197v43.5zm22.4-43.5l.4 5.1c3.1-3.9 7.2-5.9 12.4-5.9 5.5 0 9.2 2.2 11.1 6.6 3-4.4 7.2-6.6 12.8-6.6 8.8 0 13.4 5.3 13.6 16v28.3h-13.6V34.3c0-2.2-.4-3.8-1.1-4.9-.8-1-2.1-1.5-4.1-1.5-2.7 0-4.7 1.2-6 3.6v30.3h-13.6V34.4c0-2.3-.4-3.9-1.1-4.9-.7-1-2.1-1.5-4.1-1.5-2.6 0-4.6 1.2-6 3.6v30.3h-13.6V18.3h12.9zm81.3 44.3c-6.7 0-12.1-2-16.2-6s-6.2-9.2-6.2-15.6v-1c0-4.5.8-8.4 2.5-11.8 1.6-3.4 4.1-6 7.2-7.9 3.2-1.9 6.9-2.8 11.3-2.8 6.1 0 10.9 1.9 14.5 5.7 3.5 3.8 5.3 9.1 5.3 15.9v5.3h-27c.5 2.4 1.5 4.4 3.2 5.8 1.6 1.4 3.8 2.1 6.4 2.1 4.3 0 7.6-1.5 10.1-4.5l6.2 7.3c-1.7 2.3-4.1 4.2-7.2 5.6-3.2 1.2-6.5 1.9-10.1 1.9zm-1.5-34.7c-4 0-6.3 2.6-7.1 7.9h13.7v-1c.1-2.2-.5-3.9-1.7-5-1.1-1.3-2.8-1.9-4.9-1.9zM349 41.1h-7.6v20.7h-14.1V3.2h23.1c6.9 0 12.4 1.5 16.3 4.6 3.9 3.1 5.9 7.4 5.9 13.1 0 4.1-.8 7.4-2.5 10.1s-4.2 4.9-7.7 6.5l12.2 23.7v.6h-15.1L349 41.1zm-7.7-10.9h8.9c2.7 0 4.7-.7 6.1-2.1s2-3.4 2-5.9-.7-4.5-2.1-5.9c-1.4-1.4-3.4-2.2-6-2.2h-8.9v16.1zm38.5 9.4c0-4.3.8-8.2 2.5-11.6 1.7-3.4 4.1-6 7.3-7.8 3.2-1.8 6.9-2.7 11.1-2.7 6.5 0 11.7 2 15.4 6.1 3.8 4 5.6 9.5 5.6 16.5v.5c0 6.8-1.9 12.2-5.7 16.2-3.8 4-8.9 6-15.3 6-6.2 0-11.2-1.9-14.9-5.6-3.8-3.7-5.8-8.8-6.1-15.1l.1-2.5zm13.6.9c0 4 .6 7 1.9 8.9 1.3 1.9 3.1 2.8 5.6 2.8 4.8 0 7.3-3.7 7.4-11.1v-1.4c0-7.8-2.5-11.7-7.5-11.7-4.5 0-7 3.4-7.4 10.1v2.4zm76.1-.1c0 7.1-1.5 12.6-4.4 16.5-3 3.8-7.1 5.8-12.5 5.8-4.4 0-8-1.8-10.7-5.3l-.6 4.5h-12.2V0h13.6v21.8c2.5-2.9 5.8-4.3 9.8-4.3 5.4 0 9.6 1.9 12.6 5.8s4.4 9.4 4.4 16.4v.7zm-13.6-.9c0-4.2-.6-7.2-1.7-8.9-1.1-1.8-2.8-2.7-5.1-2.7-3.1 0-5.2 1.2-6.4 3.5v17.3c1.2 2.3 3.3 3.5 6.4 3.5 3.2 0 5.2-1.6 6.1-4.7.5-1.5.7-4.2.7-8zm19.1.1c0-4.3.8-8.2 2.5-11.6 1.7-3.4 4.1-6 7.3-7.8 3.2-1.8 6.9-2.7 11.1-2.7 6.5 0 11.7 2 15.4 6.1 3.8 4 5.6 9.5 5.6 16.5v.5c0 6.8-1.9 12.2-5.7 16.2-3.8 4-8.9 6-15.3 6-6.2 0-11.2-1.9-14.9-5.6-3.8-3.7-5.8-8.8-6.1-15.1l.1-2.5zm13.5.9c0 4 .6 7 1.9 8.9 1.3 1.9 3.1 2.8 5.6 2.8 4.8 0 7.3-3.7 7.4-11.1v-1.4c0-7.8-2.5-11.7-7.5-11.7-4.5 0-7 3.4-7.4 10.1v2.4zM540 7.4v10.8h7.2v9.4H540v19.9c0 1.6.3 2.8.9 3.4s1.8 1 3.5 1c1.3 0 2.5-.1 3.4-.2v9.7c-2.4.8-5 1.2-7.6 1.2-4.7 0-8.1-1.1-10.3-3.3-2.2-2.2-3.3-5.5-3.3-10V27.7H521v-9.4h5.6V7.4H540z"/>
              <circle fill="#3BD771" cx="14.7" cy="46.9" r="14.7"/>
            </svg>
          </a>
        </div>

        <div
          className="flex flex-row flex-wrap max-w-screen-xl mx-auto mt-5 gap-2 md:gap-5 lg:gap-10 items-center justify-evenly py-5 md:py-10">
          <a href="https://www.sav.sk/" target="_blank" rel="noreferrer">
            <Image src={SAVLogo} alt="Slovak Academy of Sciences" className="w-24 h-auto"/>
          </a>
          <a href="https://uniba.sk" target="_blank" rel="noreferrer">
            <picture>
              <source srcSet={UKLogoDark.src} media="(prefers-color-scheme: dark)"/>
              <Image src={UKLogo} alt="Comenius University" className="w-52 h-auto"/>
            </picture>
          </a>
          <a href="https://fns.uniba.sk/" target="_blank" rel="noreferrer">
            <picture>
              <source srcSet={FNSLogoDark.src} media="(prefers-color-scheme: dark)"/>
              <Image src={FNSLogo} alt="Faculty of Natural Sciences" className="w-60 h-auto"/>
            </picture>
          </a>
          <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/" target="_blank" rel="noreferrer">
            <Image src={MSCALogo} alt="Marie Sklodowska-Curie Actions" className="w-14 h-auto"/>
          </a>
        </div>
        <p className="mt-10 leading-normal">
          This project&apos;s identification number is 3007/01/01 and it is funded from the European Union&apos;s
          Horizon 2020 research and innovation programme
          under the Marie Skłodowska-Curie grant agreement No 945478.
        </p>
      </div>
    </section>
  </>
  )
};

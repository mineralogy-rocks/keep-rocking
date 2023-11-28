import { useRef, useEffect, useState } from "react";

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useInView } from "framer-motion";
import cx from 'clsx';

import Terminal from '@/components/Content/Terminal';
import utilsStyles from '@/styles/utils.module.scss';
import typographyStyles from '@/styles/typography.module.scss';

import SAVLogo from 'public/assets/SAV_logo.jpg';
import UKLogo from 'public/assets/UK_logo.png';
import FNSLogo from 'public/assets/UK_FNS_logo.png';
import MSCALogo from 'public/assets/MSCA.png';


export default function Home() {

  const terminalRef = useRef(null);
  const terminalCodeRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true, amount: 0.1 });

  const code = [
    'curl -X GET \\',
    '-H "Content-type: application/json" \\',
    '-H "Accept: application/json" \\',
    '-d "offset=10" \\',
    '-d "ordering=status_id" \\',
    '"https://api.mineralogy.rocks/status"',
  ];

  const [typedCode, setTypedCode] = useState('');
  const [contentHeight, setContentHeight] = useState(0);

  const htmlTypedCode = typedCode.split('\n').map((line, index) => {
    let _isLastLine = index === typedCode.split('\n').length - 1;
    return (
      <div key={index} className={cx('flex items-center', index > 0 && 'ml-[36px] sm:ml-[42px]')}>
        {line}
        {_isLastLine && (
          <svg className="text-gray-400 animate-[blink_1s_ease-out_infinite]" width="5" height="15" viewBox="0 0 5 15" fill="currentColor">
            <rect x="0" y="0" width="5" height="15" />
          </svg>)}
        {!_isLastLine && (<br />)}
      </div>
    );
  });

  useEffect(() => {
    if (terminalCodeRef.current) setContentHeight(terminalCodeRef.current.offsetHeight);
    return;
  }, [htmlTypedCode]);


  const [magicEnabled, setMagicEnabled] = useState(true);
  const variants = {
    enabled: (degrees) => ({
      rotate: degrees,
      transition: {
        type: "spring",
        bounce: 0.3,
        damping: 10,
        mass: 4,
        stiffness: 20,
        delay: 0.5,
      }
    }),
    disabled: (degrees) => ({
      rotate: degrees,
    }),
  };

  useEffect(() => {
    const magic = sessionStorage.getItem('magicEnabled');
    if (magic === 'false') setMagicEnabled(false);
    return;
  }, []);

  useEffect(() => {

    const typeCode = (index, line) => {
      if (index === code.length) {
        return;
      }

      const delay = Math.floor(Math.random() * 100); // Random delay between 0 and 100ms
      let currentIndex = 0;

      const typeNextCharacter = () => {
        if (currentIndex === line.length) {
          // Move to the next line of code after typing
          setTimeout(() => {
            setTypedCode(prevCode => prevCode + '\n');
            typeCode(index + 1, code[index + 1]);
          }, delay + Math.floor(Math.random() * 100) + 200);
          return;
        }

        const char = line[currentIndex];

        if (char === ' ') {
          // Pause between words
          setTimeout(() => {
            setTypedCode(prevCode => prevCode + ' ');
            currentIndex++;
            typeNextCharacter();
          }, Math.floor(Math.random() * 100) + 200); // Random pause between 100ms and 200ms
        } else {
          // Type the character with varying speed
          setTimeout(() => {
            setTypedCode(prevCode => prevCode + char);
            currentIndex++;
            typeNextCharacter();
          }, delay + Math.floor(Math.random() * 100) + 10); // Random typing speed between 50ms and 150ms
        }
      };

      typeNextCharacter();
    };

    if (magicEnabled) {
      if (isInView) {
        typeCode(0, code[0]);
        setMagicEnabled(false);
        sessionStorage.setItem('magicEnabled', 'false');
      }
    } else {
      setTypedCode(code.join('\n'));
    }
    return;
  }, [isInView]);

  return (
  <>
    <Head>
      <title>mineralogy.rocks</title>
    </Head>

    <header>
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-center mt-24 text-center justify-center">
          <h1 className="max-w-md font-black text-6xl sm:text-7xl md:text-8xl mx-auto">
            Explore.
            Extract.
            Research.
          </h1>
          <div className="absolute translate-x-2 lg:translate-x-5 translate-y-2 mx-1 sm:mx-10 -z-10">
            <svg style={{ width: '100%', height: 640 }} viewBox="0 0 650 640" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_521_89)">
                <motion.path custom={28}
                             variants={variants}
                             animate={ magicEnabled ? 'enabled': '' }
                             initial={ magicEnabled ? '' : 'disabled' }
                             d="M368.258 110.152C421.109 106.696 486.348 98.7746 509.39 125.905C532.345 153.084 512.967 215.277 497.689 265.478C482.411 315.678 471.098 353.849 450.144 398.965C429.189 444.08 398.592 496.141 351.893 516.882C305.144 537.536 242.341 526.957 187.87 497.582C133.312 468.255 87.1828 420.308 88.0845 370.987C88.9473 321.801 136.754 271.292 169.061 227.886C201.281 184.53 217.954 148.19 246.429 130.462C274.953 112.822 315.368 113.744 368.258 110.152Z"
                             fill="url(#paint0_linear_521_89)"
                             fillOpacity="0.05"
                />
                <motion.path custom={13}
                             variants={variants}
                             animate={ magicEnabled ? 'enabled': '' }
                             initial={ magicEnabled ? '' : 'disabled' }
                             d="M404.966 130.266C460.381 137.625 525.113 166.208 553.357 217.825C581.6 269.442 573.355 344.093 540.242 401.502C507.128 458.91 449.145 499.076 387.053 516.86C325.022 534.517 258.818 529.921 202.77 503.213C146.626 476.538 100.638 427.753 76.3293 367.906C51.8938 307.998 49.2002 236.901 82.9475 198.841C116.789 160.748 187.072 155.69 245.262 146.23C303.453 136.77 349.551 122.906 404.966 130.266Z"
                             fill="url(#paint1_linear_521_89)"
                             fillOpacity="0.05"
                />
              </g>
              <defs>
                <linearGradient id="paint0_linear_521_89" x1="29.7463" y1="-30.7026" x2="529.305" y2="-30.7026" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3800A8"/>
                  <stop offset="1" stopColor="#F500AB"/>
                </linearGradient>
                <linearGradient id="paint1_linear_521_89" x1="27.7238" y1="-32.7187" x2="529.686" y2="-32.7187" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3800A8"/>
                  <stop offset="1" stopColor="#F500AB"/>
                </linearGradient>
                <clipPath id="clip0_521_89">
                  <rect width="650" height="640" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

        </div>

        <div className="relative mx-auto px-6 sm:px-8 mt-14 md:mt-24">
          <div className="flex justify-center">
            <Link href="/explore">
                <span className={cx(utilsStyles.link, 'group flex items-center font-bold')}>Start Exploring
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2 group-hover:animate-[wiggleRight_1s_infinite]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                </span>
            </Link>
          </div>

          <p className="text-base md:text-lg font-medium text-font-secondary leading-normal text-left mt-7">
            <strong>Mineralogy.rocks</strong> provide seamless and simple way to access and filter mineralogical and related data.
            Our platform is designed both for researchers and developers.
          </p>
        </div>
      </div>
    </header>

    <section>
      <div className={cx(typographyStyles.Section, "")}>
        <h3 className="text-start font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Start with exploring the data</h3>
        <p className="text-base md:text-lg font-medium text-font-secondary leading-normal text-start mt-7">
            The platform is developed by the researchers for the researchers. Our goal is to provide data for scientific needs in a coherent fashion.
            Find the proper data subset and explore the relations between minerals.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-start">
            <div className="md:col-span-6 flex flex-col">
                <h4 className={typographyStyles.Subtitle}>Researchers</h4>
                <p className="text-base md:text-lg text-font-secondary leading-normal text-left mt-5">
                    Check out our filtering system at <Link href="/explore" className={utilsStyles.link}>mineralogy.rocks/explore</Link>.
                    We are working towards a platform that would allow making complex queries, combining those and exploring the results.
                </p>
            </div>

            <div className="md:col-span-6 flex flex-col">
              <div className="flex flex-col gap-2 text-left text-base md:text-lg font-normal text-font-secondary leading-normal">
                <div className="flex flex-wrap items-center">
                  <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">1</span>
                  <p className="flex-1 text-font-secondary">
                    <code className="font-normal bg-slate-100 px-1 py-0.5 rounded text-font-secondary">WHERE</code> discovery year <b>between</b> 1999 and 2001
                  </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1, 401 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">2</span>
                    <p className="flex-1 text-font-secondary">
                      <code className="bg-slate-100 px-1 py-0.5 rounded text-font-secondary">AND</code> discovery country <b>in</b> EU
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 198 species</span>
                </div>
                <div className="flex flex-wrap items-center">
                    <span className="bg-black/70 text-white w-6 h-6 rounded-full justify-center font-medium flex items-center mr-3">3</span>
                    <p className="text-base md:text-lg leading-normal text-font-secondary">
                      <code className="bg-slate-100 px-1 py-0.5 rounded text-font-secondary">AND</code> mineral formula <b>contains</b> As<sup>5+</sup>
                    </p>
                </div>
                <div className="flex flex-row">
                  <span className="ml-8">🤖 found 1 species — Vicanite-(Ce)</span>
                </div>
              </div>
            </div>
        </div>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-start">
          <div className="md:col-span-6 flex flex-col">
            <h3 className={typographyStyles.Subtitle}>Developers</h3>
            <p className="text-base md:text-lg text-font-secondary leading-normal mt-5">
              The data is accessible via <a className={utilsStyles.linkExternal} href="https://api.mineralogy.rocks" target="_blank" rel="noopener noreferrer">api.mineralogy.rocks</a>{' '}
              through your favourite <code className="font-normal bg-slate-100 px-1 py-0.5 rounded text-font-secondary">http client</code>.
              Reach out to us if you need an API key.
            </p>
          </div>

          <div className="md:col-span-6" ref={terminalRef}>
            <Terminal>
              <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-semibold text-gray-900 flex ligatures-none overflow-auto">
                <code className="flex-none min-w-full p-5">
                  <span className="flex">
                    <svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3">
                      <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <motion.div className="flex-auto"
                                initial={{
                                  height: 0,
                                }}
                                animate={{
                                  height: contentHeight,
                                }}
                                transition={{
                                  type: 'spring',
                                  bounce: 0.4,
                                  stiffness: 100,
                                  damping: 20,
                                }}>
                      <div ref={terminalCodeRef}>
                        {htmlTypedCode}
                      </div>
                    </motion.div>
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
        <h3 className="font-black text-3xl sm:text-4xl md:text-6xl text-start mt-4">Extract the data</h3>
        <p className="text-base md:text-lg font-medium text-font-secondary leading-normal text-left mt-5">
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
              <h4 className={typographyStyles.Subtitle}>Flexible data fetching</h4>
              <p className="text-base md:text-lg text-font-secondary leading-normal mt-5">
                Export the data in a preferred format or connect your application directly to our <b>API</b>.
                We are updating our data services in order to meet the evolving demands of research community, please contact us in case of specific data format/output needs.
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className={typographyStyles.Subtitle}>Share the query</h4>
              <p className="text-base md:text-lg text-font-secondary leading-normal mt-5">
                All filtering systems are connected to the query params of the <b>URL string</b> - you’ll <em>never</em> loose your results once you obtained them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className={typographyStyles.Section}>
        <h3 className="font-black text-3xl sm:text-4xl md:text-6xl text-start mt-4 text">Do research</h3>
        <p className="text-base md:text-lg font-medium text-font-secondary leading-normal mt-7">
          We will gladly assist you in finding the right data in a right format.
          We believe in open science and open source—things that make our lives better.
        </p>

        <div className="md:grid md:grid-cols-12 space-y-6 md:space-y-0 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14">
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className={typographyStyles.Subtitle}>Contribute<span className="mdi text-2xl md:text-3xl mdi-github ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg text-font-secondary leading-normal mt-5">
              Join our computing community <a className={utilsStyles.linkExternal} href="https://github.com/mineralogy-rocks" target="_blank" rel="noreferrer">mineralogy-rocks</a> and start contributing as a member. For code-related threads and suggestions, visit our
              <a className={utilsStyles.linkExternal} href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="flex items-center">
              <h4 className={typographyStyles.Subtitle}>Core team<span className="mdi text-2xl md:text-3xl mdi-account-group ml-2"></span></h4>
            </div>
            <p className="text-base md:text-lg text-font-secondary leading-normal mt-5">
              The core team includes world-class mineralogy, geochemistry, petrology and geology researchers from <a className={utilsStyles.linkExternal} href="https://uniba.sk" target="_blank" rel="noreferrer">Comenius University (Slovakia) 🇸🇰</a>,
              <a className={utilsStyles.linkExternal} href="https://www.unibe.ch/index_eng.html" target="_blank" rel="noreferrer">University of Bern (Switzerland) 🇨🇭</a>
              and <a className={utilsStyles.linkExternal} href="https://www.oulu.fi/en" target="_blank" rel="noreferrer">University of Oulu (Finland) 🇫🇮</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 sm:px-8 mt-40 mx-auto max-w-6xl">
      <div className="flex flex-col">
        <h2 className="font-black text-3xl sm:text-4xl md:text-4xl text-start mt-4 text">Funding and Sponsors</h2>

         <div className="flex justify-between items-center mt-7">
           <div className="max-w-lg text-base md:text-lg text-font-secondary leading-normal">
             <p className="">
               <strong>mineralogy.rocks</strong> is a non-profit outreach research project funded by academia since 2021. We always seek sponsors and donations to help us improve and evolve.
             </p>
             <p className="mt-4">
                This project 3007/01/01 has received funding from the European Union&apos;s Horizon 2020 research and innovation programme
                under the Marie Skłodowska-Curie grant agreement No 945478.
             </p>
           </div>

           <div className="w-full">
             <svg width="100%" height="351" viewBox="0 0 651 351" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <path d="M350.5 238L375.5 250.5V275.5L350.5 263V238Z" fill="#B14BFF"/>
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
              <path d="M363 213L388 200.5L413 213L388 225.5L363 213Z" fill="#7A08DD"/>
              <path d="M363 213L388 225.5V250.5L363 238V213Z" fill="#B14BFF"/>
              <path d="M388 225.5L413 213V238L388 250.5V225.5Z" fill="#4000AA"/>
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
              <path d="M400.5 100.5L425.5 88L450.5 100.5L425.5 113L400.5 100.5Z" fill="#9400BD"/>
              <path d="M400.5 100.5L425.5 113V138L400.5 125.5V100.5Z" fill="#C94BF0"/>
              <path d="M425.5 113L450.5 100.5V125.5L425.5 138V113Z" fill="#60008C"/>
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
        <div className="flex flex-row flex-wrap max-w-screen-xl mx-auto mt-10 gap-2 md:gap-5 lg:gap-10 items-center justify-evenly py-5 md:py-10">
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

        <p className="max-w-lg mt-7 text-base md:text-lg text-font-secondary leading-normal">
          We extend our heartfelt gratitude to our esteemed tech partners whose generous support and sponsorship have played a pivotal role in enhancing and sustaining our services.
        </p>
      </div>
    </section>
  </>
  )};

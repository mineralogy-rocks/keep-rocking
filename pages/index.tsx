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

  useEffect(() => {
    const magic = sessionStorage.getItem('magicEnabled');
    if (magic === 'false') {
      setMagicEnabled(false);
    }
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
          <div className="absolute translate-x-2 lg:translate-x-5 translate-y-2 mx-1 sm:mx-10">
            <motion.svg style={{ width: '100%', height: 640 }} viewBox="0 0 650 640" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_521_89)">
                <motion.path animate={
                             magicEnabled ? {
                                rotate: 28,
                                transition: {
                                  type: "spring",
                                  bounce: 0.3,
                                  damping: 10,
                                  mass: 4,
                                  stiffness: 20,
                                  delay: 0.5,
                                }
                              } : {}
                            }
                             d="M368.258 110.152C421.109 106.696 486.348 98.7746 509.39 125.905C532.345 153.084 512.967 215.277 497.689 265.478C482.411 315.678 471.098 353.849 450.144 398.965C429.189 444.08 398.592 496.141 351.893 516.882C305.144 537.536 242.341 526.957 187.87 497.582C133.312 468.255 87.1828 420.308 88.0845 370.987C88.9473 321.801 136.754 271.292 169.061 227.886C201.281 184.53 217.954 148.19 246.429 130.462C274.953 112.822 315.368 113.744 368.258 110.152Z"
                             fill="url(#paint0_linear_521_89)"
                             fillOpacity="0.05"/>
                <motion.path animate={
                              magicEnabled ? {
                                rotate: 13,
                                transition: {
                                  type: "spring",
                                  bounce: 0.3,
                                  damping: 10,
                                  mass: 1,
                                  stiffness: 20,
                                  delay: 0.7,
                                }
                              } : {}
                            }
                             d="M404.966 130.266C460.381 137.625 525.113 166.208 553.357 217.825C581.6 269.442 573.355 344.093 540.242 401.502C507.128 458.91 449.145 499.076 387.053 516.86C325.022 534.517 258.818 529.921 202.77 503.213C146.626 476.538 100.638 427.753 76.3293 367.906C51.8938 307.998 49.2002 236.901 82.9475 198.841C116.789 160.748 187.072 155.69 245.262 146.23C303.453 136.77 349.551 122.906 404.966 130.266Z"
                             fill="url(#paint1_linear_521_89)"
                             fillOpacity="0.05"/>
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
            </motion.svg>
          </div>

        </div>

        <div className="relative mx-auto px-6 sm:px-8 mt-14 md:mt-24 z-10">
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
          <p className="text-base md:text-lg text-font-secondary">
            This project 3007/01/01 has received funding from the European Union&apos;s Horizon 2020 research and innovation programme
            under the <strong>Marie Skłodowska-Curie grant agreement No 945478</strong>.
          </p>
        </div>
      </div>
    </section>
  </>
  )};

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <header>
        <div className="flex items-center mt-24 text-center justify-center">
          <h1 className="max-w-md font-black text-6xl sm:text-7xl md:text-8xl mx-auto">
            Explore.
            Extract.
            Research.
          </h1>
        </div>

        <div className="mx-auto px-6 sm:px-8 mt-14 md:mt-20">
          <div className="flex justify-center">
            <button type="button" className="bg-black hover:bg-gray-800 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-sm leading-5 rounded font-semibold text-white drop-shadow-sm">
                Start Exploring
            </button>
          </div>

          <p className="text-sm md:text-base text-gray-500 text-center mt-7">
            <span className="font-bold">Mineralogy.rocks</span> provide seamless and simple way to access and filter mineralogical and related data.
            Our platform is designed both for researchers and developers.
          </p>
        </div>
      </header>

      <section className="text-center px-6 sm:px-8 mt-20 mx-auto">
            <div className="flex justify-center items-center">
                <div className="flex self-center justify-center bg-teal-300 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
                    <span className="mdi text-3xl md:text-5xl mdi-magnify"></span>
                </div>
                <h3 className="font-bold text-2xl md:text-4xl">Explore</h3>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Start with exploring the data</h2>
            <p className="text-sm md:text-base px-4 md:px-6 text-gray-500 text-center mt-7">
                The platform is developed by the researchers for the researchers. Our goal is to provide data for scientific needs in a coherent fashion.
                Start with finding the right subset of data and exploring the relations between minerals.
            </p>

            <div className="max-w-5xl mx-auto px-4 md:px-6 md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
                <div className="md:col-span-6 flex flex-col">
                    <h4 className="font-bold text-xl md:text-3xl">Researcher?</h4>
                    <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                        Check out our filtering system at
                        <Link className="text-blue-600 visited:text-purple-600 hover:underline" href="/explore">mineralogy.rocks/explore</Link>.
                        You are able to make complex queries, combine those and explore the results.
                    </p>
                </div>

                <div className="md:col-span-6 flex flex-col">
                    <div className="text-left text-sm text-gray-500">
                        <div className="flex items-center">
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-clock-outline mr-2"></span>
                            <p className="text-xs sm:text-sm md:text-base">Discovery year between 1999 and 2001</p>
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-arrow-right-thin mx-2"></span>
                            <p className="font-semibold text-xs sm:text-sm md:text-base">1,401 minerals</p>
                        </div>
                        <div className="flex items-center">
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-map-marker-check mr-2"></span>
                            <p className="text-xs sm:text-sm md:text-base">Discovery country in EU</p>
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-arrow-right-thin mx-2"></span>
                            <p className="font-semibold text-xs sm:text-sm md:text-base">198 minerals</p>
                        </div>
                        <div className="flex items-center">
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-atom mr-2"></span>
                            <p className="text-xs sm:text-sm md:text-base">Mineral formula contains As<sup>5+</sup></p>
                        </div>
                        <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-arrow-down-thin mr-2"></span>
                        <div className="flex items-center">
                            <span className="mdi text-black text-base sm:text-lg md:text-xl mdi-check-circle mr-2"></span>
                            <p className="font-semibold text-xs sm:text-sm md:text-base">Vicanite-(Ce)</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-6 flex flex-col"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">
                <div className="md:col-span-6 flex flex-col">
                    <h4 className="font-bold text-xl md:text-3xl">Developer?</h4>
                    <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                        The data is accessible via <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://api.mineralogy.rocks" target="_blank">api.mineralogy.rocks</a> through your favourite <span className="font-semibold">http client</span>! Check out current state of
                        <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://api.mineralogy.rocks/docs" target="_blank">API documentation</a>.
                    </p>
                </div>

                <div className="md:col-span-6">
                    <div className="overflow-hidden shadow-xl flex bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-xl">
                        <div className="w-full flex flex-col">
                            <div className="flex-none border-b border-gray-500/30">
                                <div className="flex items-center bg-gray-600 h-8 space-x-1.5 px-3">
                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="min-h-0 flex-auto flex flex-col">
                                <div className="w-full flex-auto flex min-h-0 overflow-auto">
                                    <div className="w-full flex-auto">
                                        <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-bold text-gray-900 flex ligatures-none overflow-auto">
                                          <code className="flex-none min-w-full p-5">
                                            <span className="flex">
                                              <svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                              <span className="flex-auto"><span className="text-indigo-700">curl</span> -X GET \
         -H &quot;Content-type: application/json&quot; \
         -H &quot;Accept: application/json&quot; \
         -d &quot;offset=10&quot; \
         -d &quot;ordering=status_id&quot; \
         &quot;https://api.mineralogy.rocks/v1/status&quot;</span></span></code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="text-center px-6 sm:px-8 mt-20 mx-auto">
            <div className="flex justify-center items-center">
                <div className="flex self-center justify-center bg-pink-200 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
                    <span className="mdi text-3xl md:text-5xl mdi-cloud-download"></span>
                </div>
                <h3 className="font-bold text-2xl md:text-4xl">Extract</h3>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Download the data</h2>
            <p className="text-sm md:text-base px-4 md:px-6 text-gray-500 text-center mt-7">
                The platform makes the <span className="font-semibold">data extraction</span> easy and simple. No matter what data you need -
                you can savely extract it to your local machine.
            </p>

            <div className="max-w-5xl mx-auto px-4 md:px-6 md:grid md:grid-cols-12 space-y-6 md:space-y-2 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14 items-center">

                <div className="md:col-span-6">
                    <div className="overflow-hidden shadow-xl flex bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-xl">
                        <div className="w-full flex flex-col">
                            <div className="flex-none border-b border-gray-500/30">
                                <div className="flex items-center bg-gray-600 h-8 space-x-1.5 px-3">
                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="min-h-0 flex-auto flex flex-col">
                                <div className="w-full flex-auto flex min-h-0 overflow-auto">
                                    <div className="w-full flex-auto">
                                        <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-bold text-gray-900 flex ligatures-none overflow-auto"><code className="flex-none min-w-full p-5"><span className="flex"><svg viewBox="0 -9 3 24" aria-hidden="true" className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span className="flex-auto"><span className="text-indigo-700">query params</span> = &#123;
        <span className="text-pink-600">color</span>: &quot;blue&quot;,
        <span className="text-pink-600">cations__in</span>: [&quot;Cu2+&quot;],
        <span className="text-pink-600">anions__in</span>: [&quot;OH-&quot;, &quot;O2-&quot;],
        <span className="text-pink-600">discovery_year_max</span>: 1998,
        ...
      &#125;</span></span></code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-6 flex flex-col space-y-2 md:space-y-4">
                    <div>
                        <div className="flex justify-center items-center">
                            <h4 className="font-bold text-xl md:text-3xl justify-center">Fetch data flexibly<span className="mdi text-2xl md:text-3xl mdi-code-tags ml-2"></span></h4>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                            Export the data in a preferred format or connect your application directly to API.
                            <span className="font-semibold">Mineralogy.rocks</span> is updating its data services in order to meet the evolving demands of research community, please contact us in case of specific data format/output needs.
                        </p>

                    </div>
                    <div>
                        <div className="flex justify-center">
                            <h4 className="font-bold text-xl md:text-3xl">Share the query<span className="mdi text-2xl md:text-3xl mdi-check-circle-outline ml-2"></span></h4>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                            All filtering systems are connected to the query params of the <span className="font-semibold">URL string</span> - you’ll never loose your results once you obtained them.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="text-center px-6 sm:px-8 mt-20 mx-auto">
            <div className="flex justify-center items-center">
                <div className="flex self-center justify-center bg-yellow-300 rounded-full h-10 w-10 md:h-14 md:w-14 mr-3">
                    <span className="mdi text-3xl md:text-5xl mdi-cloud-download"></span>
                </div>
                <h3 className="font-bold text-2xl md:text-4xl">Research</h3>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl md:text-6xl mx-auto mt-4">Do research with us</h2>
            <p className="text-sm md:text-base px-4 md:px-6 text-gray-500 text-center mt-7">
                We will gladly assist you in finding the right data in a right format.
                We believe in open science and open source - things that make our lives better.
            </p>

            <div className="max-w-5xl mx-auto px-4 md:px-6 md:grid md:grid-cols-12 space-y-6 md:space-y-0 gap-2 sm:gap-3 md:gap-7 mt-10 md:mt-14">
                <div className="md:col-span-6">
                    <div className="flex justify-center items-center">
                        <h4 className="font-bold text-xl md:text-3xl justify-center">Contribute<span className="mdi text-2xl md:text-3xl mdi-github ml-2"></span></h4>
                    </div>
                    <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                        Join our computing community
                        <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://github.com/mineralogy-rocks" target="_blank">mineralogy-rocks</a>
                        and start contributing as a member. For code-related threads and suggestions, visit our
                        <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank">GitHub Discussions Channel</a>.
                    </p>
                </div>
                <div className="md:col-span-6">
                    <div className="flex justify-center items-center">
                        <h4 className="font-bold text-xl md:text-3xl justify-center">Core team<span className="mdi text-2xl md:text-3xl mdi-account-group ml-2"></span></h4>
                    </div>
                    <p className="text-sm md:text-base text-gray-500 text-justify mt-5">
                        The core team includes world className researchers in the area of mineralogy, geochemistry, petrology and geology from
                        <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://uniba.sk" target="_blank">Comenius University (Slovakia) 🇸🇰</a>,
                        <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://www.unibe.ch/index_eng.html" target="_blank">University of Bern (Switzerland) 🇨🇭</a>
                        and <a className="text-blue-600 visited:text-purple-600 hover:underline" href="https://www.oulu.fi/en" target="_blank">University of Oulu (Finland) 🇫🇮</a>.
                    </p>
                </div>
            </div>
        </section>
    </>
  )
}

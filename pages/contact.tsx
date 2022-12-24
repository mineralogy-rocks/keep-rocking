import Head from 'next/head';

import utilsStyles from '@/styles/utils.module.scss';


export default function Home() {
  return <>
    <Head>
      <title>mineralogy.rocks - contact</title>
    </Head>

    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <header>
        <div className="flex items-center mt-10 text-start justify-start">
          <h1 className="max-w-md font-bold text-2xl sm:text-3xl md:text-5xl">
            Contact
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-14 md:mt-16 grid grid-cols-3">
        <div className="col-span-3 lg:col-span-2">
          <p className="text-sm md:text-base leading-relaxed indent-4 text-left mt-2">
            If you have any suggestions, questions or a collaboration request, you are welcome to send us an email at{' '}
            <a className={utilsStyles.linkExternal} href="mailto:admin@mineralogy.rocks">admin@mineralogy.rocks</a>.
          </p>
        </div>
      </div>
    </div>

  </>;
};

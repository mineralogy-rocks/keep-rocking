import { Metadata } from 'next'

import clsx from 'clsx';

import utilsStyles from '@/styles/utils.module.scss';
import typographyStyles from '@/styles/typography.module.scss';


export const metadata: Metadata = {
  title: 'About',
}


export default function Home() {
  return <>
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <header>
        <div className="flex items-center mt-10 text-start justify-start">
          <h1 className="max-w-md font-bold text-2xl sm:text-3xl md:text-5xl">
            About
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-14 md:mt-16 grid grid-cols-3">
        <div className="col-span-3 lg:col-span-2">
          <p className={typographyStyles.Paragraph}>
            More than <em>100</em> new minerals are discovered yearly, with over <em>5,700</em> minerals approved by the{' '}
            <a className={utilsStyles.linkExternal} href="https://mineralogy-ima.org/" target="_blank" rel="noopener noreferrer">International Mineralogical Association</a> (IMA).
            This number can expand to over <em>10,000</em> mineral names, along with numerous synonyms and varieties.
            Thus, the flow of information in mineralogy is increasing enormously every year, while the possibility of finding the right, interlayered, and free data source is only decreasing.
          </p>

          <p className={clsx(typographyStyles.Paragraph, "mt-5")}>
            During our PhD studies, we struggled a lot with the lack of free data.
            At one point, data collection and normalization became a hobby, and now it has grown into a large project containing tons of data with many ideas on how to organize and present it.
            Therefore, sharing our data with other scientists was more than logical, and we started with friends and colleagues.
            The latter led us to collaborate with professional mineralogists and geologists from Finland, Switzerland, the United States, the United Kingdom, Slovakia, and Ukraine.
          </p>

          <p className={clsx(typographyStyles.Paragraph, "mt-5")}>
            Our newly-born website aims to bring the newest mineralogical data to scientists and data enthusiasts through data visualization,
            normalization, and statistical analysis to turn raw data into insight and knowledge and prove that science <strong>can</strong> and should be{' '}
            <strong>accessible, engaging, and progressive.</strong>
          </p>

          <p className={clsx(typographyStyles.Paragraph, "mt-10")}>
            Built with <a className={utilsStyles.linkExternal} href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>,{' '}
            <a className={utilsStyles.linkExternal} href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind</a>, and{' '}
            <a className={utilsStyles.linkExternal} href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a>.
          </p>
        </div>
      </div>
    </div>

  </>;
};

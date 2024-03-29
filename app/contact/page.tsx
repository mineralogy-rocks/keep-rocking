import { Metadata } from "next";

import clsx from 'clsx';

import utilsStyles from '@/styles/utils.module.scss';
import typographyStyles from '@/styles/typography.module.scss';


const metadata: Metadata = {
  title: 'contact',
}

export default function Contact() {
  return <>
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
          <p className={typographyStyles.Paragraph}>
            If you have any suggestions, questions or a collaboration request, you are welcome to send us an email at{' '}
            <a className={utilsStyles.linkExternal} href="mailto:admin@mineralogy.rocks">admin@mineralogy.rocks</a>.
          </p>
          <p className={clsx(typographyStyles.Paragraph, "mt-5")}>
            Additionally, feel free to drop your ideas and suggestions in our{' '}
            <a className={utilsStyles.linkExternal} href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
          </p>
        </div>
      </div>
    </div>

  </>;
};

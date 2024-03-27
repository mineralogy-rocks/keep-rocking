import { Metadata } from "next";

import cx from 'clsx';

import styles from '@/styles/typography.module.scss';


const metadata: Metadata = {
  title: 'contact',
}

export default function Contact() {
  return <>
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <header>
        <div className="flex items-center mt-10 text-start justify-start">
          <h1 className={styles.title}>Contact</h1>
        </div>
      </header>

      <div className="mx-auto mt-14 md:mt-16 grid grid-cols-3">
        <div className="col-span-3 lg:col-span-2 text-base md:text-lg leading-snug text-left">
          <p className={styles.paragraph}>
            If you have any suggestions, questions or a collaboration request, you are welcome to send us an email at{' '}
            <a className="link external" href="mailto:admin@mineralogy.rocks">admin@mineralogy.rocks</a>.
          </p>
          <p className={cx(styles.paragraph, "mt-5")}>
            Additionally, feel free to drop your ideas and suggestions in our{' '}
            <a className="link external" href="https://github.com/orgs/mineralogy-rocks/discussions" target="_blank" rel="noreferrer"> GitHub Discussions Channel</a>.
          </p>
        </div>
      </div>
    </div>

  </>;
};

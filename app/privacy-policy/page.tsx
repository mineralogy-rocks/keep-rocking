import { Metadata } from 'next';

import clsx from 'clsx';

import utilsStyles from '@/styles/utils.module.scss';
import typographyStyles from '@/styles/typography.module.scss';


export const metadata: Metadata = {
  title: 'privacy',
}


export default function PrivacyPolicy({}) {
  return (
    <>

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <header>
          <div className="flex flex-col mt-10 text-start justify-start">
            <h1 className="max-w-md font-bold text-2xl sm:text-3xl md:text-5xl">
              Privacy Policy
            </h1>
            <h2 className="mt-5 italic text-sm sm:text-base">Published: December, 25 2022</h2>
          </div>
        </header>

        <div className="mx-auto mt-10 md:mt-12 grid grid-cols-3">
          <div className="col-span-3 lg:col-span-2">
            <p className={typographyStyles.Paragraph}>
              At <em>mineralogy.rocks</em> (collectively, “us,” “we” and “our”), we are committed to protecting the privacy and
              security of your personal information. This Privacy Policy explains how we collect, use and disclose your personal information
              and the types of personal information that we may hold about you.
              This Privacy Policy applies whenever you interact with us, including when you visit one of our websites on which this
              Privacy Policy is posted (the “Sites”), including{' '}
              <a className={utilsStyles.linkExternal} href="https://api.mineralogy.rocks" target="_blank" rel="noreferrer">api.mineralogy.rocks</a> and{' '}
              <a className={utilsStyles.linkExternal} href="https://mineralogy.rocks" target="_blank" rel="noreferrer">mineralogy.rocks</a>.
            </p>

            <div className="mt-10">
              <h3 className={typographyStyles.Header3}>1. What information do we collect?
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                We collect personal information about you when you interact with our website. This information may include:
              </p>

              <ol className={typographyStyles.List}>
                <li className={typographyStyles.ListItem}>
                  <strong>Account information.</strong>{' '}
                  We collect the information you provide us when you create an account, such as your name and email address.
                  Although there is no authentication required to use our website, we may ask you to create an account to access certain features in the future.
                </li>
                <li className={typographyStyles.ListItem}>
                  <strong>Communication information.</strong>{' '}
                  We collect the information you provide us when you communicate with us for support, give us feedback, make a collaboration request, or otherwise interact with us.
                </li>
                <li className={typographyStyles.ListItem}>
                  <strong>Device information.</strong>{' '}
                  We collect information about the device you use to access our website, such as your IP address, network location, browser type, and operating system.
                </li>
                <li className={typographyStyles.ListItem}>
                  <strong>Preferences data.</strong>{' '}
                  We collect information about your preferences and settings when you use our website using cookies and local storage.
                  You can remove this data by clearing your browser cache.
                </li>
              </ol>

              <h3 className={typographyStyles.Header3}>2. Why do we collect your personal information?
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                We collect your personal information to provide you with the best possible experience when using our website and for the following purposes:
              </p>

              <ol className={typographyStyles.List}>
                <li className={typographyStyles.ListItem}>
                  Provide, maintain, and improve our website.
                </li>
                <li className={typographyStyles.ListItem}>
                  Provide and deliver the products and services you request.
                </li>
                <li className={typographyStyles.ListItem}>
                  Respond to comments and questions and provide customer service.
                </li>
                <li className={typographyStyles.ListItem}>
                  Send you technical notices, updates, security alerts, and support and administrative messages.
                </li>
              </ol>

              <h3 className={typographyStyles.Header3}>3. How do we share your personal information?
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                We may share your personal information with third parties in the following circumstances:
              </p>

              <ol className={typographyStyles.List}>
                <li className={typographyStyles.ListItem}>
                  Service providers.
                </li>
                <li className={typographyStyles.ListItem}>
                  Business transfers.
                </li>
                <li className={typographyStyles.ListItem}>
                  Compliance with laws.
                </li>
              </ol>

              <p className={typographyStyles.Paragraph}>However, we do not and will never sell your personal information to other parties.</p>

              <h3 className={typographyStyles.Header3}>4. How do we protect your personal information?
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                We use reasonable administrative, technical, and physical safeguards to protect your personal information against loss, theft, and misuse,
                as well as unauthorized access, disclosure, alteration, and destruction.
              </p>

              <h3 className={typographyStyles.Header3}>5. User Access and Control.
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                You may access, update, or delete your personal information at any time by contacting us at{' '}
                <a className={utilsStyles.linkExternal} href="mailto:admin@mineralogy.rocks" target="_blank" rel="noreferrer">admin@mineralogy.rocks</a>
              </p>

              <h3 className={typographyStyles.Header3}>6. Scope and Application.
              </h3>

              <p className={clsx(typographyStyles.Paragraph, "!mt-2")}>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our website or sending you a notification).
                We encourage you to review the Privacy Policy whenever you access or use our website to stay informed about our information practices and the ways you can help protect your privacy.
                Our services are for a general audience, are not targeted to children. We do not knowingly collect personal information from children under 18 years of age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

import { Metadata } from 'next';

import cx from 'clsx';
import styles from '@/styles/typography.module.scss';

import { InternalLink, ExternalLink } from "@/components/Link";

export const metadata: Metadata = {
  title: 'terms',
}


export default function Terms() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <header>
          <div className="flex flex-col mt-10 text-start justify-start">
            <h1 className={styles.title}>
              Terms of Service and Conditions
            </h1>
          </div>
        </header>

        <div className="mx-auto mt-10 md:mt-12 grid grid-cols-3 text-base md:text-lg leading-snug text-left;">
          <div className="col-span-3 lg:col-span-2">
            <p className={styles.paragraph}>
              The following terms of use (“Terms”) govern your access to and use of the websites{' '}
              <ExternalLink href="https://api.mineralogy.rocks" isIcon={false}>api.mineralogy.rocks</ExternalLink> and{' '}
              <ExternalLink href="https://mineralogy.rocks" isIcon={false}>mineralogy.rocks</ExternalLink> (collectively, the “Websites”),
              operated and owned by mineralogy.rocks (collectively, “mineralogy.rocks”, “we”, “us” or “our”).
            </p>

            <p className={cx(styles.paragraph, "mt-2")}>
              The Websites provide educational and scientific content and resources for research and reference only.
            </p>

            <p className={cx(styles.paragraph, "mt-2")}>
              By accessing or using the Websites, you agree to be bound by these Terms. If you do not agree to these Terms, you should not use or access the Websites or Services.
              The Policies apply to all users, including visitors and Registered Users who use the Services (collectively, “users” or “you”). The Services are not intended for
              children under the age of 13. If you are under 13 years of age, you may not use the Services.
            </p>

            <div className="mt-10">
              <h3 className={styles.header}>1. Your Use of the Websites and Services.
              </h3>
              <h4 className={styles.header}>License</h4>
              <p className={styles.paragraph}>
                Subject to your compliance with these Terms, <em>mineralogy.rocks</em> grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access
                and use the Websites and Services for your personal, research, and non-commercial use. You may not use the Websites or Services for any other purpose, including any commercial
                purpose, without our prior written consent. You may not use the Websites or Services in any manner that could damage, disable, overburden, or impair them or interfere
                with any other party’s use and enjoyment of them. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available
                or provided for through the Websites or Services.
              </p>

              <h4 className={cx(styles.header, "!mt-5")}>Representations and Warranties</h4>
              <p className={cx(styles.paragraph, "!indent-0")}>
                You represent and warrant that:
              </p>
              <ol className={styles.list}>
                <li className={styles.listItem}>
                  you are at least 13 years of age;
                </li>
                <li className={styles.listItem}>
                  you have the right, authority, and capacity to enter into these Terms and to abide by and comply with these Terms;
                </li>
                <li className={styles.listItem}>
                  you will use the Websites and Services in a manner consistent with any and all applicable laws and regulations;
                </li>
                <li className={styles.listItem}>
                  your use of the Websites and Services will not infringe or misappropriate the intellectual property rights of any third party.
                </li>
              </ol>

              <h4 className={cx(styles.header, "!mt-5")}>Restrictions</h4>
              <p className={styles.paragraph}>
                You agree not to, and you will not permit others to:
              </p>
              <ol className={styles.list}>
                <li className={styles.listItem}>
                  use the Websites or Services for any illegal purpose;
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services in any manner that could damage, disable, overburden, or impair them;
                </li>
                <li className={styles.listItem}>
                  use any robot, spider, scraper, or other automated means to access the Websites or Services for any purpose without our express written permission;
                </li>
                <li className={styles.listItem}>
                  interfere with or circumvent any security features of the Websites or Services, including by attempting to probe, scan, or test
                  the vulnerability of any system or network or to breach any security or authentication measures;
                </li>
                <li className={styles.listItem}>
                  reverse engineer or access the Websites or Services in order to
                  <ol className="list-[lower-latin] list-outside space-y-2 my-2 pl-4 text-base sm:text-lg">
                    <li className={styles.listItem}>
                      build a competitive product or service,
                    </li>
                    <li className={styles.listItem}>
                      build a product using similar ideas, features, functions, or graphics of the Websites or Services, or
                    </li>
                    <li className={styles.listItem}>
                      copy any ideas, features, functions, or graphics of the Websites or Services;
                    </li>
                  </ol>
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to send automated queries to any website or to send any unsolicited commercial email;
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to harvest or collect email addresses or other contact information of other users from the Websites or Services by
                  electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to transmit, or procure the sending of, any advertising or promotional material,
                  including any “junk mail,” “chain letter,” “spam,” or any other similar solicitation;
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to transmit, or procure the sending of, any material that contains viruses, Trojan horses, worms, time bombs, cancelbots, easter eggs, or other computer
                  programming routines that may damage, interfere with, surreptitiously intercept, or expropriate any system, data, or personal information;
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to impersonate or attempt to impersonate <em>mineralogy.rocks</em>, a <em>mineralogy.rocks</em> team member, employee,
                  another user, or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing);
                </li>
                <li className={styles.listItem}>
                  use the Websites or Services to engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Websites or Services,
                  or which, as determined by us, may harm or offend <em>mineralogy.rocks</em> or users of the Websites or Services or expose them to liability.
                </li>
              </ol>

              <h3 className={styles.header}>2. Void Where Prohibited by Law.</h3>
              <p className={styles.paragraph}>
                The Websites and Services are controlled and offered by <em>mineralogy.rocks</em> from its facilities in the EU. <em>mineralogy.rocks</em> makes no
                representations that the Websites or Services are appropriate or available for use in other locations. Those who access or use the Websites or Services
                from other jurisdictions do so at their own volition and are responsible for compliance with local law.
              </p>

              <h3 className={styles.header}>3. Privacy.</h3>
              <p className={styles.paragraph}>
                Please refer to our <InternalLink href="/privacy-policy">Privacy Policy</InternalLink> for information regarding our collection, use,
                and disclosure of your personal information.
              </p>

              <h3 className={styles.header}>4. Intellectual Property Rights.</h3>
              <ol className={styles.list}>
                <li className={styles.listItem}>
                  The Websites and Services and their entire contents, features, and functionality (including but not limited to all information, software, code, text, displays,
                  images, video, and audio, and the design, selection, and arrangement thereof), are owned by <em>mineralogy.rocks</em>, its licensors, or other providers of such material
                  and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </li>
                <li className={styles.listItem}>
                  This Terms of Service does not grant you any rights to use any intellectual property owned by <em>mineralogy.rocks</em> or its licensors
                  other than as necessary to access and use the Websites and Services.
                </li>
                <li className={styles.listItem}>
                  You will not remove, alter, or obscure any copyright, trademark, service mark, or other proprietary rights notices incorporated in or accompanying the Websites or Services.
                </li>
                <li className={styles.listItem}>
                  You acknowledge and agree that you are solely responsible for (and that <em>mineralogy.rocks</em> has no responsibility to you or to any third party for) any breach of your obligations under these Terms and for the consequences (including any loss or damage which <em>mineralogy.rocks</em> may suffer) of any such breach.
                </li>
                <li className={styles.listItem}>
                  You may only copy, reproduce, store, or download content on the Websites and Services for personal, research and non-commercial use, unless otherwise agreed with us
                  in writing or allowed under applicable mandatory law.
                </li>
                <li className={styles.listItem}>
                  As between you and <em>mineralogy.rocks</em>, you own all of the content and information you post on or through the Websites or Services, and you are
                  responsible for the content and information you post on or through the Websites or Services, including its legality, reliability, and appropriateness.
                </li>
              </ol>

              <h3 className={styles.header}>5. Links to Other Websites.</h3>
              <p className={styles.paragraph}>
                The Websites or Services may contain links to third-party websites or services that are not owned or controlled by <em>mineralogy.rocks</em>.
                We have no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                You further acknowledge and agree that <em>mineralogy.rocks</em> shall not be responsible or liable, directly or indirectly, for any damage or loss caused
                or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>

              <h3 className={styles.header}>6. Termination.</h3>
              <p className={styles.paragraph}>
                We may terminate or suspend your access to the Websites or Services immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. Upon termination, your right to use the Websites or Services will immediately cease.
                All provisions of the Terms which by their nature should survive
                termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>

              <h3 className={styles.header}>7. Indemnification.</h3>
              <p className={styles.paragraph}>
                You agree to defend, indemnify, and hold harmless <em>mineralogy.rocks</em> and its licensee and licensors, and their employees, contractors, agents, officers, and directors,
                from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees),
                resulting from or arising out of a) your use and access of the Websites or Services, by you or any person using your account and password,
                or b) a breach of these Terms.
              </p>

              <h3 className={styles.header}>8. Limitation of Liability.</h3>
              <p className={styles.paragraph}>
                In no event shall <em>mineralogy.rocks</em>, nor its team members, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from:
              </p>

              <ol className={styles.list}>
                <li className={styles.listItem}>
                  your access to or use of or inability to access or use the Websites or Services;
                </li>
                <li className={styles.listItem}>
                  any conduct or content of any third party on the Websites or Services;
                </li>
                <li className={styles.listItem}>
                  any content obtained from the Websites or Services;
                </li>
                <li className={styles.listItem}>
                  and unauthorized access, use or alteration of your transmissions or content,
                  whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage,
                  and even if a remedy set forth herein is found to have failed of its essential purpose.
                </li>
              </ol>

              <h3 className={styles.header}>9. Disclaimer.</h3>
              <p className={styles.paragraph}>
                Your use of the Websites or Services is at your sole risk. The Websites and Services are provided on an “AS IS” and “AS AVAILABLE” basis.
                The Websites and Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability,
                fitness for a particular purpose, non-infringement or course of performance.
              </p>
              <p className={cx(styles.paragraph, "mt-2")}>
                <em>Mineralogy.rocks</em> its subsidiaries, affiliates, and its licensors do not warrant that:
              </p>

              <ol className={styles.list}>
                <li className={styles.listItem}>
                  the Websites or Services will function uninterrupted, secure or available at any particular time or location;
                </li>
                <li className={styles.listItem}>
                  any errors or defects will be corrected;
                </li>
                <li className={styles.listItem}>
                  the Websites or Services is free of viruses or other harmful components; or
                </li>
                <li className={styles.listItem}>
                  the results of using the Websites or Services will meet your requirements.
                </li>
              </ol>

              <h3 className={styles.header}>10. Governing Law.</h3>
              <p className={styles.paragraph}>
                These Terms shall be governed and construed in accordance with the laws of Slovakia, without regard to its conflict of law provisions.
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court,
                the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,
                and supersede and replace any prior agreements we might have between us regarding the Service.
              </p>

              <h3 className={styles.header}>11. Changes to the Terms.</h3>
              <p className={styles.paragraph}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>

              <h3 className={styles.header}>12. Contact Us.</h3>
              <p className={styles.paragraph}>
                If you have any questions about these Terms, please contact us by email at{' '}
                <ExternalLink href="mailto:admin@mineralogy.rocks" isIcon={false}>admin@mineralogy.rocks</ExternalLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

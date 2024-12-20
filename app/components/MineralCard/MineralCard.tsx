import { exploreApiResponse } from '@/lib/types';

import { useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import cx from 'clsx';

import NoData from './NoData';
import RelationChip from '@/components/RelationChip';
import ClassificationSnippet from './Classification';
import DiscoverySnippet from './Discovery';
import RelationSnippet from './Relation';
import CrystallographySnippet from './Crystallography';
import { InternalLink, ExternalLink } from '@/components/Link';
import { getRelevantFormula, getSelfOrInheritedProp } from './MineralCard.helpers';
import { getStatusGroupColor } from '@/helpers/status.helpers';
import { INHERITANCE_PROP_CHOICES } from "@/lib/constants";


function LinksSnippet({ data }) {
  if (!!data.length) {
    return (
      <div className="flex flex-wrap gap-1">
        {data.map((item, id) => {
          return (
            <ExternalLink key={id} className="text-xs" href={item.link}>{item.display_name}</ExternalLink>
          )})
        }
      </div>
    )
  };
  return <NoData />;
};


export function SnippetWrapper({ className="", title, subtitle="", children }) {
  return (
    <div className={cx("flex flex-col", className)}>
      <h3 className="text-sm lg:text-base font-medium text-start mb-2 text-font-primary">{title}</h3>
      {subtitle && (<h4>{subtitle}</h4>)}
      <div className="p-0.5">{children}</div>
    </div>
  )
};


export default function MineralCard({ index, mineral, isVisible } : { index: number, mineral: exploreApiResponse, isVisible: (boolean) => void }) {

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    rootMargin: '-56px 0px 0px 0px',
    threshold: 0.5
  });
  const [formulasFrom, formulas] = getSelfOrInheritedProp(
    mineral.formulas,
    mineral.inheritance_chain.filter(_item => _item.prop === INHERITANCE_PROP_CHOICES['formula']),
    'formulas'
  );
  const [crystallographyFrom, crystallography] = getSelfOrInheritedProp(
    mineral.crystallography,
    mineral.inheritance_chain.filter(_item => _item.prop ===  INHERITANCE_PROP_CHOICES['crystallography']),
    'crystallography'
  );

  useEffect(() => {
    if (intersection?.isIntersecting) isVisible(true);
    else isVisible(false);
    return;
  }, [intersection?.isIntersecting]);


  return (
      <div ref={intersectionRef}
           id={'mineralCard-' + index}
           className="relative scroll-mt-16 bg-white dark:bg-slate-800 shadow-gray-surface dark:shadow-none sm:rounded p-4 mx-auto h-auto transition-all duration-200">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3 md:col-span-1 pr-2 md:border-r border-slate-200 dark:border-slate-400">
            <span className="italic text-base text-font-secondary">{mineral.ima_symbol}</span>
            <div className="ml-5 space-y-1">
              <div className="flex">
                <div className={cx(getStatusGroupColor(mineral.statuses), "flex shrink-0 w-1 h-auto rounded")}></div>
                <InternalLink className="block text-xl sm:text-2xl font-semibold md:!font-bold ml-2"
                              href={`/explore/${mineral.slug}`}
                              hasIcon={false}
                              {...{ prefetch: true, target: '_blank' }}>
                  {mineral.name}
                </InternalLink>
              </div>
              <div className="flex flex-wrap items-center">
                {!!formulas.length && (
                  <h2 className="break-words max-w-full text-font-primary" dangerouslySetInnerHTML={{ __html: getRelevantFormula(formulas).formula }}></h2>
                )}
                {formulasFrom && (
                  <div className="flex flex-row items-center gap-x-1">
                    <RelationChip {...{ name: formulasFrom.name, slug: formulasFrom.slug, statuses: formulasFrom.statuses, hasArrow: true, hasLink: true }} />
                  </div>
                )}
              </div>

              {mineral.description && (
                <>
                  <div className="h-fit w-auto line-clamp-10">
                    <p className="text-font-secondary text-xs" dangerouslySetInnerHTML={{ __html: mineral.description }}></p>
                  </div>
                </>
              )}
            </div>
            <hr className="my-2 md:hidden" />
          </div>

          <div className="col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            <SnippetWrapper title="Classification">
              <ClassificationSnippet data={{ ima_statuses: mineral.ima_statuses, ns_index: mineral.ns_index, statuses: mineral.statuses }} />
            </SnippetWrapper>
            <SnippetWrapper title="Crystallography" subtitle="">
              <CrystallographySnippet isGrouping={mineral.is_grouping}
                                      slug={mineral.slug}
                                      data={crystallography}
                                      from={crystallographyFrom} />
            </SnippetWrapper>

            <SnippetWrapper title="Discovery">
              <DiscoverySnippet isGrouping={mineral.is_grouping}
                                slug={mineral.slug}
                                data={{ history: mineral.history, discoveryCountries: mineral.discovery_countries }} />
            </SnippetWrapper>

            <SnippetWrapper title="Relations" className="md:col-span-2">
              <RelationSnippet isGrouping={mineral.is_grouping}
                               slug={mineral.slug}
                               data={mineral.relations} />
            </SnippetWrapper>

            <SnippetWrapper title="Links">
              <LinksSnippet data={mineral.links} />
            </SnippetWrapper>
          </div>
        </div>

        <div className="flex justify-between mt-1">
          <span className="flex italic font-light text-font-secondary text-xxs">Last updated in {mineral.updated_at.toString()}</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-xxs">{mineral.seen}</span>
          </div>
        </div>
      </div>
  );
}

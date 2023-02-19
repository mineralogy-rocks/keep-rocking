import { exploreApiResponse } from '@/lib/types';
import { CrystalSystem, Discovery, History, Relation, Hierarchy } from '@/lib/interfaces';

import { useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import clsx from 'clsx';

import utilsStyles  from '@/styles/utils.module.scss';
import Chip from '@/components/Chip';
import ClassificationSnippet from './Classification';
import RelationSnippet from './Relation';
import { InternalLink, ExternalLink } from '@/components/Link';
import { getRelevantFormula } from './MineralCard.helpers';
import { getStatusColor } from '@/helpers/status.helpers';

export function NoData() {
  return (
    <span className="flex text-xs">No data</span>
  );
};

function CrystallographySnippet({ data} : { data: CrystalSystem[] }) {
  if (data.length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {data.map((item, id) => {
          return (
            <Chip key={id}>
              <span className="font-normal">{item.name}</span>
              {item.count ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">
                    {item.count}
                  </span>
                </>) : null}
            </Chip>
          )
        })}
      </div>
    )
  };
  return <NoData />;
};

function DiscoverySnippet({ discoveryCountries, history } : { discoveryCountries: Discovery[], history: History}) {
  if (discoveryCountries.length > 0 || history) {
    return (
      <>
      {discoveryCountries.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {discoveryCountries.map((item, id) => {
            return (
              <Chip key={id}>
                <span className="flex-1 font-normal">{item.name}</span>
                {item.count && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="flex-none font-medium">
                      {item.count}
                    </span>
                  </>)
                }
              </Chip>
            )
          })}
        </div>
      )}
      {(history?.discovery_year || history?.publication_year) && (
        <div className={clsx("text-xs", discoveryCountries.length > 0 ? 'mt-1': '')}>
          {history?.discovery_year && (<p>Discovered in <span className="font-medium">{history.discovery_year}</span></p>)}
          {history?.publication_year && (<p>Published in <span className="font-medium">{history.publication_year}</span></p>)}
        </div>
      )}
      </>
    )
  };
  return <NoData />;
};

function HierarchySnippet({ data } : { data: Hierarchy[] }) {
  if (data.length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {data.map((item, id) => {
          return (
            // <InternalLink key={id} href={item.url} text={item.name} />
            <span key={id} className="text-xs text-blue-700 font-medium">{item.name}</span>
          )
        })}
      </div>
    )
  };
  return <NoData />;
};

function LinksSnippet({ data }) {
  if (data.length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {data.map((item, id) => {
          return (
            <ExternalLink key={id} href={item.link} text={item.name} />
          )})
        }
      </div>
    )
  };
  return <NoData />;
};

export function SnippetWrapper({ title, children }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-sm lg:text-base font-medium text-start mb-2">{title}</h3>
      <div className="p-0.5">{children}</div>
    </div>
  )
};

export default function MineralCard({ index, mineral, mindatContext = {}, isVisible } : { index: number, mineral: exploreApiResponse, mindatContext, isVisible: (boolean) => void }) {

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    rootMargin: '-56px 0px 0px 0px',
    threshold: 0.5
  });
  const mineralFormula = getRelevantFormula(mineral.formulas);

  useEffect(() => {
    if (intersection?.isIntersecting) isVisible(true);
    else isVisible(false);
    return;
  }, [intersection?.isIntersecting]);


  return (
    <div ref={intersectionRef}
         id={'mineralCard-' + index}
         className="relative scroll-mt-16 bg-white shadow-surface-low rounded p-2 mx-auto h-auto transition-all duration-200">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3 md:col-span-1 pr-2 md:border-r border-gray-200">
          <span className="italic text-base">{mineral.ima_symbol}</span>
          <div className="ml-5 space-y-1">
            <div className="flex">
              <div className={clsx(getStatusColor(mineral.statuses), "flex shrink-0 w-1 h-auto rounded")}></div>
              <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold ml-2 break-words">
               {mineral.name}
              </h1>
            </div>
            {mineralFormula && <h2 className="break-words" dangerouslySetInnerHTML={{ __html: mineralFormula }}></h2>}

            {mineral.description && (
              <>
                <div className={clsx("h-fit w-auto line-clamp-10")}>
                  <p className={clsx(utilsStyles.secondaryText, "text-xs")} dangerouslySetInnerHTML={{ __html: mineral.description }}></p>
                </div>
              </>
            )}
          </div>
          <hr className="my-2 md:hidden" />
        </div>

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
          <SnippetWrapper title="Classification">
            <ClassificationSnippet data={{...mindatContext, ns_index: mineral.ns_index }} />
          </SnippetWrapper>
          <SnippetWrapper title="Crystallography">
            <CrystallographySnippet data={mineral.crystal_systems} />
          </SnippetWrapper>

          <SnippetWrapper title="Discovery">
            <DiscoverySnippet discoveryCountries={mineral.discovery_countries} history={mineral.history} />
          </SnippetWrapper>

          <SnippetWrapper title="Relations">
            <RelationSnippet slug={mineral.slug} data={mineral.relations} />
          </SnippetWrapper>

          <SnippetWrapper title="Hierarchy">
            <HierarchySnippet data={mineral.hierarchy} />
          </SnippetWrapper>

          <SnippetWrapper title="Links">
            <LinksSnippet data={mineral.links} />
          </SnippetWrapper>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="flex italic font-light text-xxs">Last updated in {mineral.updated_at.toString()}</span>
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

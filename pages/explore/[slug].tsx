import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import groupBy from 'just-group-by';

import { MINDAT_RETRIEVE_FIELDS, MINDAT_RETRIEVE_FIELDS_MAP } from '@/lib/constants';
import { Formula, History } from '@/lib/interfaces';
import { fetcher } from '@/helpers/fetcher.helpers';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { getFirstConclusiveData, getPhysicalProperties } from '@/helpers/mindat.helpers';
import { getMindatIds } from '@/helpers/data.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import Inheritance from '@/components/Inheritance';
import RelationChip from '@/components/MineralCard/RelationChip';


const Section = ({ title, children }) => (
  <section className="mt-10 px-2">
    <h2 className="text-xl font-semibold text-font-blueDark">{title}</h2>
    <div className="flex flex-col px-2 mt-5">
      {children}
    </div>
  </section>
);

export default function MineralPage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );

  const primaryMindatId = data && data.mindat_id ? data.mindat_id : null;
  const mindatIds = getMindatIds(data);

  const { data: mindatData, error: mindatError, isLoading: mindatIsLoading } = useMindatApi(
    mindatIds ? `/geomaterials/?id__in=${mindatIds.join(',')}&fields=${MINDAT_RETRIEVE_FIELDS.join(',')}` : null,
    {
      use: [ abortableMiddleware ],
      keepPreviousData: false,
    }
  );

  console.log(mindatData)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { history, formulas, name, description } : { history: History, formulas: [Formula], name: string, description: string } = data;
  const _formulas = groupBy(formulas, item => item.source.name);

  const firstConclusive = getFirstConclusiveData(
    mindatData?.results.filter(item => item.id !== primaryMindatId),
    MINDAT_RETRIEVE_FIELDS // MINDAT_RETRIEVE_FIELDS_MAP['physicalProperties']
  );
  const physicalProperties = getPhysicalProperties(
    mindatData?.results.filter(item => item.id === primaryMindatId)?.[0]
  );
  const inheritedPhysicalProperties = getPhysicalProperties(firstConclusive);

  console.log(firstConclusive);
  console.log(physicalProperties);
  console.log(inheritedPhysicalProperties);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - {name}</title>
      </Head>

      <div className="max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10 px-5">
        <h1 className="text-xl sm:text-3xl font-semibold sm:font-bold ml-2 break-words">{name}</h1>
        <p className="mt-10 px-2" dangerouslySetInnerHTML={{ __html: description }}></p>

        {history && (
          <Section title="History">
            {history.discovery_year && (<span className="">Discovered in <strong>{history.discovery_year}</strong></span>)}
            {history.publication_year && (<span className="">Published in <strong>{history.publication_year}</strong></span>)}
            {history.approval_year && (<span className="">Approved by IMA in <strong>{history.approval_year}</strong></span>)}
          </Section>
        )}

        {formulas && (
          <Section title="Stoichiometric formulas">
            {Object.keys(_formulas).map((key, index) => {
              let _localFormulas = _formulas[key].sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              })
              return (
                <div key={index} className="flex flex-col">
                  <h3 className="font-semibold">{key}</h3>
                  <ul className="relative p-2 list-none">
                    {_localFormulas.map((item, index) => (
                      <li key={index} className="relative pb-2 text-sm">
                        <div className="flex flex-col ml-3">
                          <span className="text-font-secondary font-normal text-xs">{item.created_at}</span>
                          <span className="font-medium mt-2" dangerouslySetInnerHTML={{ __html: item.formula }}></span>
                        </div>
                        <style jsx>{`
                          li::before {
                            position: absolute;
                            top: -0.25em;
                            left: calc(0.25rem*-1);
                            content: "•";
                            color: #1E40AF;
                          }
                          li::after {
                            position: absolute;
                            content: " ";
                            top: 1em;
                            left: calc(-0.1rem + 1px);
                            bottom: 0;
                            width: 1px;
                            height: auto;
                            background-color: #cbd5e1;
                          }
                        `}</style>
                      </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            )}
          </Section>
        )}

        {(physicalProperties || inheritedPhysicalProperties) && (
          <Section title="Physical properties">
            <div className="flex flex-wrap">
              {physicalProperties && (
                <div className="grid grid-cols-3 gap-2 w-1/2">
                  {Object.keys(physicalProperties).map((key, index) => (
                    <Fragment key={index}>
                      <span className="font-semibold">{key}</span>
                      <span className="col-span-2 text-sm">{physicalProperties[key]}</span>
                    </Fragment>
                  ))}
                </div>
              )}
              {inheritedPhysicalProperties && (
                <div className="w-1/2">
                  <Inheritance>
                    <h3>Compare with
                      <RelationChip name={firstConclusive.name} statuses={[0]} hasArrow={false}></RelationChip>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(inheritedPhysicalProperties).map((key, index) => (
                        <Fragment key={index}>
                          <span className="font-semibold">{key}</span>
                          <span className="col-span-2 text-sm">{inheritedPhysicalProperties[key]}</span>
                        </Fragment>
                      ))}
                    </div>
                  </Inheritance>
                </div>
              )}
            </div>
          </Section>
        )}
      </div>
    </>
  )
};
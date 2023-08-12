import { useState, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import cx from 'clsx';

import groupBy from 'just-group-by';

import { MINDAT_RETRIEVE_FIELDS } from '@/lib/constants';
import { Formula, FormulaGroupBySource, History, Crystallography } from '@/lib/interfaces';
import { fetcher } from '@/helpers/fetcher.helpers';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { getConclusiveData } from '@/helpers/mindat.helpers';
import { getMindatIds, mergeFormulas } from '@/helpers/data.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import RelationChip from '@/components/RelationChip';
import Chip from '@/components/Chip';



const Section = ({ title, children }) => (
  <section className="mt-10 px-2">
    <h2 className="text-xl mb-5 font-semibold text-font-blueDark">{title}</h2>
    {children}
  </section>
);


const DataGrid = ({ data }) => {
  const [_highlighted, _setHighlighted] = useState(data.minerals.map(item => {
    return {
      id: item.id,
      hovered: false,
      clicked: false
    }
  }));

  const handleSelection = (id, hovered = false, clicked = false, reset = false) => {
    _setHighlighted((prevHighlighted) => {
      if (clicked) {
        return prevHighlighted.map((item) => (item.id === id ? { ...item, clicked: true } : item));
      } else {
        return prevHighlighted.map((item) => {
          if (item.id === id) {
            if (reset) {
              return { ...item, hovered: false, clicked: false };
            } else {
              return { ...item, hovered: hovered };
            }
          } else {
            return item;
          }
        });
      }
    });
  };

  const highlighted = _highlighted.filter(item => item.hovered || item.clicked).map(item => item.id);

  return (
    <div className="grid grid-cols-8 px-2">
      <div className="col-span-5 grid grid-cols-4 gap-2 text-sm">
        {Object.keys(data.items).map((key, index) => {
          let _isHovered = highlighted.length && !data.items[key].some(item => item.ids.some(id => highlighted.includes(id)));
          let hoverClass = 'transition-opacity duration-300 ease-in-out';

          return (
            <Fragment key={index}>
              <span className={cx("font-semibold break-words", hoverClass, _isHovered ? 'opacity-20' : '')}>{key}</span>
              <div className="col-span-3 flex flex-col space-y-2">
                {data.items[key].map((item, index) => {
                  let _isHovered = highlighted.length && !item.ids.some(id => highlighted.includes(id));

                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-none justify-end mr-3 w-[1.5rem]">
                        {item.ids.map((id) => {
                          let _isHovered = highlighted.length && !highlighted.includes(id);
                          let _color = data.minerals.find(mineral => mineral.id === id)?.color;

                          return (
                            <span key={id}
                                  className={cx("w-2 h-2 rounded-full -ml-1 first:ml-0", hoverClass, _isHovered ? 'opacity-20' : '')}
                                  style={{ backgroundColor: _color }}>
                            </span>
                          )}
                        )}
                      </div>
                      <span className={cx(hoverClass, _isHovered ? 'opacity-20' : '')} dangerouslySetInnerHTML={{ __html: item.value }}></span>
                    </div>
                  )}
                )}
              </div>
            </Fragment>
          )}
        )}
      </div>

      <aside className="col-start-8 flex flex-col gap-2">
        {data.minerals.map((item, index) => {
          let isHighlighted = _highlighted.find(_item => _item.id === item.id);

          return (
            <div key={index} className="flex items-center justify-start">
              <div className="w-2 h-2 mr-2 rounded-full flex-none" style={{ backgroundColor: item.color }}></div>
              <RelationChip name={item.name}
                            statuses={item.statuses}
                            className="flex-none"
                            hasArrow={false}
                            hasClose={isHighlighted && isHighlighted.clicked}
                            onMouseEnter={() => { handleSelection(item.id, true) }}
                            onMouseLeave={() => { handleSelection(item.id, false) }}
                            onClick={() => { handleSelection(item.id, false, true)  }}
                            onClose={(e) => { e.stopPropagation(); handleSelection(item.id, false, false, true) }}
                            type={isHighlighted && isHighlighted.clicked ? 'highlighted' : null}  />
            </div>)
        })}
      </aside>
    </div>
  )
};

const CrystallographyNode = ({ crystal_system, crystal_class, space_group, className = "text-sm" }) => (
  <div className={cx("flex flex-col px-2 mt-2 gap-1", className)}>
    {crystal_system && (
      <span className="font-medium">Crystal System{' '}
        <span className="font-normal">{crystal_system.name}</span>
      </span>
    )}
    {crystal_class && (
      <span className="font-medium">Crystal Class{' '}
        <span className="font-normal">{crystal_class.name}</span>
      </span>
    )}
    {space_group && (
      <span className="font-medium">Space Group{' '}
        <span className="font-normal">{space_group.name}</span>
      </span>
    )}
  </div>
);


export default function MineralPage() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );
  console.log(data)

  const mindatIds = getMindatIds(data);

  const { data: mindatData, error: mindatError, isLoading: mindatIsLoading } = useMindatApi(
    mindatIds ? `/geomaterials/?id__in=${mindatIds.join(',')}&fields=${MINDAT_RETRIEVE_FIELDS.join(',')}` : null,
    {
      use: [ abortableMiddleware ],
      keepPreviousData: false,
    }
  );

  const conclusiveMindatData = getConclusiveData(
    mindatData?.results.slice(0, 5).sort((a, b) => {
      return mindatIds.indexOf(a.id) - mindatIds.indexOf(b.id);
    }),
    data
  );

  console.log(conclusiveMindatData)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { crystallography, history, formulas, name, description } : {
    crystallography: Crystallography,
    history: History,
    formulas: Formula[],
    name: string,
    description: string
  } = data;
  const hasCrystallography = crystallography || data.inheritance_chain.some(item => item.crystallography);

  const conclusiveFormulas: any[] = mergeFormulas(formulas.map((item) => {
    return { ...item, mineral: {
                        id: data.id,
                        name: data.name,
                        slug: data.slug,
                        statuses: data.statuses.map((i) => i.status_id),
                        depth: 0
                      }
    }
  }), data.inheritance_chain);
  const nrMinerals = groupBy(conclusiveFormulas, item => item.mineral.id);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - {name}</title>
      </Head>

      <div className="max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10 px-5">
        <h1 className="text-xl sm:text-3xl font-bold sm:font-extrabold ml-2 break-words text-font-blueDark">{name}</h1>
        <p className="mt-10 px-2 text-sm font-normal" dangerouslySetInnerHTML={{ __html: description }}></p>

        {hasCrystallography && (
          <Section title="Crystallography">
            <div className="flex">
              {crystallography && (<CrystallographyNode {...crystallography} />)}
              {data.inheritance_chain && (
                <div className="flex">
                  <div className="mx-2 w-[1px] bg-gray-300"></div>
                  <div>
                    <h3 className="font-medium text-sm text-font-blueDark">Related species</h3>
                    <div className="flex px-2 gap-2 mt-1">
                      {data.inheritance_chain.map((item, index) => {
                        if (item.crystallography) return (
                          <div key={index} className="bg-white p-2 rounded flex flex-col border border-gray-300 shadow-sm">
                            <div className="flex justify-start items-center">
                              <RelationChip className="flex-none" name={item.name} statuses={item.statuses} hasArrow={false} />
                            </div>
                            <CrystallographyNode className="text-xs" {...item.crystallography} />
                          </div>
                        )}
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {history && (
          <Section title="History">
            <div className="flex px-2">
              {history.discovery_year && (<span className="">Discovered in <strong>{history.discovery_year}</strong></span>)}
              {history.publication_year && (<span className="">Published in <strong>{history.publication_year}</strong></span>)}
              {history.approval_year && (<span className="">Approved by IMA in <strong>{history.approval_year}</strong></span>)}
            </div>
          </Section>
        )}

        {formulas.length > 0 && (
          <Section title="Stoichiometric formulas">
            <div className="flex gap-5">
              {Object.keys(nrMinerals).map((key, index) => {
                let items = nrMinerals[key];
                let sources = groupBy(items, item => item.source.name);
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex mb-2">
                      <RelationChip name={items[0]?.mineral.name} statuses={items[0]?.mineral.statuses} hasArrow={false} />
                    </div>
                    {Object.keys(sources).map((key_, index_) => {
                      let _formulas = sources[key_].sort((a, b) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                      })
                      return (
                        <div key={index_} className="flex flex-col text-sm">
                          <div className="flex">
                            <Chip type="black" className="mt-1">
                              <span className="font-medium text-xxs">{key_}</span>
                            </Chip>
                          </div>
                          <ul className="relative p-2 list-none">
                            {_formulas.map((item__, index__) => (
                              <li key={index__} className="relative pb-2">
                                <div className="flex flex-col ml-3">
                                  <span className="text-font-secondary font-normal text-xs">{item__.created_at}</span>
                                  <span className="font-medium mt-2" dangerouslySetInnerHTML={{ __html: item__.formula }}></span>
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
                      )
                    })}
                  </div>)
              })}
            </div>
          </Section>
        )}

        {conclusiveMindatData && conclusiveMindatData.physicalProperties && (
          <Section title="Physical properties">
            <DataGrid data={{ minerals: conclusiveMindatData.physicalProperties.minerals, items: conclusiveMindatData.physicalProperties.items }} />
          </Section>
        )}

        {conclusiveMindatData && conclusiveMindatData.opticalProperties && (
          <Section title="Optical properties">
            <DataGrid data={{ minerals: conclusiveMindatData.opticalProperties.minerals, items: conclusiveMindatData.opticalProperties.items }} />
          </Section>
        )}
      </div>
    </>
  )
};

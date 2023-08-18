import { useState, Fragment, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import cx from 'clsx';

import groupBy from 'just-group-by';
import * as Plot from "@observablehq/plot";
import { STRUCTURAL_DATA_KEYS, MINDAT_RETRIEVE_FIELDS } from '@/lib/constants';
import { Formula, Status, History, CrystallographyGrouped, Crystallography } from '@/lib/interfaces';
import { fetcher } from '@/helpers/fetcher.helpers';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { getConclusiveData } from '@/helpers/mindat.helpers';
import { getMindatIds, mergeFormulas } from '@/helpers/data.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import RelationChip from '@/components/RelationChip';
import Chip from '@/components/Chip';
import BarChart from '@/components/BarChart';



const Section = ({ title, children }) => (
  <section className="mt-10 px-2">
    <h2 className="text-xl font-semibold text-font-blueDark">{title}</h2>
    <div className="ml-2 mt-5">
      {children}
    </div>
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

const CrystallographyNode = ({ item = null, isInherited = true, className = "", ...props }) => (
  <div className={cx("relative p-2 rounded flex flex-col text-xs ml-2",
                     "outline-dashed outline-[1px] outline-gray-400",
                     className
                  )}>
    {item && (
      <div className="flex justify-start items-center">
        <RelationChip className="flex-none" name={item.name} statuses={item.statuses} hasArrow={false} />
      </div>)
    }
    <div className="flex flex-col px-2 mt-2 gap-1">
      {props.crystal_system && (
        <span className="font-medium">Crystal System{' '}
          <span className="font-normal">{props.crystal_system.name}</span>
        </span>
      )}
      {props.crystal_class && (
        <span className="font-medium">Crystal Class{' '}
          <span className="font-normal">{props.crystal_class.name}</span>
        </span>
      )}
      {props.space_group && (
        <span className="font-medium">Space Group{' '}
          <span className="font-normal">{props.space_group.name}</span>
        </span>
      )}
    </div>
  </div>);


export default function MineralPage() {
  const router = useRouter();

  const containerRef = useRef();

  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );

  const mindatIds = getMindatIds(data);

  const { data: mindatData, error: mindatError, isLoading: mindatIsLoading } = useMindatApi(
    mindatIds ? `/geomaterials/?id__in=${mindatIds.join(',')}&fields=${MINDAT_RETRIEVE_FIELDS.join(',')}` : null,
    {
      use: [ abortableMiddleware ],
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    if (!data) return;
    // reduce to array of objects with year and count
    let _history = data.history || [];
    console.log(_history)

    const plot = Plot.plot({
      width: 600,
      marginLeft: 100,
      color: {
        scheme: "BuRd",
        legend: true,
      },
      x: { label: "Year" },
      y: { label: null },
      style: {
        backgroundColor: "transparent",
      },
      marks: [
        Plot.axisY({
          tickFormat: (d) => {
            return d;
          },
        }),
        Plot.tickX(
          _history,
          {x: "year", y: "key", strokeOpacity: 0.7},
        ),
      ],
    });
    if (containerRef.current) {
      containerRef.current.appendChild(plot);
    }
    return () => plot.remove();
  }, [data]);

  const conclusiveMindatData: any = getConclusiveData(
    mindatData?.results.slice(0, 5).sort((a, b) => {
      return mindatIds.indexOf(a.id) - mindatIds.indexOf(b.id);
    }),
    data
  );

  console.log(conclusiveMindatData)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { is_grouping: isGrouping, crystallography, history, formulas, name, description, statuses, structures, elements } : {
    is_grouping: boolean,
    crystallography: Crystallography | CrystallographyGrouped[],
    history: History,
    formulas: Formula[],
    name: string,
    description: string,
    statuses: Status[],
    structures: any,
    elements: any,
  } = data;
  const hasCrystallography = crystallography || data.inheritance_chain?.some(item => item.crystallography);

  console.log(history)

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

        {history && isGrouping && (
          <Section title="History">
            <h3 className="text-sm font-medium text-font-blueDark">Activities related to discovery and approval of the group members</h3>
            <div className="flex px-2">
              {/* {history.discovery_year.map((item, index) => (<span key={index} className=""><strong>{item}</strong></span>))} */}
              {/* {history.discovery_year && (<span className="">Discovered in <strong>{history.discovery_year}</strong></span>)}
              {history.publication_year && (<span className="">Published in <strong>{history.publication_year}</strong></span>)}
              {history.approval_year && (<span className="">Approved by IMA in <strong>{history.approval_year}</strong></span>)} */}
            </div>
            <div ref={containerRef}>
            </div>
          </Section>
        )}

        {hasCrystallography && (
          <Section title="Structural context">
            <div className="flex flex-wrap gap-2">
              {isGrouping && Array.isArray(crystallography) ? (
                crystallography.map((item, index) => (
                  <div key={index} className="max-w-md relative p-2 rounded text-xs outline-dashed outline-[1px] outline-gray-400 h-full">
                    <h3 className="mb-3 flex">
                      <Chip type="default" className="mt-1 bg-indigo-300/90">
                        <span className="font-semibold flex-1 text-start text-indigo-700">{item.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-semibold text-indigo-800">
                          {item.count}
                        </span>
                      </Chip>
                    </h3>
                    <div className="flex flex-wrap justify-start items-center gap-1 ml-2 mt-2">
                      {item.minerals.map((mineral, index) => (
                        <RelationChip key={index} className="flex-none" name={mineral.name} statuses={mineral.statuses} hasArrow={false} />
                      ))}
                    </div>
                  </div>
                )
                )
              ) : (
                <>
                  {crystallography && (
                    <CrystallographyNode isInherited={false}
                                         item={{ name: name, statuses: statuses.map((item) => item.status_id) }}
                                         {...crystallography} />
                    )
                  }
                  {data.inheritance_chain.map((item, index) => {
                    if (item.crystallography) return (
                    <CrystallographyNode key={index} item={{ name: item.name, statuses: item.statuses }} { ...item.crystallography } />
                    )}
                  )}
                </>
              )}
            </div>

            {structures && (
                <div className="mt-7">
                  <h3 className="text-sm font-medium text-font-blueDark">Structural statistics based on <span className="font-bold">{structures.count}</span> samples</h3>
                  <table className="table-auto text-xs md:text-sm max-w-md mt-5">
                    <thead>
                      <tr>
                        <th className="px-2 py-1"></th>
                        <th className="px-2 py-1 text-start font-semibold">Min—Max</th>
                        <th className="px-2 py-1 text-start font-semibold">Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STRUCTURAL_DATA_KEYS.map((key, index) => (
                        <tr key={index} className="">
                          <td className="px-2 py-1 font-semibold">{key}</td>
                          <td className="px-2 py-1 text-font-secondary">{structures[key].min}—{structures[key].max}</td>
                          <td className="px-2 py-1 text-font-secondary">{structures[key].avg}</td>
                        </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
          </Section>
        )}

        {conclusiveFormulas.length > 0 && (
          <Section title="Chemical context">
            <div className="flex flex-wrap gap-5 px-2">
              <h3 className="text-sm font-medium text-font-blueDark">Stoichiometric formulas</h3>
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
                        <div key={index_} className="flex flex-col text-sm pl-1">
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
                                  {item__.note && (<span className="font-normal mt-2 text-xs" dangerouslySetInnerHTML={{ __html: item__.note }}></span>)}
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

            {elements && (
                <div className="mt-7">
                  <h3 className="text-sm font-medium text-font-blueDark">Elements recorded on EPMA</h3>
                  <div className="flex flex-col mt-5">
                    <BarChart className="h-16"
                              isAnimated={true}
                              items={elements.map((item, index) => {
                                return {
                                  id: index,
                                  value: item.count,
                                  label: item.element,
                                  subLabel: item.count
                                }
                              })} />
                  </div>
                </div>
              )}
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

'use client';

import { useMemo, useState, useEffect, useDeferredValue } from 'react';
import Head from 'next/head';

import clone from 'just-clone';
import groupBy from 'just-group-by';
import get from 'just-safe-get';
import { useQuery } from '@tanstack/react-query';

import { getAllRelations } from "@/actions";
import { CRYSTAL_SYSTEM_CHOICES, STRUCTURAL_DATA_KEYS, HISTORY_DATA_KEYS, DATA_CONTEXT_TYPES } from '@/lib/constants';
import { mineralDetailApiResponse } from '@/lib/types';
import { KeyVal } from '@/lib/interfaces';
import { mergeFormulas, prepareHistory, getConclusiveContext, getVisibleIds } from '@/helpers/data.helpers';
import RelationChip from '@/components/RelationChip';
import RelationTree from "@/components/RelationTree";
import Card from '@/components/Card';
import { ContextController } from "@/components/DataContext";
import Chip from '@/components/Chip';
import BarChart from '@/components/BarChart';
import BarcodeChart from '@/components/BarcodeChart';
import SmallSearchInput from "@/components/SmallSearchInput";
import { RelationTreeProvider } from "@/components/RelationTree";


const Section = ({ title, children }) => (
  <section className="mt-10 px-1 sm:px-2">
    <h2 className="text-xl font-semibold text-font-blue">{title}</h2>
    <div className="sm:ml-2 mt-5">
      {children}
    </div>
  </section>
);

const CrystallographyNode = ({ item = null, isInherited = true, ...props }: {
  item: { name: string, statuses: number[] } | null,
  isInherited?: boolean,
}) => (
  <Card className="flex flex-col text-xs text-font-primary" isHoverable={false}>
    {item && (
      <div className="flex justify-start items-center">
        <RelationChip className="flex-none" name={item.name} statuses={item.statuses} hasArrow={false} />
      </div>)
    }
    <div className="flex flex-col px-2 mt-2 gap-1">
      {props['crystal_system'] && (
        <span className="font-medium">Crystal System{' '}
          <span className="font-normal">{get(props, 'crystal_system.name')}</span>
        </span>
      )}
      {props['crystal_class'] && (
        <span className="font-medium">Crystal Class{' '}
          <span className="font-normal">{get(props, 'crystal_class.name')}</span>
        </span>
      )}
      {props['space_group'] && (
        <span className="font-medium">Space Group{' '}
          <span className="font-normal">{get(props, 'space_group.name')}</span>
        </span>
      )}
    </div>
  </Card>);


const StructuralData = ({ structures, selectedStructure = null }) => {
  let localStructure = selectedStructure || structures[0];

  return (
    <div className="p-2 text-xs sm:text-sm">
      {localStructure.min && STRUCTURAL_DATA_KEYS.map((key, index) => {
          let _equal = localStructure ? (localStructure.min[key] === localStructure.max[key] && localStructure.min[key] === localStructure.avg[key]) : false;
          return (
            <div key={index} className="flex">
              <span className="px-2 py-1 font-semibold">{key}</span>
              {_equal ? (
                <span className="px-2 py-1 text-font-secondary">{localStructure.min[key]}</span>
              ) : (
                <span
                  className="px-2 py-1 text-font-secondary">{localStructure.min[key]}—{localStructure.max[key]} ({localStructure.avg[key]})</span>
              )}
            </div>
          )
        }
      )}
      <br/>
      {localStructure.count > 0 && <span className="ml-2 text-xs text-font-secondary">Based on <b>{localStructure.count}</b> measurements</span>}
    </div>
  );
}


const CrystallographyCards = ({structures, members}) => {

  const localStructures = useMemo(() => clone(structures).map((item, index) => {
    item._members = members.filter(_member => {
      if (item.crystal_system) return _member.crystal_system == item.crystal_system;
      return _member.crystal_system === null;
    });
    item._offset = (1 / structures.length * index) * 0.2 + 0.2;
    item._crystalSystem = item.crystal_system ? CRYSTAL_SYSTEM_CHOICES[item.crystal_system] + ' System' : 'Unclassified';
    return item;
  }), [structures, members]);

  const [chosenStructure, setChosenStructure] = useState(localStructures[0] || null);
  const structuresCount = localStructures.reduce((acc, item) => acc + item.count, 0);

  const chosenMembers = useMemo(() => {
    // filter by crystal system if it's not null
    if (chosenStructure.crystal_system) return members.filter(_member => _member.crystal_system === chosenStructure.crystal_system) || [];
    // otherwise show 'Unknown System' and filter members accordingly
    return members.filter(_member => _member.crystal_system === null) || [];
  }, [chosenStructure, members]);


  return (
    <div className="gap-2">
      <div className="flex flex-wrap gap-3">
        {localStructures.map((structure, index) => {
          return (
            <Card key={index}
                  isHovered={chosenStructure.crystal_system == structure.crystal_system}
                  onClick={() => setChosenStructure(structure)}
                  offset={structure._offset}>
              <div className="relative flex flex-col gap-2">
                <div className="flex">
                  <Chip type="default" className="mt-1 bg-indigo-300/90 dark:bg-sky-400/30">
                    <span className="font-semibold flex-1 text-start text-sky-700 dark:text-sky-200">{structure._crystalSystem}</span>
                  </Chip>
                </div>
                <div className="flex flex-col mt-2 font-normal text-xs text-font-secondary">
                  <span><b>{structure.count}</b> measurement(s) or <b>{(structure.count / structuresCount * 100).toFixed(2)}%</b></span>
                  <span><b>{structure._members.length}</b> member(s) or <b>{(structure._members.length / members.length * 100).toFixed(2)}%</b></span>
                </div>
              </div>
            </Card>
          )}
        )}
      </div>
      <div className="grid sm:grid-cols-2 mt-7 gap-10 mx-1">
        <StructuralData structures={chosenStructure} selectedStructure={chosenStructure} />
        <div className="flex flex-wrap justify-start items-start gap-1 p-2 w-full h-min">
           {chosenMembers.map((item) => (
             <RelationChip key={item.id} className="flex-none" name={item.name} statuses={item.statuses} hasArrow={false} />
           ))}
        </div>
      </div>
    </div>)
};


export default function MineralPage({ data, slug }) {

  let {
    name,
    description,
    statuses,

    is_grouping: isGrouping,

    crystallography,
    history,
    formulas,
    structures,
    elements,
    members,
    inheritance_chain: inheritanceChain,
    contexts: _contexts,
  } : mineralDetailApiResponse = data;

  const { data: relations } = useQuery({
    queryKey: ['relation', slug],
    queryFn: () => getAllRelations(slug),
  });

  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [visibleIds, setVisibleIds]: any = useState();


  useEffect(() => {
    if (!relations) return;
    if (!relations.minerals?.length && !relations.relations?.length) return;
    if (!deferredSearch) setVisibleIds(null);
    const visibleIds = getVisibleIds(relations.minerals, relations.relations, deferredSearch);
    if (visibleIds.size) setVisibleIds(visibleIds);
  }, [deferredSearch, relations]);


  if (inheritanceChain) {
    // TODO: improve this backend-wise
    inheritanceChain = inheritanceChain.filter((item, index, self) => self.findIndex(t => t.id === item.id) === index);
    let inheritedContexts : any[] = [];
     inheritanceChain.map(item => {
        item.contexts.map(i => {
          inheritedContexts.push({
            ...i,
            mineral: {
              id: item.id,
              name: item.name,
              slug: item.slug,
              statuses: item.statuses
            }
          })
        })
    })
    _contexts.forEach((item, index) => {
      item.mineral = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        statuses: data.statuses
      }
    })
    _contexts = [..._contexts, ...inheritedContexts];
  }

  const contextGroups = _contexts ? groupBy(_contexts, item => item.context) : {};
  let contexts: any;
  let conclusiveHistory: KeyVal[];

  let _history: any = [];
  if (history) _history.push(history);
  if (members) members.map(item => { if (item.history) _history.push(item.history) });

  conclusiveHistory = prepareHistory(_history);
  if (isGrouping) {
    contexts = {};
    _contexts.map((item) => {
      contexts[DATA_CONTEXT_TYPES[item.context]] = item;
    })
    // We explicitly add empty crystal system to the list if it's not there
    // so that we are showing at least members with unknown crystal system
    // and without any structural data
    if (
        !!structures.length &&
        !structures.find(item => item.crystal_system === null) &&
        members?.find(item => item.crystal_system === null)
    ) {
      structures.push({ crystal_system: null, count: 0 })
    }
  } else {
    if (crystallography) {
      let _structure = structures.find(item => item.crystal_system === crystallography.crystal_system.id);
      if (_structure) Object.assign(_structure, { crystal_class: crystallography.crystal_class, space_group: crystallography.space_group });
    }
    contexts = getConclusiveContext(contextGroups);
  }

  const hasCrystallography = crystallography || inheritanceChain?.some(item => item.crystallography) || !!structures.length;
  const conclusiveFormulas: any[] = mergeFormulas(formulas.map((item) => {
    return { ...item, mineral: {
                        id: data.id,
                        name: data.name,
                        slug: data.slug,
                        statuses: data.statuses.map((i) => i.status_id),
                      }
    }
  }), inheritanceChain);

  const nrMinerals = groupBy(conclusiveFormulas, item => item.mineral.id);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - {name}</title>
      </Head>

      <div className="mx-auto mt-10 max-w-lg px-5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <h1 className="ml-2 break-words text-xl font-bold text-font-blue sm:text-3xl sm:font-extrabold">{name}</h1>
        <div className="mt-10 break-words px-2 text-sm font-normal text-font-secondary" dangerouslySetInnerHTML={{ __html: description }}></div>

        {!!conclusiveHistory.length && (
          <Section title="History">
            <h3 className="text-sm font-medium text-font-blue">Activities related to discovery and approval of the group members</h3>
            <BarcodeChart items={conclusiveHistory} labelX="Year" domainY={Object.values(HISTORY_DATA_KEYS)} />
          </Section>
        )}

        {hasCrystallography && (
          <Section title="Structural context">
            <div className="flex flex-col flex-wrap gap-2">
              {isGrouping ? (
                !!structures.length && <CrystallographyCards structures={structures} members={members} />
              ) : (
                <>
                  {crystallography && (
                    <CrystallographyNode isInherited={false} item={{ name: name, statuses: statuses.map((item) => item.status_id) }} {...crystallography} />
                  )}
                  {inheritanceChain?.map((item, index) => {
                    if (item.crystallography)
                      return <CrystallographyNode key={index} item={{ name: item.name, statuses: item.statuses }} {...item.crystallography} />;
                  })}
                  {!!structures.length && (
                    <div>
                      <StructuralData structures={structures} />
                    </div>
                  )}
                </>
              )}
            </div>
          </Section>
        )}

        {!!conclusiveFormulas.length && (
          <Section title="Chemical context">
            <div className="flex flex-col flex-wrap gap-5 px-2">
              <h3 className="text-sm font-medium text-font-blue">Stoichiometric formulas</h3>
              <div className="flex gap-1">
                {Object.keys(nrMinerals).map((key, index) => {
                  let items = nrMinerals[key];
                  let sources = groupBy(items, (item) => item.source.name);
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="mb-2 flex">
                        <RelationChip name={items[0]?.mineral.name} statuses={items[0]?.mineral.statuses} hasArrow={false} />
                      </div>
                      {Object.keys(sources).map((key_, index_) => {
                        let _formulas = sources[key_].sort((a, b) => {
                          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        });
                        return (
                          <div key={index_} className="flex flex-col pl-1 text-sm">
                            <div className="flex">
                              <Chip type="black" className="mt-1">
                                <span className="text-xxs font-medium">{key_}</span>
                              </Chip>
                            </div>
                            <ul className="relative max-w-lg list-none p-2">
                              {_formulas.map((item__, index__) => (
                                <li key={index__} className="relative pb-2">
                                  <div className="ml-3 flex flex-col">
                                    <span className="text-xs font-normal text-font-secondary">{item__.created_at}</span>
                                    <span className="mt-2 font-medium text-font-primary" dangerouslySetInnerHTML={{ __html: item__.formula }}></span>
                                    {item__.note && <span className="mt-2 text-xs font-normal" dangerouslySetInnerHTML={{ __html: item__.note }}></span>}
                                  </div>
                                  <style jsx>{`
                                    li::before {
                                      position: absolute;
                                      top: -0.25em;
                                      left: calc(0.25rem * -1);
                                      content: '•';
                                      color: #1e40af;
                                    }
                                    li::after {
                                      position: absolute;
                                      content: ' ';
                                      top: 1em;
                                      left: calc(-0.1rem + 1px);
                                      bottom: 0;
                                      width: 1px;
                                      height: auto;
                                      background-color: #cbd5e1;
                                    }
                                  `}</style>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {!!elements.length && (
              <div className="mt-7">
                <h3 className="text-sm font-medium text-font-blue">Elements recorded on EPMA</h3>
                <div className="mt-5 flex flex-col">
                  <BarChart
                    className="h-16"
                    isAnimated={true}
                    items={elements.map((item, index) => {
                      return {
                        id: index,
                        value: item.count,
                        label: item.element,
                        subLabel: item.count,
                      };
                    })}
                  />
                </div>
              </div>
            )}
          </Section>
        )}

        {relations && !!Object.keys(relations).length && (
          <Section title="Relations Tree">
            <h3 className="text-sm font-medium text-font-blue">Including historic and alternative names, related varieties and substances</h3>
            <div className="mt-5 space-y-4">
              <div className="max-w-lg">
                <SmallSearchInput placeholder="Find..." searchValue={search} onChange={setSearch} onReset={() => setSearch('')} />
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w- h-3">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <span className="ml-1 text-xs">Start typing to filter the relations</span>
              </div>

              <RelationTreeProvider mineralScope={relations.minerals} relations={relations.relations} visibleIds={visibleIds}>
                {relations.minerals
                  .filter((item) => item.is_main)
                  .map((item, index) => (
                    <RelationTree key={index} item={item} />
                  ))}
              </RelationTreeProvider>
            </div>
          </Section>
        )}

        {contexts &&
          Object.keys(contexts).map((key, index) => {
            let context = { contextKey: key, ...contexts[key] };
            return (
              <Section key={index} title={key}>
                <ContextController isGrouping={isGrouping} context={context} />
              </Section>
            );
          })}
      </div>
    </>
  );
};

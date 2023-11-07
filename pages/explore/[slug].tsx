import {useMemo, useState} from 'react';
import Head from 'next/head';

import clone from 'just-clone';
import groupBy from 'just-group-by';
import {CRYSTAL_SYSTEM_CHOICES, STRUCTURAL_DATA_KEYS, HISTORY_DATA_MAP} from '@/lib/constants';
import { mineralDetailApiResponse } from '@/lib/types';
import { fetcher } from '@/helpers/fetcher.helpers';
import { mergeFormulas, prepareHistory, getConclusiveContext } from '@/helpers/data.helpers';
import RelationChip from '@/components/RelationChip';
import Card from '@/components/Card';
import { ContextController } from "@/components/DataContext";
import Chip from '@/components/Chip';
import BarChart from '@/components/BarChart';
import BarcodeChart from '@/components/BarcodeChart';


const Section = ({ title, children }) => (
  <section className="mt-10 px-1 sm:px-2">
    <h2 className="text-xl font-semibold text-font-blueDark">{title}</h2>
    <div className="sm:ml-2 mt-5">
      {children}
    </div>
  </section>
);

const CrystallographyNode = ({ item = null, isInherited = true, ...props }) => (
  <Card className="flex flex-col text-xs" isHoverable={false}>
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
  </Card>);


const CrystallographyCards = ({ structures, members }) => {

  const localStructures = useMemo(() => clone(structures).map((item, index) => {
    item._members = members.filter(_member => {
      if (item.crystal_system) return _member.crystal_system?.id == item.crystal_system;
      return _member.crystal_system === null;
    });
    // item._offset = Math.random() * 0.2 + 0.2;
    item._offset = (1 / structures.length * index) * 0.2 + 0.2;
    item._crystalSystem = (CRYSTAL_SYSTEM_CHOICES[item.crystal_system] || 'Unknown') + ' System';
    return item;
  }), [structures, members]);

  const [chosenStructure, setChosenStructure] = useState(localStructures[0] || null);
  const structuresCount = localStructures.reduce((acc, item) => acc + item.count, 0);

  const chosenMembers = useMemo(() => {
    // filter by crystal system if it's not null
    if (chosenStructure.crystal_system) return members.filter(_member => _member.crystal_system?.id === chosenStructure.crystal_system) || [];
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
                  <Chip type="default" className="mt-1 bg-indigo-300/90">
                    <span className="font-semibold flex-1 text-start text-indigo-700">{structure._crystalSystem}</span>
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
        <div className="p-2 text-xs sm:text-sm">
          {chosenStructure.min && STRUCTURAL_DATA_KEYS.map((key, index) => {
            let _allEqual = chosenStructure.min[key] === chosenStructure.max[key] && chosenStructure.min[key] === chosenStructure.avg[key];
            return (
              <div key={index} className="flex">
                <span className="px-2 py-1 font-semibold">{key}</span>
                {_allEqual ? (
                  <span className="px-2 py-1 text-font-secondary">{chosenStructure.min[key]}</span>
                ) : (<span className="px-2 py-1 text-font-secondary">{chosenStructure.min[key]}—{chosenStructure.max[key]} ({chosenStructure.avg[key]})</span>)}
              </div>
            )}
          )}
        </div>
        <div className="flex flex-wrap justify-start items-start gap-1 p-2 w-full h-min">
           {chosenMembers.map((item) => (
             <RelationChip key={item.id} className="flex-none" name={item.name} statuses={item.statuses} hasArrow={false} />
           ))}
        </div>
      </div>
    </div>)
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const data = await fetcher('/mineral/' + params.slug + '/');
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data
    },
  }
}

export default function MineralPage({ data }) {

  // const router = useRouter();
  if (!data) return <div>loading...</div>;

  // const { data, error, isLoading } = useSWR(
  //   router.isReady ? '/mineral/' + router.query.slug + '/' : null,
  //   fetcher,
  // );
  //
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

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
    inheritance_chain,
    contexts: _contexts,
  } : mineralDetailApiResponse = data;

  if (inheritance_chain) {
    let inheritedContexts = [];
     inheritance_chain.map(item => {
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

  const contextGroups = _contexts ? groupBy(_contexts, item => item.type.name) : {};
  let contexts = null;
  let conclusiveHistory = [];

  if (isGrouping) {
    conclusiveHistory = prepareHistory(
      members?.map(item => item.history).filter(item => item !== null) || []
    );
    contexts = {};
    _contexts.map((item) => {
      contexts[item.type.name] = item;
    })
    // We explicitly add empty crystal system to the list if it's not there
    // so that we are showing at least members with unknown crystal system
    // and without any structural data
    if (
        !!structures.length &&
        !structures.find(item => item.crystal_system === null) &&
        members.find(item => item.crystal_system === null)
    ) {
      structures.push({ crystal_system: null, count: 0 })
    }
  } else {
    conclusiveHistory = history ? prepareHistory([history]) : [];
    contexts = getConclusiveContext(contextGroups['Physical properties']);
  }

  const hasCrystallography = crystallography || inheritance_chain?.some(item => item.crystallography) || !!structures.length;
  const conclusiveFormulas: any[] = mergeFormulas(formulas.map((item) => {
    return { ...item, mineral: {
                        id: data.id,
                        name: data.name,
                        slug: data.slug,
                        statuses: data.statuses.map((i) => i.status_id),
                        depth: 0
                      }
    }
  }), inheritance_chain);

  const nrMinerals = groupBy(conclusiveFormulas, item => item.mineral.id);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - {name}</title>
      </Head>

      <div className="max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10 px-5">
        <h1 className="text-xl sm:text-3xl font-bold sm:font-extrabold ml-2 break-words text-font-blueDark">{name}</h1>
        <div className="mt-10 px-2 text-sm font-normal break-words" dangerouslySetInnerHTML={{ __html: description }}></div>

        {!!conclusiveHistory.length && (
          <Section title="History">
            <h3 className="text-sm font-medium text-font-blueDark">Activities related to discovery and approval of the group members</h3>
            <BarcodeChart items={conclusiveHistory} labelX="Year" domainY={Object.values(HISTORY_DATA_MAP)} />
          </Section>
        )}

        {hasCrystallography && (
          <Section title="Structural context">
            <div className="flex flex-wrap gap-2">
              {isGrouping && !!structures.length ? <CrystallographyCards structures={structures} members={members} /> : (
                <>
                  {crystallography && (
                    <CrystallographyNode isInherited={false}
                                         item={{ name: name, statuses: statuses.map((item) => item.status_id) }}
                                         {...crystallography} />
                    )
                  }
                  {inheritance_chain.map((item, index) => {
                    if (item.crystallography) return (
                      <CrystallographyNode key={index} item={{ name: item.name, statuses: item.statuses }} { ...item.crystallography } />
                    )}
                  )}
                </>
              )}
            </div>
          </Section>
        )}

        {!!conclusiveFormulas.length && (
          <Section title="Chemical context">
            <div className="flex flex-col flex-wrap gap-5 px-2">
              <h3 className="text-sm font-medium text-font-blueDark">Stoichiometric formulas</h3>
              <div className="flex gap-1">
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
                            <ul className="relative p-2 list-none max-w-lg">
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
            </div>

            {!!elements.length && (
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


        {contexts && Object.keys(contexts).map((key, index) => {
          let context = { contextKey: key, ...contexts[key] };
          return (
            <Section key={index} title={key}>
              <ContextController isGrouping={isGrouping} context={context} />
            </Section>
          )
        })}
      </div>
    </>
  )
};

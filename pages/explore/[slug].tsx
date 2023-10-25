import {Fragment, useMemo, useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import cx from 'clsx';

import groupBy from 'just-group-by';
import {CRYSTAL_SYSTEM_CHOICES, STRUCTURAL_DATA_KEYS, HISTORY_DATA_MAP} from '@/lib/constants';
import { mineralDetailApiResponse } from '@/lib/types';
import { fetcher } from '@/helpers/fetcher.helpers';
import { mergeFormulas, prepareHistory, getConclusiveContext } from '@/helpers/data.helpers';
import RelationChip from '@/components/RelationChip';
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

const CrystallographyNode = ({ item = null, isInherited = true, className = "", ...props }) => (
  <div className={cx("relative p-2 rounded flex flex-col text-xs ml-2 bg-white ring-gray-500 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)]",
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


const CrystallographyCards = ({ structures, members }) => {

  const [chosenStructure, setChosenStructure] = useState(structures[0] || null);
  const structuresCount = structures.reduce((acc, item) => acc + item.count, 0);

  const chosenMembers = useMemo(() => {
    // filter by crystal system if it's not null
    if (chosenStructure.crystal_system) return members.filter(_member => _member.crystal_system?.id === chosenStructure.crystal_system) || [];
    // otherwise show 'Unknown System' and filter members accordingly
    return members.filter(_member => _member.crystal_system === null) || [];
  }, [chosenStructure, members]);

  return (
    <div className="gap-2">
      <div className="flex flex-wrap gap-3">
        {structures.map((_structure, index) => {
          let _localMembers = members.filter(_member => {
            if (_structure.crystal_system) return _member.crystal_system?.id == _structure.crystal_system;
            return _member.crystal_system === null;
          });
          let crystalSystem = (CRYSTAL_SYSTEM_CHOICES[_structure.crystal_system] || 'Unknown') + ' System';

          return (
            <Fragment key={_structure.crystal_system}>
              <div className={cx("cursor-pointer relative w-56 rounded-sm p-3 transition ring-1 ring-slate-300/40",
                                 chosenStructure.crystal_system == _structure.crystal_system ? "ring-1 ring-slate-600/[0.04] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)]" : "hover:bg-slate-50")}
                   onClick={() => setChosenStructure(_structure)}>
                <div className="relative flex flex-col gap-2">
                  <div className="flex">
                    <Chip type="default" className="mt-1 bg-indigo-300/90">
                      <span className="font-semibold flex-1 text-start text-indigo-700">{crystalSystem}</span>
                    </Chip>
                  </div>
                  <div className="flex flex-col mt-2 font-normal text-xs text-font-secondary">
                    <span><b>{_structure.count}</b> measurement(s) or <b>{(_structure.count / structuresCount * 100).toFixed(2)}%</b></span>
                    <span><b>{_localMembers.length}</b> member(s) or <b>{(_localMembers.length / members.length * 100).toFixed(2)}%</b></span>
                  </div>
                </div>
                <svg viewBox="0 0 384 12" fill="none" aria-hidden="true" className="absolute right-0 top-full w-[384px] max-w-[120%] transition">
                  <mask id=":r1t:-a" maskUnits="userSpaceOnUse" x="48" y="0" width="269" height="4" style={{ maskType: 'alpha' }}>
                    <path transform="rotate(180 316.656 4)" fill="#C4C4C4" d="M316.656 4h268v4h-268z"></path>
                  </mask>
                  <g filter="url(#:r1t:-b)" mask="url(#:r1t:-a)">
                    <path transform="rotate(180 292.656 1)" fill="url(#:r1t:-c)" d="M292.656 1h220v2h-220z"></path>
                  </g>
                  <mask id=":r1t:-d" maskUnits="userSpaceOnUse" x="116" y="0" width="268" height="12" style={{ maskType: 'alpha' }}>
                    <path transform="rotate(180 384 12)" fill="#C4C4C4" d="M384 12h268v12H384z"></path>
                  </mask>
                  <g filter="url(#:r1t:-e)" mask="url(#:r1t:-d)">
                    <path transform="rotate(180 360 1)" fill="url(#:r1t:-f)" d="M360 1h220v2H360z"></path>
                  </g>
                  <defs>
                    <linearGradient id=":r1t:-c" x1="292.656" y1="1" x2="512.656" y2="1" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#A78BFA" stop-opacity="0"></stop>
                      <stop offset=".323" stop-color="#1A1AF9"></stop>
                      <stop offset=".672" stop-color="#AF17B4" stop-opacity=".3"></stop>
                      <stop offset="1" stop-color="#1336AC" stop-opacity="0"></stop>
                    </linearGradient>
                    <linearGradient id=":r1t:-f" x1="360" y1="1" x2="580" y2="1" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#A78BFA" stop-opacity="0"></stop>
                      <stop offset=".323" stop-color="#1A1AF9"></stop>
                      <stop offset=".672" stop-color="#AF17B4" stop-opacity=".3"></stop>
                      <stop offset="1" stop-color="#1336AC" stop-opacity="0"></stop>
                    </linearGradient>
                    <filter id=":r1t:-b" x="71.656" y="-2" width="222" height="4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                      <feGaussianBlur stdDeviation=".5" result="effect1_foregroundBlur_311_43467"></feGaussianBlur>
                    </filter>
                    <filter id=":r1t:-e" x="131" y="-10" width="238" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                      <feGaussianBlur stdDeviation="4.5" result="effect1_foregroundBlur_311_43467"></feGaussianBlur>
                    </filter>
                  </defs>
                </svg>
              </div>
            </Fragment>
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


export default function MineralPage() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );


  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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

  console.log(contexts)

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

        {conclusiveHistory.length > 0 && (
          <Section title="History">
            <h3 className="text-sm font-medium text-font-blueDark">Activities related to discovery and approval of the group members</h3>
            <BarcodeChart items={conclusiveHistory} labelX="Year" domainX={Object.values(HISTORY_DATA_MAP)} />
          </Section>
        )}

        {hasCrystallography && (
          <Section title="Structural context">
            <div className="flex flex-wrap gap-2">
              {isGrouping && structures.length > 0 ? <CrystallographyCards structures={structures} members={members} /> : (
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

        {conclusiveFormulas.length > 0 && (
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

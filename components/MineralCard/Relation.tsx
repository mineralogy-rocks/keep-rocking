import { Relation } from '@/lib/interfaces';

import { useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import { fetcher } from '@/helpers/fetcher.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import Chip from '@/components/Chip';
import Tooltip from './Tooltip';
import NoData from './NoData';
import { getRelationEndpoint } from './MineralCard.helpers';


const buttonComponent = (item, isLoading, error, isShown, onClick) => {
  return (
    <Chip type="default" className={clsx(isShown && "bg-sky-500/80", error && "bg-red-500/80")} {...{isLoading, onClick}}>
      <span className="font-normal flex-1 text-start">{item.group.name}</span>
      {item.count && (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-medium">
            {item.count}
          </span>
        </>)}
    </Chip>
  )
};

export default function RelationSnippet({ slug, data } : { slug: string, data: Relation[] }) {
  const [relation, setRelation] = useState('');
  const handleRelationUpdate = (newRelationId) => {
    let newRelation = getRelationEndpoint(newRelationId);
    setRelation(newRelation);
  };

  const { data: relationData, error, isLoading } = useSWR(
    relation ? '/mineral/' + slug + '/' + relation : null,
    fetcher,
    {
      use: [ abortableMiddleware ],
      keepPreviousData: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (data.length > 0) {
    return (
      <div className="flex flex-wrap gap-1 text-xs">
        {data.map((item, id) => {

          // find the current relation
          const isCurrent = relation === getRelationEndpoint(item.group.id);

          return (
            <Tooltip key={id}
                     isShown={isCurrent && !!relationData}
                     button={(open) => buttonComponent(item, isCurrent && isLoading, isCurrent && !!error, isCurrent && open && !!relationData, (e) => {e && handleRelationUpdate(item.group.id)} )}>
              {relationData &&
                (<div className="relative flex flex-col space-y-1 p-2">
                  <div className="border-b">
                    <p className="font-semibold pb-2 mr-5">Related {item.group.name}</p>
                  </div>
                  <div className="w-auto max-h-[20vh] overflow-auto">
                    <ul className="flex flex-col space-y-1 list-decimal list-inside">
                      {relationData.map((item_, i) => {
                        return (
                          <li key={i} className="flex flex-wrap">
                            <span className="font-medium flex-1">{item_.name}</span>
                            {item_.formula && (<span className="font-normal ml-2" dangerouslySetInnerHTML={{ __html: item_.formula }}></span>)}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>)
              }
            </Tooltip>
          )
        })}
      </div>
    )
  };
  return <NoData />;
};

import { useState } from 'react';

import { useQuery } from "@tanstack/react-query";

import { getRelations } from "@/actions";

import { Relation } from '@/lib/interfaces';
import Button from './Button';
import Tooltip from './Tooltip';
import NoData from './NoData';
import { getRelationEndpoint, pluralizeGroupName } from './MineralCard.helpers';


export default function RelationSnippet({ isGrouping, slug, data } : { isGrouping: boolean, slug: string, data: Relation[] }) {
  const [relation, setRelation] = useState('');
  const handleRelationUpdate = (newRelationId) => {
    setRelation(getRelationEndpoint(newRelationId));
  };


  const { error, data: relationData, isLoading } = useQuery({
    queryKey: [slug, relation],
    queryFn: () => getRelations(slug, relation),
    enabled: Boolean(relation),
  });


  if (!!data.length) {
    return (
      <div className="flex flex-wrap gap-1 text-xs">
        {data.map((item, id) => {
          const isCurrent = relation === getRelationEndpoint(item.group.id);
          const groupName = pluralizeGroupName(item.group, item.count, isGrouping);
          return (
            <Tooltip key={id}
                     isShown={isCurrent && !!relationData}
                     button={(open) => <Button {...{
                        item: { key: groupName, value: item.count ?? null },
                        isLoading: isCurrent && isLoading,
                        error: isCurrent && !!error,
                        isShown: isCurrent && open && !!relationData,
                        onClick: (e) => e && handleRelationUpdate(item.group.id) }
                      }/>
                     }>
              {relationData &&
                (<div className="relative flex flex-col space-y-1 p-2">
                  <div>
                    <p className="font-semibold mr-5">Related {groupName}</p>
                  </div>
                  <hr />
                  <div className="w-auto max-h-[20vh] overflow-auto">
                    <ul className="flex flex-col space-y-1 list-decimal list-inside marker:text-slate-500 marker:font-normal">
                      {relationData.map((item_, i) => {
                        return (
                          <li key={i} className="flex-wrap">
                            <span className="font-medium flex-1">{item_.name}</span>
                            {item_.formula && (<span className="font-normal ml-2 float-right" dangerouslySetInnerHTML={{ __html: item_.formula }}></span>)}
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

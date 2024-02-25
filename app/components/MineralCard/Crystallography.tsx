import { useState } from 'react';
import useSWR from 'swr';

import { From, CrystalSystem } from '@/lib/interfaces';
import { getExplore } from "@/actions";

import Button from './Button';
import RelationChip from '@/components/RelationChip';
import Tooltip from './Tooltip';
import NoData from './NoData';


function ButtonWithRelation(props) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-start cursor-default">
      <Button {...props} />
      {props.from && (
        <RelationChip {...{ name: props.from.name, statuses: props.from.statuses}} />
      )}
    </div>
  )
}

export default function CrystallographySnippet({ isGrouping, slug, data, from = null } : { isGrouping: boolean, slug: string, data: CrystalSystem[], from: From | null }) {

  const [selectedId, setSelectedId] = useState('');
  const handleSelection = (newSelectionId) => {
    setSelectedId(newSelectionId);
  };

  const { data: _data, error, isLoading } = useSWR(
    selectedId ? slug + '/grouping-members/?status=1&crystal_system=' + selectedId : null,
    (url) => getExplore(url),
    {
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
          const isCurrent = selectedId === item.id;
          return (
            <Tooltip key={id}
                     isShown={isCurrent && !!_data}
                     button={(open) => <ButtonWithRelation {...{
                        from: from,
                        item: {
                          key: item.name,
                          value: item.count ?? null
                        },
                        isLoading: isCurrent && isLoading,
                        error: isCurrent && !!error,
                        isShown: isCurrent && open && !!_data,
                        isClickable: isGrouping,
                        onClick: (e) => isGrouping && e && handleSelection(item.id) }
                      }/>
                     }>
              {_data &&
                (<div className="relative flex flex-col space-y-1 p-2">
                  <div className="border-b">
                    <p className="font-semibold pb-2 mr-5">Minerals with {item.name} crystal system</p>
                  </div>
                  <div className="w-auto max-h-[20vh] overflow-auto">
                    <ul className="flex flex-col space-y-1 list-decimal list-inside marker:text-gray-500 marker:font-normal">
                      {_data.map((item_, i) => {
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

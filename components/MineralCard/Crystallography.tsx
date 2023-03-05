import { useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import { CrystalSystem } from '@/lib/interfaces';
import { fetcher } from '@/helpers/fetcher.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import { capitalize } from '@utils';

import Button from './Button';
import Tooltip from './Tooltip';
import NoData from './NoData';


export default function CrystallographySnippet({ isGrouping, slug, data } : { isGrouping: boolean, slug: string, data: CrystalSystem[] }) {

  const [selectedId, setSelectedId] = useState('');
  const handleSelection = (newSelectionId) => {
    setSelectedId(newSelectionId);
  };

  const { data: _data, error, isLoading } = useSWR(
    selectedId ? '/mineral/' + slug + '/grouping-members/?status=1&crystal_system=' + selectedId : null,
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
          const isCurrent = selectedId === item.id;
          return (
            <Tooltip key={id}
                     isShown={isCurrent && !!_data}
                     button={(open) => <Button {...{
                        item: { key: item.name, value: item.count ?? null },
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
import { useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import { fetcher } from '@/helpers/fetcher.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';
import Button from './Button';
import Tooltip from './Tooltip';
import NoData from './NoData';
import { Discovery, History } from '@/lib/interfaces';


export default function DiscoverySnippet({ isGrouping, slug, data } : { isGrouping: boolean, slug: string, data: { discoveryCountries: Discovery[], history: History } }) {
  const { discoveryCountries, history } = data;
  const [country, setCountry] = useState('');
  const handleCountryUpdate = (newCountry) => {
    setCountry(newCountry);
  };

  const { data: countryData, error, isLoading } = useSWR(
    country ? '/mineral/' + slug + '/grouping-members/?status=1&discovery_country=' + country : null,
    fetcher,
    {
      use: [ abortableMiddleware ],
      keepPreviousData: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const _fields = ['ima_year', 'approval_year', 'discovery_year', 'publication_year'];


  if (discoveryCountries.length > 0 || (history && _fields.some(key => Object.keys(history).includes(key)) && _fields.some(key => history[key]))) {
    return (
      <>
      {discoveryCountries.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs">
          {discoveryCountries.map((item, id) => {
             const isCurrent = country === item.id;
             return (
               <Tooltip key={id}
                        isShown={isCurrent && !!countryData}
                        button={(open) => <Button {...{
                           item: { key: item.name, value: item.count ?? null },
                           isLoading: isCurrent && isLoading,
                           error: isCurrent && !!error,
                           isShown: isCurrent && open && !!countryData,
                           isClickable: isGrouping,
                           onClick: (e) => isGrouping && e && handleCountryUpdate(item.id) }
                         }/>
                        }>
                 {countryData &&
                   (<div className="relative flex flex-col space-y-1 p-2">
                     <div className="border-b">
                       <p className="font-semibold pb-2 mr-5">Discovered in {item.name}</p>
                     </div>
                     <div className="w-auto max-h-[20vh] overflow-auto">
                       <ul className="flex flex-col space-y-1 list-decimal list-inside marker:text-gray-500 marker:font-normal">
                         {countryData.map((item_, i) => {
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
      )}
      {(history?.discovery_year || history?.publication_year) && (
        <div className={clsx("text-xs", discoveryCountries.length > 0 ? 'mt-1': '')}>
          {history?.discovery_year && (<p>Discovered in <span className="font-medium">{history.discovery_year}</span></p>)}
          {history?.publication_year && (<p>Published in <span className="font-medium">{history.publication_year}</span></p>)}
        </div>
      )}
      </>
    )
  };
  return <NoData />;
};

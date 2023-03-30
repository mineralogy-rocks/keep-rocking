import { useState } from 'react';
import groupBy from 'just-group-by';

import { getRelationDesignation } from './MineralCard.helpers';
import { getIMAStatus } from '@/helpers/status.helpers';
import { camelize } from '@utils';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { Status } from '@/lib/interfaces';

import { QuestionIcon, ErrorIcon, LoadingIcon } from './Icons';
import Chip from '@/components/Chip';
import RelationChip from './RelationChip';
import Tooltip from './Tooltip';
import NoData from './NoData';


const buttonComponent = (isLoading, error, isShown, onClick) => {
  if (isLoading) return (<LoadingIcon className="stroke-cyan-900 animate-spin" />);
  if(error) return (<ErrorIcon className="stroke-red-500" />);
  else return (<QuestionIcon className={isShown ? "stroke-cyan-900 transition-colors duration-1000" : "stroke-gray-400"} onClick={onClick} />)
};


export default function ClassificationSnippet({ data }) {

  const [nickelIndex, setNickelIndex] = useState('');
  const [danaIndex, setDanaIndex] = useState('');
  const handleNickelIndexUpdate = (newIndex) => {
    setNickelIndex(newIndex);
  };
  const handleDanaIndexUpdate = (newIndex) => {
    setDanaIndex(newIndex);
  };
  const { data: NickelStrunzData, error, isLoading } = useMindatApi(
    nickelIndex ? `/nickel-strunz-10/families/?index=${nickelIndex}` : null
  );
  const { data: DanaData, error: DanaError, isLoading: DanaIsLoading } = useMindatApi(
    danaIndex ? `/dana-8/subgroups/?index=${danaIndex}` : null
  );
  const _fields = ['strunz_index', 'dana_index', 'ima_status',];

  const { statuses, strunz_index, dana_index, ima_status } : {
    statuses: Status[],
    strunz_index: any,
    dana_index: any,
    ima_status: any
  } = data;
  const groups = groupBy(statuses, item => item.group.name);
  let _groups = [];

  Object.keys(groups).map(group => {
    let _group = groups[group][0].group;
    let designation = getRelationDesignation(groups[group], _group);
    if (_group.id !== 11) _groups.push(designation);
  })

  if (data && _fields.some(key => Object.keys(data).includes(key)) && _fields.some(key => data[key]) || _groups.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        {_groups.length > 0 && (
          <ul role="list" className="flex flex-col gap-1 w-full">
            {_groups.map((group, id) => {
              return group.minerals ? (
                <li key={id} className="flex flex-wrap items-center gap-1">
                  <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-600">{group.name} of</span>
                  {group.minerals.map((mineral, id) => {
                    return (
                      <RelationChip key={id} name={mineral.name} statuses={mineral.statuses} hasArrow={false} />
                    )
                  })}
                </li>
              ) : (
                <li key={id} className="flex flex-wrap items-center gap-1">
                  <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-600">{group.name}</span>
                </li>
              )
            })}
          </ul>
        )}

          {ima_status && (
            <div className="flex w-full">
              <div className="flex flex-wrap gap-1">
                {ima_status.map((status, id) => {
                  let _status = getIMAStatus(status);
                    return (
                      <Chip key={id} className="rounded" type={_status}>
                        <span className="font-medium">{camelize(status)}</span>
                      </Chip>
                    )
                  })
                }
              </div>
            </div>
          )}
        {strunz_index && (
          <div className="flex flex-wrap items-center text-xs">
            <h4 className="font-medium mr-1">Nickel-Strunz (10th)</h4>

            <div className="flex items-center rounded py-0.5">
              <span className="">{strunz_index}</span>
              <Tooltip key={strunz_index}
                       isShown={!!NickelStrunzData}
                       button={(open) => buttonComponent(isLoading, !!error, open && !!NickelStrunzData, (e) => {e && handleNickelIndexUpdate(strunz_index)} )}>
                {NickelStrunzData?.results &&
                  (<div className="relative flex flex-col space-y-1 p-1">
                    <div className="border-b">
                      <p className="font-semibold pb-2 mr-5">Nickel-Strunz (2023) Classification of mindat.org</p>
                    </div>
                    <div><span className="font-semibold">{NickelStrunzData?.results[0].strunz1}:</span><span className="ml-1">{NickelStrunzData?.results[0].title1}</span></div>
                    <div><span className="font-semibold">{NickelStrunzData?.results[0].strunz2}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: NickelStrunzData?.results[0].title2 }}></span></div>
                    <div><span className="font-semibold">{NickelStrunzData?.results[0].strunz3}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: NickelStrunzData?.results[0].title3 }}></span></div>
                  </div>)
                }
              </Tooltip>
            </div>
          </div>
        )}
        {dana_index && (
          <div className="flex flex-wrap items-center text-xs">
            <h4 className="font-medium mr-1">Dana (8th)</h4>
            <div className="flex items-center rounded px-1 py-0.5">
              <span className="">{dana_index}</span>
              <Tooltip key={dana_index}
                       isShown={!!DanaData}
                       button={(open) => buttonComponent(DanaIsLoading, !!DanaError, open && !!DanaData, (e) => {e && handleDanaIndexUpdate(dana_index)} )}>
                {DanaData?.results &&
                  (<div className="relative flex flex-col space-y-1 p-1">
                    <div className="border-b">
                      <p className="font-semibold pb-2 mr-5">Dana Classification 8th edition of mindat.org</p>
                    </div>
                    <div><span className="font-semibold">{DanaData?.results[0].dana1}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: DanaData?.results[0].title1 }}></span></div>
                    <div><span className="font-semibold">{DanaData?.results[0].dana2}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: DanaData?.results[0].title2 }}></span></div>
                  </div>)
                }
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    )
  };
  return <NoData />;
};

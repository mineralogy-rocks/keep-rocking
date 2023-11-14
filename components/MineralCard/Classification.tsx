import { useState } from 'react';
import groupBy from 'just-group-by';
import { motion, Variants } from 'framer-motion';

import { getRelationDesignation } from './MineralCard.helpers';
import { camelize } from '@utils';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { Status } from '@/lib/interfaces';

import { QuestionIcon, ErrorIcon, LoadingIcon } from './Icons';
import Chip from '@/components/Chip';
import RelationChip from '@/components/RelationChip';
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
  const _fields = ['strunz_index', 'dana_index', 'ima_statuses',];

  const { statuses, strunz_index, dana_index, ima_statuses } : {
    statuses: Status[],
    strunz_index: any,
    dana_index: any,
    ima_statuses: any
  } = data;
  const groups = groupBy(statuses, item => item.group.name);
  let _groups = [];

  Object.keys(groups).map(group => {
    let _group = groups[group][0].group;
    let designation = getRelationDesignation(groups[group], _group);
    if (_group.id !== 11) _groups.push(designation);
  });

  const container: Variants = {
    ready: {
      height: "auto",
      transition: {
        staggerChildren: 0.07,
      }
    },
    loading: {
      height: 0,
    }
  };
  const item: Variants = {
    ready: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    },
    loading: {
      opacity: 0.4,
      y: 30,
    }
  };

  if (
    data &&
    _fields.some(key => Object.keys(data).includes(key)) &&
    _fields.some(key => data[key] && data[key].length) ||
    _groups.length > 0
  ) {
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

        <div key={data.id}>
          {ima_statuses && (
            <div className="flex w-full">
              <div className="flex flex-wrap gap-1">
                {ima_statuses.map((status, index) => {
                    return (
                      <Chip key={index} className="rounded" type={status}>
                        <span className="font-medium">{camelize(status)}</span>
                      </Chip>
                    )
                  })
                }
              </div>
            </div>
          )}
          {strunz_index && (
            <motion.div className="flex flex-wrap items-center text-xs" variants={item}>
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
            </motion.div>
          )}
          {dana_index && (
            <motion.div className="flex flex-wrap items-center text-xs" variants={item}>
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
            </motion.div>
          )}
        </div>
      </div>
    )
  };
  return <NoData />;
};

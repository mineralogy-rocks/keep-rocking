
import { useState } from 'react';

import clsx from 'clsx';

import { getIMAStatusColor } from '@/helpers/status.helpers';
import { camelize } from '@utils';
import { useMindatApi } from '@/hooks/use-mindat-api';

import Chip from '@/components/Chip';
import Tooltip from './Tooltip';
import  { NoData }  from './MineralCard';


export default function ClassificationSnippet({ data }) {

  const [index, setIndex] = useState('');
  const handleIndexUpdate = (newIndex) => {
    setIndex(newIndex);
  };

  const { data: _data, error, isLoading } = useMindatApi(
    index ? `/nickel-strunz-10/families/?index=${index}` : null
  );
  let _fields = ['strunz_index', 'dana_index', 'ima_status',];

  if (data && _fields.some(key => Object.keys(data).includes(key)) && _fields.some(key => data[key])) {
    const { ns_index, strunz_index, dana_index, ima_status } = data;
    return (
      <div className="flex flex-col">
        <div className="flex w-full">
          {ima_status && (
            <div className="flex flex-wrap gap-1">
              {ima_status.map((item, id) => {
                  let { textColor, backgroundColor } = getIMAStatusColor(item);
                  return (
                    <Chip key={id} className={clsx("rounded", backgroundColor)}>
                      <span className={clsx("font-normal", textColor)}>{camelize(item)}</span>
                    </Chip>
                  )
                })
              }
            </div>
          )}
        </div>
        {/* {ns_index && (
          <div className="flex flex-wrap items-center text-xs mt-1">
            <h4 className="font-medium mr-1">Nickel-Strunz (10th)</h4>
            <div className="flex items-center rounded py-0.5">
              <span className="">{ns_index}</span>
              </div>
          </div>
        )} */}
        {strunz_index && (
          <div className="flex flex-wrap items-center text-xs mt-1">
            <h4 className="font-medium mr-1">Nickel-Strunz (10th)</h4>

            <div className="flex items-center rounded py-0.5">
              <span className="">{strunz_index}</span>
              <Tooltip key={strunz_index} onClick={(e) => {e && handleIndexUpdate(strunz_index)}} isShown={!!_data} isLoading={isLoading} error={error}>
                {_data?.results &&
                  (<div className="relative flex flex-col space-y-1 p-1">
                    <div className="border-b">
                      <p className="font-semibold pb-2 mr-5">Nickel-Strunz (2023) Classification of mindat.org</p>
                    </div>
                    <div><span className="font-semibold">{_data?.results[0].strunz1}:</span><span className="ml-1">{_data?.results[0].title1}</span></div>
                    <div><span className="font-semibold">{_data?.results[0].strunz2}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title2 }}></span></div>
                    <div><span className="font-semibold">{_data?.results[0].strunz3}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title3 }}></span></div>
                  </div>)
                }
              </Tooltip>
            </div>
          </div>
        )}
        {dana_index && (
          <div className="flex flex-wrap items-center text-xs mt-1">
            <h4 className="font-medium mr-1">Dana (8th)</h4>
            <div className="flex items-center rounded px-1 py-0.5">
              <span className="">{dana_index}</span>
              {/* <QuestionIcon mouseEventHandler={(e) => e && console.log(dana_index)} /> */}
            </div>
          </div>
        )}
      </div>
    )
  };
  return <NoData />;
};

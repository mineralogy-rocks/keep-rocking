
import { useState, Fragment } from 'react';
import clsx from 'clsx';

import { Popover, Transition } from '@headlessui/react'
import { getIMAStatusColor } from '@/helpers/status.helpers';
import { camelize } from '@utils';
import { useMindatApi } from '@/hooks/use-mindat-api';

import Chip from '@/components/Chip';
import QuestionIcon from './QuestionIcon';
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
    const { strunz_index, dana_index, ima_status } = data;
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
        {strunz_index && (
          <div className="flex items-center flex-wrap text-xs mt-1">
            <h4 className="font-medium mr-1">Nickel-Strunz (10th)</h4>
            <div className="flex items-center rounded py-0.5">
              <span className="">{strunz_index}</span>
              <Popover className="relative">
                {({ open }) => {
                  return (
                    <>
                      <Popover.Button className="flex outline-none">
                        <QuestionIcon className={open ? "stroke-cyan-900 transition-colors duration-1000" : "stroke-gray-400"} onClick={(e) => {e && handleIndexUpdate(strunz_index)}} />
                      </Popover.Button>
                      <Transition as={Fragment}
                                  show={open && !!_data?.results}
                                  enter="transition duration-1000 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-100 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0">
                        <Popover.Panel static className="absolute mt-1 w-screen max-w-sm z-10 bg-gray-50 drop-shadow-sm border border-gray-400 rounded-sm p-1">
                          <>
                            {_data?.results &&
                              (<div className="flex flex-col space-y-1 p-1">
                                <div><span className="font-semibold">{_data?.results[0].strunz1}:</span><span className="ml-1">{_data?.results[0].title1}</span></div>
                                <div><span className="font-semibold">{_data?.results[0].strunz2}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title2 }}></span></div>
                                <div><span className="font-semibold">{_data?.results[0].strunz3}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title3 }}></span></div>
                              </div>)
                            }
                          </>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                }
              </Popover>
            </div>
          </div>
        )}
        {dana_index && (
          <div className="flex flex-wrap items-center text-xs mt-1">
            <h4 className="font-medium mr-1">Dana</h4>
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

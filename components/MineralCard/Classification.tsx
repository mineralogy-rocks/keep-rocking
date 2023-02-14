
import { useState, Fragment, useRef } from 'react';

import clsx from 'clsx';
import { usePopper } from 'react-popper';
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

  const popperRef = useRef(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
    ],
  });


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
                {({ open, close }) => {
                  return (
                    <>
                      <Popover.Button ref={setReferenceElement} className="flex outline-none">
                        <QuestionIcon className={open ? "stroke-cyan-900 transition-colors duration-1000" : "stroke-gray-400"} onClick={(e) => {e && handleIndexUpdate(strunz_index)}} />
                      </Popover.Button>
                      <div ref={popperRef}
                           style={styles.popper}
                           {...attributes.popper}>
                        <Transition as={Fragment}
                                    show={open && !!_data?.results}
                                    enter="transition duration-500 ease-out"
                                    enterFrom="transform translate-y-5 opacity-0"
                                    enterTo="transform translate-y-0 opacity-100"
                                    leave="transition duration-100 ease-out"
                                    leaveFrom="transform translate-y-0 opacity-100"
                                    leaveTo="transform translate-y-5 opacity-0"
                                    beforeEnter={() => setPopperElement(popperRef.current)}
                                    afterLeave={() => setPopperElement(null)}>
                          <Popover.Panel as="div"
                                         static
                                         className="w-screen max-w-xs md:max-w-sm z-10 bg-zinc-50 shadow-lg shadow-gray-200 border-[0.5px] border-gray-200 rounded-md p-1">
                            <>
                              {_data?.results &&
                                (<div className="relative flex flex-col space-y-1 p-1">
                                  <button type="button" onClick={(e) => { e.preventDefault(); close() }} className="absolute top-1 right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 stroke-gray-100">
                                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                  </button>

                                  <p className="font-semibold pb-2 mr-5">Nickel-Strunz (2023) Classification of mindat.org</p>
                                  <div><span className="font-semibold">{_data?.results[0].strunz1}:</span><span className="ml-1">{_data?.results[0].title1}</span></div>
                                  <div><span className="font-semibold">{_data?.results[0].strunz2}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title2 }}></span></div>
                                  <div><span className="font-semibold">{_data?.results[0].strunz3}:</span><span className="ml-1" dangerouslySetInnerHTML={{ __html: _data?.results[0].title3 }}></span></div>
                                </div>)
                              }
                            </>
                          </Popover.Panel>
                        </Transition>
                      </div>
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

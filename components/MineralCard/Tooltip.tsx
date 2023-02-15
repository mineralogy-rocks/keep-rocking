import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';
import { useState, Fragment, useRef } from 'react';

import { QuestionIcon, ErrorIcon, LoadingIcon } from './Icons';

export default function Tooltip({ className, onClick, isShown=false, isLoading=false, error=false, children } :
  {
    className?: string,
    onClick?: (e: any) => void,
    isShown?: boolean,
    isLoading?: boolean,
    error?: boolean,
    children: React.ReactNode,
    props?: any
  }) {

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

    return (
      <Popover className="relative">
      {({ open, close }) => {
        return (
          <>
            <Popover.Button ref={setReferenceElement} className="flex outline-none">
              {isLoading && (<LoadingIcon className="stroke-cyan-900 animate-spin" />)}
              {!isLoading && (error ? (
                <ErrorIcon className="stroke-red-500" />
              ) : (
                <QuestionIcon className={open && isShown ? "stroke-cyan-900 transition-colors duration-1000" : "stroke-gray-400"} onClick={onClick} />
              ))}
            </Popover.Button>
            <div ref={popperRef}
                 style={styles.popper}
                 {...attributes.popper}>
              <Transition as={Fragment}
                          show={open && isShown}
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
                               className={clsx("w-screen max-w-xs md:max-w-sm z-10 bg-zinc-50 shadow-lg shadow-gray-200 border-[0.5px] border-gray-200 rounded-md p-1", className)}>
                  <>
                    <button type="button" onClick={(e) => { console.log('asfas');  e.preventDefault(); close() }} className="absolute top-1 right-1 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 stroke-gray-100">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                    {children}
                  </>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        )}
      }
    </Popover>
  )
}

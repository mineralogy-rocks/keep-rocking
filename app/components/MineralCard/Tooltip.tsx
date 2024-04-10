import { useState, Fragment, useRef } from 'react';

import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';


export default function Tooltip({ className, isShown=false, children, button } :
  {
    className?: string,
    isShown?: boolean,
    children: React.ReactNode,
    button: React.FC<boolean>
  }) {

    const popperRef = useRef(null);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
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
        {
          name: 'preventOverflow',
          options: {
            padding: 10,
          },
        }
      ],
    });

    return (
      <Popover className="relative">
      {({ open, close }) => {
        return (
          <>
            <Popover.Button ref={setReferenceElement} className="flex outline-none">
              {button && (<div className="flex">{button(open)}</div>)}
            </Popover.Button>
            <div ref={popperRef}
                 style={styles.popper}
                 {...attributes.popper}
                 className="z-10">
              <Transition as={Fragment}
                          show={open && isShown}
                          unmount={true}
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
                               className={clsx("w-screen max-w-xs md:max-w-sm bg-slate-100 dark:bg-slate-700 shadow-md shadow-slate-200 dark:shadow-slate-800 border border-slate-200 dark:border-slate-800 rounded-md p-1 text-font-secondary", className)}>
                  <>
                    <button type="button" onClick={(e) => { e.preventDefault(); close() }} className="absolute top-1 right-1 z-10 text-font-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
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

import { Fragment } from 'react';

import clsx from 'clsx';
import { getStatusColor } from '@/helpers/status.helpers';

export default function TableOfContents({ items, activeItems, selectorId }: { items: any[], activeItems: number[], selectorId: string }) {
  return (
    <ul className="p-1 space-y-1">
      {items.map((item, index) => (
        <Fragment key={index}>
          <li key={item.id} className="flex items-center justify-between">
            <a href={`#${item.id}`}
              className="flex items-center group text-blue-700 hover:text-blue-900 space-x-1"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${selectorId}-${index}`).scrollIntoView({
                  behavior: "smooth"
                });
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="invisible group-hover:visible h-4 w-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              <span className={clsx(getStatusColor(item.statuses), activeItems.includes(index) && "scale-125", "flex shrink-0 w-2 h-2 rounded transition duration-500 ease-in-out")}></span>
              <p>
                <span className={clsx("text-sm", activeItems.includes(index) ? "font-semibold" : "font-normal")}>{item.name}</span>
                <span className={clsx("ml-0.5 text-xs italic", activeItems.includes(index) ? "font-normal" : "font-light")}>{item.ima_symbol}</span>
              </p>
            </a>
          </li>
        </Fragment>
        )
      )}
    </ul>
  )
};

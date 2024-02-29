import { Fragment } from 'react';

import clsx from 'clsx';
import { getStatusGroupColor, getUniqueStatusGroups, reduceStatusGroups } from '@/helpers/status.helpers';


export default function TableOfContents({ items, activeItems, selectorId }: { items: any[], activeItems: number[], selectorId: string }) {
  const statuses = items.filter(item => item.statuses.length > 0).flatMap(item => item.statuses);
  let _statusGroups: any = getUniqueStatusGroups(statuses);
  _statusGroups = reduceStatusGroups(_statusGroups);

  return (
    <div className="">
      <h3 className="text-sm lg:text-base text-center font-normal mb-2 uppercase">Contents</h3>

      {_statusGroups.length > 0 && (
        <div className="flex flex-col p-2 border-2 border-dashed rounded mb-2 bg-white">
          {_statusGroups.map((groups, index) => (
            <div key={index} className="flex items-center">
                <span className={clsx(getStatusGroupColor(groups), "ml-1 flex-shrink-0 w-2 h-2 rounded")}></span>
                <p className="flex-shrink-1 text-xs ml-2">- {groups.map(item => item.group.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <ul className="p-1 space-y-1">{items.map((item, index) => (
        <Fragment key={index}>
          <li key={item.id} className="flex items-center justify-between">
            <a href={`#${item.id}`}
              className="flex items-center group text-blue-700 hover:text-blue-900"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${selectorId}-${index}`)?.scrollIntoView({
                  behavior: "smooth"
                });
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="invisible group-hover:visible h-4 w-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              <span className={clsx(getStatusGroupColor(item.statuses), activeItems.includes(index) && "scale-125", "ml-1 flex shrink-0 w-2 h-2 rounded transition duration-500 ease-in-out")}></span>
              <p className="flex shrink-1 items-center">
                <span className={clsx("ml-2 text-sm", activeItems.includes(index) ? "font-semibold" : "font-normal")}>{item.name}</span>
                <span className={clsx("ml-1 text-xs italic", activeItems.includes(index) ? "font-normal" : "font-light")}>{item.ima_symbol}</span>
              </p>
            </a>
          </li>
        </Fragment>)
        )}
      </ul>
    </div>
  )
};

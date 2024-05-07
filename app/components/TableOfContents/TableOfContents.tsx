import { Fragment } from 'react';

import cx from 'clsx';

import { getStatusGroupColor, getUniqueStatusGroups, reduceStatusGroups } from '@/helpers/status.helpers';
import styles from '@/components/Link/Link.module.scss';


export default function TableOfContents({ items, activeItems, selectorId }: { items: any[], activeItems: number[], selectorId: string }) {
  const statuses = items.filter(item => item.statuses.length > 0).flatMap(item => item.statuses);
  let _statusGroups: any = reduceStatusGroups(getUniqueStatusGroups(statuses));

  return (
    <div className="">
      {_statusGroups.length > 0 && (
        <div className="flex flex-col p-2 mb-2">
          {_statusGroups.map((groups, index) => (
            <div key={index} className="flex items-center">
              <span className={cx(getStatusGroupColor(groups), "ml-1 flex-shrink-0 w-2 h-2 rounded")}></span>
              <p className="flex-shrink-1 text-xs ml-2">- {groups.map(item => item.group.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <ul className="p-1 space-y-1">{items.map((item, index) => (
        <Fragment key={index}>
          <li key={item.id} className="flex items-center justify-between">
            <a href={`#${item.id}`}
               className={cx(styles.link, "flex items-center group")}
               onClick={(e) => {
               e.preventDefault();
                document.querySelector(`#${selectorId}-${index}`)?.scrollIntoView({
                  behavior: "smooth"
                });
               }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="invisible group-hover:visible h-4 w-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              <span className={cx(getStatusGroupColor(item.statuses), activeItems.includes(index) && "scale-125", "ml-1 flex shrink-0 w-2 h-2 rounded transition duration-500 ease-in-out")}></span>
              <p className="flex shrink-1 items-center">
                <span className={cx("ml-2 text-sm", activeItems.includes(index) ? "underline" : "font-normal")}>{item.name}</span>
                <span className={cx("ml-1 text-xs italic", activeItems.includes(index) ? "font-normal" : "font-light")}>{item.ima_symbol}</span>
              </p>
            </a>
          </li>
        </Fragment>)
        )}
      </ul>
    </div>
  )
};

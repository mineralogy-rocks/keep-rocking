import React from 'react';

import cx from 'clsx';

import Chip from '@/components/Chip';


const PingComponent = (color = "bg-sky-500", animated = true) => (
    <span className="absolute top-[1px] right-[1px] -mt-1 -mr-1 flex h-2 w-2">
      {animated && (<span className={cx("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", color)}></span>)}
      <span className={cx("relative inline-flex rounded-full h-2 w-2 border border-slate-400 dark:border-slate-600", color)}></span>
    </span>
)


export default function Button ({ item, isLoading, error, isShown, isClickable = true, onClick } : {
  item: { key: string, value: any },
  isLoading: boolean,
  error: boolean,
  isShown: boolean,
  isClickable?: boolean,
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  return (
    <div className="relative">
      {isLoading && PingComponent()}
      {isShown && PingComponent("bg-emerald-400", false)}
      {error && PingComponent("bg-red-500", false)}
      <Chip type="default" className={cx(isShown && "bg-indigo-300/90 dark:bg-indigo-400", isClickable ? "cursor-pointer" : "cursor-default")} {...{ isLoading, onClick }}>
        <span className="font-medium flex-1 text-start text-indigo-700">{item.key}</span>
        {item.value && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium text-indigo-800">
              {item.value}
            </span>
          </>)}
      </Chip>
    </div>
  )
};

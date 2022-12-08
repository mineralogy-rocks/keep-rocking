import clsx from "clsx";

import utilsStyles  from '@/styles/utils.module.scss';


export function Paginator({ previous, next, pageChange }) {
  return (
    <div className="flex justify-center space-x-5 mt-5">
      {previous && (
        <div className={clsx(utilsStyles.link, "group flex items-center float-left")} onClick={() => pageChange(previous)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1 group-hover:animate-[wiggleLeft_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          <span className="text-sm md:text-base">Previous page</span>
        </div>)}
      {next && (
        <div className={clsx(utilsStyles.link, "group flex items-center float-right")} onClick={() => pageChange(next)}>
          <span className="text-sm md:text-base">Next page</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:animate-[wiggleRight_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>)}
    </div>
  )
};

export function SmallPaginator({ previous, next, pageChange }) {
  return (
    <div className="flex justify-center space-x-5 font-normal">
      {previous && (
        <div className={clsx(utilsStyles.linkSmall, "group flex items-center float-left")} onClick={() => pageChange(previous)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1 group-hover:animate-[wiggleLeft_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          <span className="text-xs md:text-sm">Back</span>
        </div>)}
      {next && (
        <div className={clsx(utilsStyles.linkSmall, "group flex items-center float-right")} onClick={() => pageChange(next)}>
          <span className="text-xs md:text-sm">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:animate-[wiggleRight_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>)}
    </div>
  )
};

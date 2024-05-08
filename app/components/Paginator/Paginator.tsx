import cx from 'clsx';

import styles from '@/components/Link/Link.module.scss';

interface Props {
    previous: string,
    next: string,
    pageChange?: (page: string) => void,
};

const defaultProps = {
    pageChange: () => {},
};

const Paginator: React.FC<Props> = (props) => {
  const { previous, next, pageChange } = { ...defaultProps, ...props};

    const clickHandler = (page: string) => {
        pageChange && pageChange(page);
    };

  return (
    <div className="flex justify-center space-x-5 mt-5">
      {!!previous && (
        <div className={cx(styles.link, "group flex items-center float-left")} onClick={() => clickHandler(previous)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1 group-hover:animate-[wiggleLeft_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          <span className="text-sm md:text-base">Previous page</span>
        </div>)}
      {!!next && (
        <div className={cx(styles.link, "group  flex items-center float-right")} onClick={() => clickHandler(next)}>
          <span className="text-sm md:text-base">Next page</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:animate-[wiggleRight_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>)}
    </div>
  )
};

const SmallPaginator: React.FC<Props> = (props) => {
  const { previous, next, pageChange } = { ...defaultProps, ...props};

  return (
    <div className="flex justify-center space-x-5 font-normal">
      {!!previous && (
        <div className={cx(styles.link, "font-medium group flex items-center float-left")} onClick={() => pageChange(previous)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-1 group-hover:animate-[wiggleLeft_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          <span className="text-xs md:text-sm">Back</span>
        </div>)}
      {!!next && (
        <div className={cx(styles.link, "font-medium group flex items-center float-right")} onClick={() => pageChange(next)}>
          <span className="text-xs md:text-sm">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1 group-hover:animate-[wiggleRight_1s_infinite]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>)}
    </div>
  )
};

export { Paginator, SmallPaginator };

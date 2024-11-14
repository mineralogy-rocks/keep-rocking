import { useState } from 'react';

import cx from 'clsx';
import { styled } from '@linaria/react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { getStyles } from './styles';
import { getStatusColor } from '@/helpers/status.helpers';
import styles from '@/components/Link/Link.module.scss';


interface Props {
  name: string,
  slug?: string,
  statuses: number[],
  isHighlighted?: boolean,
  description?: string | null,
  className?: string,
  hasArrow?: boolean,
  hasClose?: boolean,
  hasLink?: boolean,
  onClick?: (event: React.MouseEvent) => void,
  onMouseEnter?: (event: React.MouseEvent) => void,
  onMouseLeave?: (event: React.MouseEvent) => void,
  onClose?: (event: React.MouseEvent) => void,
  type?: string | null
};

const defaultProps = {
  slug: null,
  description: null,
  className: "",
  isHighlighted: false,
  hasArrow: true,
  hasClose: false,
  hasLink: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onClose: undefined,
  type: null
};

const RelationChip: React.FC<Props> = (props) => {
  const {
    name,
    slug,
    statuses,
    description,
    className,
    isHighlighted,
    hasArrow,
    hasClose,
    hasLink,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onClose,
    type
  } = {...defaultProps, ...props};

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { textColor, backgroundColor, borderColor } = getStyles(type ?? 'default');

  const clickHandler = (event: React.MouseEvent) => {
    onClick && onClick(event);
    setIsClicked(true);
  };

  const onMouseEnterHandler = (event: React.MouseEvent) => {
    onMouseEnter && onMouseEnter(event);
    setIsHovered(true);
  }

  const onMouseLeaveHandler = (event: React.MouseEvent) => {
    onMouseLeave && onMouseLeave(event);
    setIsHovered(false);
  };

  const closeHandler = (event: React.MouseEvent) => {
    onClose && onClose(event);
    setIsClicked(false);
  }


  const motionVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: (i) => {
      const delay = i * 0.1;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 0.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    },
    exit: (i) => {
      return {
        pathLength: 0,
        opacity: 0,
        transition: {
          duration: 0.1
        }
      }
    }
  };

  return (
    <Wrapper>
      {hasArrow && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
             className="w-4 h-4 text-slate-400 dark:text-slate-200 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
        </svg>
      )}

      <motion.div
          className={cx("text-xs flex flex-wrap rounded px-1 py-0.5 transition-colors duration-300 cursor-pointer max-w-xs",
          backgroundColor,
          borderColor,
          isHighlighted && "border-t-2 border-t-font-blueDark dark:border-t-font-blue",
          className)}
        onClick={clickHandler}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}>
        <div className={cx("flex items-center space-x-0.5 text-xs font-light", textColor)}>
          <span className={cx("flex shrink-0 w-1.5 h-1.5 rounded mr-1", getStatusColor(statuses))}></span>
          <span className={cx(styles.link, "font-medium cursor-default")}>{name}</span>
          {hasLink && (
            <Link href={`/explore/${slug}`} passHref>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                   stroke="currentColor" className="ml-1 w-2 h-2 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
              </svg>
            </Link>
          )}
        </div>

        {description && (
          <div dangerouslySetInnerHTML={{__html: description}}
               className="text-xxs w-full font-normal leading-tight mt-0.5 line-clamp-3"></div>
        )}

        {/*<AnimatePresence initial={false} mode="wait">*/}
        {/*  {hasClose && (*/}
        {/*    <motion.div className="flex items-center"*/}
        {/*                initial={{ width: 0 }}*/}
        {/*                animate={{ width: 'auto' }}*/}
        {/*                exit={{*/}
        {/*                  width: 0,*/}
        {/*                  transition: {*/}
        {/*                    delay: 0.2*/}
        {/*                  }*/}
        {/*                }}>*/}
        {/*      <svg xmlns="http://www.w3.org/2000/svg"*/}
        {/*           fill="none"*/}
        {/*           viewBox="0 0 24 24"*/}
        {/*           stroke="currentColor"*/}
        {/*           strokeWidth={3}*/}
        {/*           width={10}*/}
        {/*           height={10}*/}
        {/*           className="group ml-1 shrink-0"*/}
        {/*           onClick={closeHandler}>*/}
        {/*        <motion.line x1="0"*/}
        {/*                     y1="100%"*/}
        {/*                     x2="100%"*/}
        {/*                     y2="0"*/}
        {/*                     className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300 cursor-pointer"*/}
        {/*                     initial="hidden"*/}
        {/*                     animate="visible"*/}
        {/*                     exit="exit"*/}
        {/*                     variants={motionVariants}*/}
        {/*                     custom={2} />*/}
        {/*        <motion.line x1="100%"*/}
        {/*                     y1="100%"*/}
        {/*                     x2="0"*/}
        {/*                     y2="0"*/}
        {/*                     initial="hidden"*/}
        {/*                     animate="visible"*/}
        {/*                     exit="exit"*/}
        {/*                     className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300 cursor-pointer"*/}
        {/*                     variants={motionVariants}*/}
        {/*                     custom={5} />*/}
        {/*      </svg>*/}
        {/*    </motion.div>*/}
        {/*  )}*/}
        {/*</AnimatePresence>*/}
      </motion.div>

      {isHovered && (
        <div className={cx("ml-1 w-4 h-4 flex items-center rounded-sm", backgroundColor)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"/>
          </svg>
        </div>)
      }

    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default RelationChip;

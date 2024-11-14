import { useState, memo } from 'react';

import cx from 'clsx';
import { styled } from '@linaria/react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { getStyles } from './styles';
import { getStatusColor } from '@/helpers/status.helpers';
import styles from '@/components/Link/Link.module.scss';
import { ArrowIcon, CloseIcon, CheckIcon } from "./icons";


type Action = 'toggle' | 'link';

interface Props {
  name: string,
  slug?: string,
  statuses: number[],
  isHighlighted?: boolean,
  description?: string | null,
  className?: string,
  hasArrow?: boolean,
  isActive?: boolean,
  hasLink?: boolean,
  onClick?: (event: React.MouseEvent) => void,
  onMouseEnter?: (event: React.MouseEvent) => void,
  onMouseLeave?: (event: React.MouseEvent) => void,
  onClose?: (event: React.MouseEvent) => void,
  type?: string | null,
  actions?: Action[]
};

const defaultProps = {
  slug: null,
  description: null,
  className: "",
  isHighlighted: false,
  hasArrow: false,
  isActive: false,
  hasLink: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onClose: undefined,
  type: null,
  actions: []
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
    isActive,
    hasLink,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onClose,
    type,
    actions
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

  return (
    <Wrapper>
      {hasArrow && <ArrowIcon />}

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
          <>
            <hr className="w-full mt-1" />
            <div dangerouslySetInnerHTML={{__html: description}}
                 className="text-xxs w-full font-normal leading-tight mt-1 line-clamp-3">
            </div>
          </>
        )}

        {actions.includes('toggle') && (
          <AnimatePresence initial={false} mode="wait">
            {isActive ?
              (<motion.div className="flex items-center"
                           animate={{ width: 'auto' }}>
                  <CloseIcon onClick={closeHandler} />
                </motion.div>
              ) : isHovered && (
              <motion.div className="flex items-center"
                          initial={{ width: 0 }}
                          animate={{ width: 'auto' }}
                          exit={{ width: 0 }}>
                <CheckIcon />
              </motion.div>)}

          </AnimatePresence>
        )}
      </motion.div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default memo(RelationChip);

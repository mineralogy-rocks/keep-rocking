import { useState, memo } from 'react';

import Link from 'next/link';
import cx from 'clsx';
import { styled } from '@linaria/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import { getStyles } from './styles';
import { getStatusColor } from '@/helpers/status.helpers';
import styles from '@/components/Link/Link.module.scss';
import { ArrowIcon, CloseIcon, CheckIcon } from "./RelationChip.icons";


type Action = 'toggle' | 'link';

interface Props {
  name: string,
  slug?: string,
  statuses: number[],
  isHighlighted?: boolean,
  isActive?: boolean,
  description?: string | null,
  className?: string,
  hasArrow?: boolean,
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
  isActive: false,
  hasArrow: false,
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
    isActive,
    isHighlighted,
    hasArrow,
    hasLink,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onClose,
    type,
    actions
  } = {...defaultProps, ...props};

  const localHasLink = hasLink && slug;

  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const { textColor, backgroundColor, borderColor } = getStyles(type ?? 'default');

  const clickHandler = (event: React.MouseEvent) => {
    onClick && onClick(event);
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
  }

  const linkMotionVariants: Variants = {
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 0.05,
      }
    }),
    hidden: (index) => ({
      opacity: 0,
      transition: {
        delay: (3 - index) * 0.05,
      }
    })
  };

  return (
    <Wrapper>
      {hasArrow && <ArrowIcon />}

      <motion.div className={cx("relative text-xs flex flex-wrap rounded px-1 py-0.5 transition-colors duration-300 cursor-pointer max-w-xs",
                    backgroundColor,
                    borderColor,
                    isLinkHovered && "blur-md",
                    isHighlighted && "border-t-2 border-t-font-blueDark dark:border-t-font-blue",
                    className)}
                  onClick={clickHandler}
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}>
        <div className={cx("flex items-center space-x-0.5 text-xs font-light", textColor)}>
          <span className={cx("flex shrink-0 w-1.5 h-1.5 rounded mr-1", getStatusColor(statuses))}></span>
          {localHasLink ? (
            <Link href={`/explore/${slug}`}
                  passHref
                  className="flex items-center">
              <span className={cx(styles.link, "font-medium cursor-default")}
                    onMouseEnter={() => setIsLinkHovered(true)}
                    onMouseLeave={() => setIsLinkHovered(false)}>
                {name}
              </span>
            </Link>
          ) : (
            <span className={cx(styles.link, "font-medium cursor-default")}>{name}</span>
          )}
        </div>

        {description && (
          <>
            <hr className="w-full mt-1"/>
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

      {localHasLink && (
        <AnimatePresence>
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               className={cx(styles.link, "ml-1 w-3 h-3")}>
            <motion.path variants={linkMotionVariants}
                         custom={1}
                         initial="hidden"
                         animate={isLinkHovered ? "visible" : 'hidden'}
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="m0.25 4.5 7.5 7.5-7.5 7.5"
                         strokeWidth="2" />
            <motion.path variants={linkMotionVariants}
                         custom={2}
                         initial="hidden"
                         animate={isLinkHovered ? "visible" : 'hidden'}
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="m8.25 5.5 6 6.5-6 6.5"
                         strokeWidth="1.5" />
          </svg>
        </AnimatePresence>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default memo(RelationChip);

import cx from 'clsx';
import { styled } from '@linaria/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Wrapper as TreeWrapper } from '@/components/RelationTree';
import { getStyles } from './styles';
import { getStatusColor } from '@/helpers/status.helpers';
import styles from '@/components/Link/Link.module.scss';


interface Props {
  name: string,
  statuses: number[],
  isHighlighted?: boolean,
  description?: string | null,
  className?: string,
  hasArrow?: boolean,
  hasClose?: boolean,
  onClick?: (event: React.MouseEvent) => void,
  onMouseEnter?: (event: React.MouseEvent) => void,
  onMouseLeave?: (event: React.MouseEvent) => void,
  onClose?: (event: React.MouseEvent) => void,
  type?: string | null
};

const defaultProps = {
  description: null,
  className: "",
  isHighlighted: false,
  hasArrow: true,
  hasClose: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onClose: undefined,
  type: null
};

const RelationChip: React.FC<Props> = (props) => {
  const { name, statuses, description, className, isHighlighted, hasArrow, hasClose, onClick, onMouseEnter, onMouseLeave, onClose, type } = { ...defaultProps, ...props };

  const { textColor, backgroundColor, borderColor } = getStyles(type ?? 'default');

  const clickHandler = (event: React.MouseEvent) => {
    onClick && onClick(event);
  };

  const onMouseEnterHandler = (event: React.MouseEvent) => {
    onMouseEnter && onMouseEnter(event);
  };

  const onMouseLeaveHandler = (event: React.MouseEvent) => {
    onMouseLeave && onMouseLeave(event);
  };

  const closeHandler = (event: React.MouseEvent) => {
    onClose && onClose(event);
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400 dark:text-slate-200 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      )}

      <motion.div className={cx("text-xs flex flex-col flex-wrap rounded px-1 py-0.5 transition-colors duration-300 cursor-pointer max-w-xs",
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
        </div>

        {description && (
          <div dangerouslySetInnerHTML={{ __html: description }} className="text-xxs w-full font-normal leading-tight mt-0.5 line-clamp-3"></div>
        )}

        <AnimatePresence initial={false} mode="wait">
          {hasClose && (
            <motion.div className="flex items-center"
                        initial={{ width: 0 }}
                        animate={{ width: 'auto' }}
                        exit={{
                          width: 0,
                          transition: {
                            delay: 0.2
                          }
                        }}>
              <svg xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   strokeWidth={3}
                   width={10}
                   height={10}
                   className="group ml-1 shrink-0"
                   onClick={closeHandler}>
                <motion.line x1="0"
                             y1="100%"
                             x2="100%"
                             y2="0"
                             className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300 cursor-pointer"
                             initial="hidden"
                             animate="visible"
                             exit="exit"
                             variants={motionVariants}
                             custom={2} />
                <motion.line x1="100%"
                             y1="100%"
                             x2="0"
                             y2="0"
                             initial="hidden"
                             animate="visible"
                             exit="exit"
                             className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300 cursor-pointer"
                             variants={motionVariants}
                             custom={5} />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    ${TreeWrapper} & {
      // adjust styles when needed
    }
`;

export default RelationChip;

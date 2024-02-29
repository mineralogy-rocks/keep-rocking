import { useRef } from 'react';

import { motion, useInView, Variants } from 'framer-motion';
import cx from 'clsx';


interface Item {
  id: number,
  value: number,
  label: string|number,
  subLabel: string|number,
}

interface Props {
  isAnimated?: boolean,
  items?: Item[],
  className?: string,
  color?: string,
  highlightThreshold?: number,
};

const defaultProps = {
  isAnimated: false,
  items: [],
  className: "",
  color: "#14b8a6",
  highlightThreshold: null,
};


const BarChart: React.FC<Props> = (props) => {
  const { isAnimated, items, className, color, highlightThreshold } = { ...defaultProps, ...props};

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const variants: Variants = {
    animated: (i) => ({
      height: isAnimated && inView ? `${(i.value / maxValue * 100)}%` : 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        type: "spring",
        bounce: 0.25,
        stiffness: 30,
      }
    }),
    default: () => ({
      height: 0,
    }),
  };
  const maxValue = Math.max(...items.map(item => item.value));

  return (
    <div ref={ref} className={cx("flex flex-wrap gap-2")}>
      {items.map((item, index) => {
        return (
          <div key={index} className={cx("flex flex-col", className)}>
            <div className="flex flex-1 shrink-0 px-2 relative justify-center basis-[35px]">
              <motion.div variants={variants}
                          custom={item}
                          initial={isAnimated ? "default" : ""}
                          animate={isAnimated ? "animated" : ""}
                          style={{
                            width: "8px",
                            bottom: 0,
                            height: `${(item.value / maxValue * 100)}%`,
                            borderRadius: "1px",
                            backgroundColor: color,
                            borderColor: '#0a9181',
                            borderWidth: '0.1px',
                            position: "absolute"
                          }}>
              </motion.div>
            </div>
            <div className="mt-1 flex flex-1 shrink-0 flex-col px-2 justify-center text-center basis-[35px] w-[35px]">
              <div className="text-xxs font-medium">{item.subLabel}</div>
              <div className={cx(" text-xs md:text-sm font-medium", highlightThreshold && item.value >= highlightThreshold ? "border-b border-b-violet-500" : "")}>{item.label}</div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}


export default BarChart;

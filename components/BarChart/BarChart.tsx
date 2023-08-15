import { useRef } from 'react';

import { motion, useInView, Variants } from 'framer-motion';
import cx from 'clsx';



interface Props {
  items?: Array<{
    id: string,
    value: number,
    label: string,
    subLabel: string,
  }>,
};

const defaultProps = {
  isAnimated: false,
  className: "",
  color: "#14b8a6",
};


const BarChart = ({ isAnimated = false, items, className, color }: Props & typeof defaultProps) => {
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
        stiffness: 50,
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
                            width: "5px",
                            bottom: 0,
                            height: `${(item.value / maxValue * 100)}%`,
                            borderRadius: "2px",
                            backgroundColor: color,
                            position: "absolute"
                          }}>
              </motion.div>
            </div>
            <div className="flex flex-1 shrink-0 flex-col px-2 justify-center text-center basis-[35px] w-[35px]">
              <div className="text-xxs font-normal">{item.subLabel}</div>
              <div className={cx(" text-xs md:text-sm font-medium", item.value >= (maxValue / 2) ? "border-b border-b-violet-500" : "")}>{item.label}</div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}


BarChart.defaultProps = defaultProps;
export default BarChart;

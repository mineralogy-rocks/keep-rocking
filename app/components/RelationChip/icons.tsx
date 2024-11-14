import { motion } from "framer-motion";


const MOTION_VARIANTS = {
  hidden: {
    pathLength: 0,
  },
  visible: (i) => {
    const delay = i * 0.1;
    return {
      pathLength: 1,
      transition: {
        pathLength: {delay, type: "spring", duration: 0.5, bounce: 0},
      }
    };
  },
  exit: (i) => {
    return {
      pathLength: 0,
      transition: {
        duration: 0.1
      }
    }
  }
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400 dark:text-slate-200 shrink-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);

const CloseIcon = ({ onClick }: { onClick: (event: React.MouseEvent) => void }) => (
  <svg xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       strokeWidth={3}
       width={10}
       height={10}
       className="group ml-1 shrink-0 text-gray-400 group-hover:text-gray-100 transition-colors duration-300 cursor-pointer"
       onClick={onClick}>
    <motion.line x1="0"
                 y1="100%"
                 x2="100%"
                 y2="0"
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 variants={MOTION_VARIANTS}
                 custom={2} />
    <motion.line x1="100%"
                 y1="100%"
                 x2="0"
                 y2="0"
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 variants={MOTION_VARIANTS}
                 custom={5} />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 20 20"
       stroke="currentColor"
       strokeWidth={2}
       width={10}
       height={10}
       className="group ml-1 shrink-0 text-gray-400 group-hover:text-gray-100 transition-colors duration-300 cursor-pointer">
    <motion.path fillRule="evenodd"
                 d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                 clipRule="evenodd"
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 variants={MOTION_VARIANTS}
                 custom={2} />
  </svg>
);

export { ArrowIcon, CloseIcon, CheckIcon };

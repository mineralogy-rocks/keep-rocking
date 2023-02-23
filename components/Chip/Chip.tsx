import clsx from 'clsx';

import { getStyles } from './styles';


export default function Chip({ type = "default", className = "", isLoading = false, onClick, children, ...props} : {
  type?: string,
  className?: string,
  isLoading?: boolean,
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  children: React.ReactNode,
  props?: any
}) {

  const clickHandler = (e) => {
    // e.preventDefault();
    onClick && onClick(e);
  }

  const { textColor, backgroundColor } = getStyles(type);

  return (
    <div className={clsx("flex flex-wrap rounded px-1 py-0.5 transition-colors duration-300", isLoading && [
                        "relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite]",
                        "before:bg-clip-content before:bg-gradient-to-r before:from-transparent before:via-cyan-100/20",
                        "before:border-t before:border-gray-400 before:to-transparent isolate overflow-hidden",
                      ],
                      backgroundColor,
                      className)}
         onClick={clickHandler}
         {...props}>
      <div className={clsx("flex items-center space-x-0.5 text-xs font-light", textColor)}>
        {children}
      </div>
    </div>
  )
}

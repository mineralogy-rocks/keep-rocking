import cx from 'clsx';

import { getStyles } from './styles';


interface Props {
  type: string,
  className?: string,
  children?: React.ReactNode,
};

const defaultProps = {
  type: "default",
  className: "",
};

export default function Chip({ type = "default", className = "", children, ...props} : Props & typeof defaultProps) {

  const { textColor, backgroundColor, borderColor } = getStyles(type);

  return (
    <div className={cx("flex flex-wrap rounded px-1 py-0.5 transition-colors duration-300",
                      backgroundColor,
                      borderColor,
                      className)}
         {...props}>
      <div className={cx("flex items-center space-x-0.5 text-xs font-medium", textColor)}>
        {children}
      </div>
    </div>
  )
}

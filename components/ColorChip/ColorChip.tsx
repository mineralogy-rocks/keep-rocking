import cx from 'clsx';

import { getStyles } from './styles';


interface Props {
  type: string,
  className?: string,
  hasPadding?: boolean,
  children?: React.ReactNode,
};

const defaultProps = {
  type: "default",
  hasPadding: true,
  className: "",
};

export default function Chip({ type, hasPadding = true, className = "", children, ...props} : Props & typeof defaultProps) {

  const { textColor, backgroundColor, borderColor } = getStyles(type);

  return (
    <div className={cx("flex flex-wrap rounded transition-colors duration-300",
                      hasPadding ? "px-1 py-0.5" : "",
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

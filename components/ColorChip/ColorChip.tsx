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
  className: "",
  hasPadding: true,
};

const Chip = ({ type, className = "", hasPadding = true, children, ...props} : Props & typeof defaultProps) => {

  const { textColor, backgroundColor, borderColor } = getStyles(type);

  return (
    <div className={cx("flex flex-wrap rounded-sm transition-all duration-300 w-5 h-5",
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

Chip.defaultProps = defaultProps
export default Chip

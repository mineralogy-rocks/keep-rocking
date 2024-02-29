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

// const Chip = ({ type, className = "", hasPadding = true, children, ...props} : Props & typeof defaultProps) => {
const Chip: React.FC<Props> = (props) => {
  const { type, className = "", hasPadding = true, children , ...rest} = { ...defaultProps, ...props};

  const { textColor, backgroundColor, borderColor } = getStyles(type);

  return (
    <div className={cx("flex flex-wrap rounded-sm transition-all duration-300 w-5 h-5",
                      hasPadding ? "px-1 py-0.5" : "",
                      backgroundColor,
                      borderColor,
                      className)}
         {...rest}>
      <div className={cx("flex items-center text-xs font-medium", textColor)}>
        {children}
      </div>
    </div>
  )
}

export default Chip;

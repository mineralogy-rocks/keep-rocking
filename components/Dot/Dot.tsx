 import cx from 'clsx';


interface Props {
    size?: "small" | "medium" | "large",
    color: string,
    isHovered?: boolean,
    className?: string,
};

const defaultProps = {
    size: "medium",
    color: "#000000",
    isHovered: false,
    className: "",
};

const Dot = ({ size, color, isHovered, className, ...props }: Props & typeof defaultProps) => {
    let sizeClass = "w-2 h-2";
    let marginClass = "-ml-1"
    if (size === "small") {
        sizeClass = "w-1 h-1";
        marginClass = " -ml-1.5"
    } else if (size === "large") {
        sizeClass = "w-3 h-3";
    }
  return (
    <span className={cx(sizeClass, marginClass, "first:ml-0 rounded-full transition-opacity duration-300 ease-in-out", isHovered ? 'opacity-20' : '')}
          style={{ backgroundColor: color }}>
    </span>
  )
}

Dot.defaultProps = defaultProps
export default Dot

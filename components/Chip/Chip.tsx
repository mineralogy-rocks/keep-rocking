import cx from 'clsx';

export default function Chip({ className="", onClick, children } : {
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  children: React.ReactNode
}) {

  const clickHandler = (e) => {
    // e.preventDefault();
    onClick && onClick(e);
  }
  return (
    <div className={cx("flex flex-wrap rounded px-1 py-0.5 bg-amber-300/80", className)} onClick={clickHandler}>
      <div className="flex items-center space-x-0.5 text-xs font-light">
        {children}
      </div>
    </div>
  )
}

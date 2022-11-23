import cx from 'clsx';

export default function Chip({ backgroundColor = 'bg-blue-200/60', children }) {
  return (
    <div className={cx(backgroundColor, "flex flex-wrap rounded px-1")}>
      <div className="flex items-center space-x-0.5 text-xs font-light">
        {children}
      </div>
    </div>
  )
}

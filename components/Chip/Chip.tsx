import cx from 'clsx';

export default function Chip({ className="bg-amber-300/80", children }) {
  return (
    <div className={cx("flex flex-wrap rounded px-1 py-0.5", className)}>
      <div className="flex items-center space-x-0.5 text-xs font-light">
        {children}
      </div>
    </div>
  )
}

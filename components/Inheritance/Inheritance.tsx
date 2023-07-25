import clsx from "clsx";

export default function Inheritance({ className = "", children }: { className?: string, children: React.ReactNode }) {

  return (
    <div className={clsx(className, "bg-white shadow-surface-low sm:rounded p-4")}>
      {children}
    </div>
  )
};

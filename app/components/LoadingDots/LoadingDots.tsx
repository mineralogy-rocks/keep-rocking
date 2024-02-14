// based on amazing loading dots of Delba Oliveira https://github.com/delbaoliveira/website/blob/main/ui/LoadingDots.tsx

import clsx from "clsx";

export default function LoadingDots({ className, isSmall=false }: { className?: string, isSmall?: boolean }) {

  const size = isSmall ? 'w-1 h-1' : 'w-1.5 h-1.5';

  return (
    <div className={clsx(className, "flex items-center justify-center space-x-0.5")}>
      <span className={clsx(size, "bg-gray-600 rounded-full animate-[loading_1.4s_ease-in-out_infinite]")} />
      <span className={clsx(size, "bg-gray-600 rounded-full animate-[loading_1.4s_ease-in-out_0.3s_infinite]")} />
      <span className={clsx(size, "bg-gray-600 rounded-full animate-[loading_1.4s_ease-in-out_0.6s_infinite]")} />
    </div>
  )
};

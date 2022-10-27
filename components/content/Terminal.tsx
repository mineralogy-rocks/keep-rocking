import { useState } from "react";

function Header({ text, isHover }) {
    return <div className="mr-5 transition-all duration-500 text-white font-medium text-xs md:text-sm justify-end">{text}</div>;
}

export default function Terminal({ children }) {

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="overflow-hidden shadow-xl flex bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-xl hover:bg-red-100/70 hover:shadow-2xl border transition-all duration-500"
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}>
      <div className="group w-full flex flex-col">
          <div className="flex-none border-b border-gray-500/30 bg-gray-600 group-hover:bg-gray-700 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center h-8 space-x-1.5 px-3">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
              </div>
              <Header text="~/home" isHover={isHover} />
            </div>
          </div>
          <div className="min-h-0 flex-auto flex flex-col">
              <div className="w-full flex-auto flex min-h-0 overflow-auto">
                  <div className="w-full flex-auto">
                        {children}
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

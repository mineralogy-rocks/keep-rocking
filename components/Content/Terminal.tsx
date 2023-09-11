import { useState } from "react";


function Header({ text, isHovered }) {
    return <div className="mr-5 transition-all duration-500 text-white font-medium text-xs md:text-sm justify-end">{text}</div>;
}


export default function Terminal({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="overflow-hidden max-w-lg shadow-surface-medium flex bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-lg hover:bg-red-100/50 transition-all duration-500"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="group w-full flex flex-col">
        <div className="flex-none bg-gray-600 group-hover:bg-gray-700 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center h-8 space-x-1.5 px-3">
              <div className="w-3 h-3 flex items-center justify-center bg-red-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 hidden group-hover:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="w-3 h-3 flex items-center justify-center bg-yellow-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 hidden group-hover:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </div>
              <div className="w-3 h-3 flex items-center justify-center bg-green-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 hidden group-hover:block -rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
            </div>
            <Header text="~/home" isHovered={isHovered} />
          </div>
        </div>
        <div className="min-h-[50px] flex-auto flex flex-col">
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

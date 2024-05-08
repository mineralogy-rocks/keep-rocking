export default function Terminal({ children }) {
  return (
    <div className="overflow-hidden max-w-lg dark:ring-1 dark:ring-white/10 dark:ring-inset shadow-gray-surface dark:hover:shadow-lilac/20 hover:shadow-lilac/10 hover:shadow-2xl flex dark:bg-slate-700 bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-lg transition-all duration-50">
      <div className="group w-full flex flex-col">
        <div className="flex-none bg-gray-600 transition-all duration-500 border border-slate-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center h-8 space-x-1.5 px-3">
              <div className="w-3 h-3 flex items-center justify-center bg-red-600 rounded-full dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                     stroke="currentColor" className="w-3 h-3 hidden group-hover:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
              <div className="w-3 h-3 flex items-center justify-center bg-yellow-500 rounded-full dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                     stroke="currentColor" className="w-3 h-3 hidden group-hover:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6"/>
                </svg>
              </div>
              <div className="w-3 h-3 flex items-center justify-center bg-green-500 rounded-full dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                     stroke="currentColor" className="w-3 h-3 hidden group-hover:block -rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                </svg>
              </div>
            </div>
            <div className="mr-5 transition-all duration-500 text-white font-semibold text-xs md:text-sm justify-end">~/home</div>
          </div>
        </div>
        <div className="min-h-[50px] flex-auto flex flex-col">
          <div className="w-full flex-auto flex min-h-0 overflow-auto">
            <div className="w-full flex-auto text-font-primary dark:text-font-orange">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

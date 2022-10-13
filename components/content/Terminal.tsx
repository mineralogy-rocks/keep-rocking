

export default function Terminal({ children }) {
  return (
    <div className="overflow-hidden shadow-xl flex bg-red-50 h-38 max-h-40 sm:max-h-[none] rounded-xl hover:bg-red-100/70 hover:shadow-2xl border transition-all duration-500">
      <div className="group w-full flex flex-col">
          <div className="flex-none border-b border-gray-500/30">
              <div className="flex items-center bg-gray-600 h-8 space-x-1.5 px-3 group-hover:bg-gray-700 transition-all duration-500">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
              </div>
          </div>
          <div className="min-h-0 flex-auto flex flex-col">
              <div className="w-full flex-auto flex min-h-0 overflow-auto">
                  <div className="w-full flex-auto">
                      <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-bold text-gray-900 flex ligatures-none overflow-auto">
                        {children}
                      </pre>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

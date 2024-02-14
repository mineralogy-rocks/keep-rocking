import Spinner from '@/components/Spinner';


export default function SearchInput({ placeholder="Search", isLoading=false, searchValue, onChange, onReset }:
  { placeholder?: string, isLoading?: boolean, searchValue: string, onChange: (value: string) => void, onReset: () => void }) {
  return (
    <div className='group relative flex items-center justify-center w-full h-full'>
      <input className='w-full h-10 px-8 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:border focus:border-gray-600 transition-colors ease-in-out duration-300'
             type='text'
             placeholder={placeholder}
             value={searchValue}
             onChange={(e) => onChange(e.target.value)} />
        <svg className="absolute w-5 h-5 text-gray-600 left-2 top-2.5 dark:text-gray-300"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      {isLoading && <Spinner className="absolute right-10 bottom-2.5" />}
      {searchValue && (
        <div className="absolute right-3 cursor-pointer" onClick={onReset}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}

    </div>
  );
}

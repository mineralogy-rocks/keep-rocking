import { useRef } from "react";
import { styled } from '@linaria/react';

import Spinner from '@/components/Spinner';


interface Props {
  placeholder?: string,
  isLoading?: boolean,
  searchValue: string,
  onChange: (value: string) => void,
  onReset: () => void
};

const defaultProps = {
  placeholder: "Search",
  isLoading: false
};


const SearchInput: React.FC<Props> = (props) => {
  const { placeholder, isLoading, searchValue, onChange, onReset } = { ...defaultProps, ...props };
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Wrapper className='group relative flex items-center justify-center w-full h-full'>
      <input className='w-full h-10 px-8 py-2 dark:text-slate-300 text-slate-700 dark:bg-slate-800 bg-white border border-gray-300 dark:border-slate-800 rounded focus:outline-none focus:border dark:focus:border-slate-500 focus:border-gray-600 transition-colors ease-in-out duration-300'
             ref={ref}
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
        <div className="absolute right-3 cursor-pointer" onClick={(() => { onReset(); ref.current?.focus(); })}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-slate-800 hover:stroke-slate-600 dark:stroke-slate-300 dark:hover:stroke-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}

    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default SearchInput;

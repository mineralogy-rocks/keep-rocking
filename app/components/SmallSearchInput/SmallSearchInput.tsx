import { useRef } from "react";
import { styled } from '@linaria/react';


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


const SmallSearchInput: React.FC<Props> = (props) => {
  const { placeholder, isLoading, searchValue, onChange, onReset } = { ...defaultProps, ...props };
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <input className='w-full h-8 px-8 py-2 dark:text-slate-300 text-slate-700 dark:bg-slate-800 bg-white rounded focus:outline-none font-normal'
             ref={ref}
             type='text'
             placeholder={placeholder}
             value={searchValue}
             onChange={(e) => onChange(e.target.value)} />
        <svg className="absolute w-4 h-4 text-gray-600 left-2 top-2 dark:text-gray-300"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      {searchValue && (
        <svg onClick={(() => { onReset(); ref.current?.focus(); })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="absolute right-2 top-2 cursor-pointer w-4 h-4 stroke-slate-800 hover:stroke-slate-600 dark:stroke-slate-300 dark:hover:stroke-slate-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}

    </Wrapper>
  );
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
`;

export default SmallSearchInput;

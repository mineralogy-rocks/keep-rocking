'use client';

import Link from 'next/link';

import { styled } from '@linaria/react';


interface Props {
  level?: number,
  href: string,
  children?: React.ReactNode,
};

const defaultProps = {
  level: 1,
  children: null,
};

const Heading: React.FC<Props> = (props) => {
  const { level, href, children } = { ...defaultProps, ...props };
  const tag = `h${level}`;

  return (
    <Wrapper as={tag}>
      <Link href={`#${href}`} id={href} className="group relative border-none lg:-ml-2 lg:pl-2">
        <span className="absolute -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 lg:flex">​
          <span className="flex h-6 w-6 items-center justify-center rounded text-slate-400 shadow ring-1 ring-slate-900/5 hover:text-slate-700 hover:shadow hover:ring-slate-900/10 dark:bg-slate-800 dark:text-slate-400 dark:shadow-none dark:ring-0 dark:hover:bg-slate-700 dark:hover:text-slate-200">
            <svg width="12" height="12" fill="none" aria-hidden="true">
              <path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>
          </span>
        </span>
        {children}
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.h2`
`;

export default Heading;

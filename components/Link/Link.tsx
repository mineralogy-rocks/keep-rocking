import Link from 'next/link';

import clsx from 'clsx';

export function ExternalLink({ className='', href, text, isIcon=true } : {
  className?: string,
  href: string,
  text: string,
  isIcon?: boolean
}) {
  return (
    <Link href={href} className={clsx("flex group items-center", className)} target="_blank">
      <span className="text-xs text-font-blue font-semibold hover:text-font-blueDark hover:underline cursor-pointer flex-1">{text}</span>
      {isIcon && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="shrink-0 inline-block align-bottom ml-1 w-3.5 h-3.5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      )}
    </Link>
  )
};

export function InternalLink({ href, text } : { href: string, text: string }) {
  return (
    <Link href={href} className="flex group items-center" target="_blank">
      <span className="text-xs text-font-blue font-semibold hover:text-font-blueDark hover:underline cursor-pointer">{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-3.5 h-3.5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </Link>
  )
};

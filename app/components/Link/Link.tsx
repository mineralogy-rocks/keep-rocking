import Link from 'next/link';

import cx from 'clsx';

export function ExternalLink({ className='', href, text, isIcon=true } : {
  className?: string,
  href: string,
  text: string,
  isIcon?: boolean
}) {
  return (
    <Link href={href} className={cx("flex group items-center", className)} target="_blank">
      <span className="link external text-xs flex-1">{text}</span>
      {isIcon && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="shrink-0 inline-block align-bottom ml-1 w-3.5 h-3.5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      )}
    </Link>
  )
};

export function InternalLink({ className='', href, text, hasIcon=true, prefetch=false } : { className?: string, href: string, text: string, hasIcon?: boolean, prefetch?: boolean }) {
  return (
    <Link href={href} className="flex group items-center" target="_blank" prefetch={prefetch}>
      <span className={cx("link text-xs font-semibold", className)}>{text}</span>
      {hasIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-3.5 h-3.5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      )}
    </Link>
  )
};


import Link from 'next/link';

import cx from 'clsx';

import styles from './Link.module.scss';

export function ExternalLink({ className='', href, isIcon=true, children, ...props } : {
  className?: string,
  href: string,
  isIcon?: boolean,
  children
}) {
  return (
    <Link href={href} className={cx("inline group items-center", className)} target="_blank" rel="noopener noreferrer" {...props}>
      <span className={cx(styles.link, styles.external, "text-inherit flex-1")}>{children}</span>
      {isIcon && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="inline-block align-middle ml-1 w-3 h-3 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      )}
    </Link>
  )
};

export function InternalLink({ className='', href, hasIcon=false, children, ...props } : { className?: string, href: string, hasIcon?: boolean, children }) {
  return (
    <Link href={href} className="inline group items-center" {...props}>
      <span className={cx(styles.link, "text-inherit font-semibold", className)}>{children}</span>
      {hasIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-3.5 h-3.5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      )}
    </Link>
  )
};


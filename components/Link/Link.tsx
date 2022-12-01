import Link from 'next/link';

export function ExternalLink({ href, text } : { href: string, text: string }) {
  return (
    <Link href={href} className="flex group items-center" target="_blank">
      <span className="text-xs text-blue-700 font-medium hover:text-blue-800 hover:underline cursor-pointer">{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-3.5 h-3.5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    </Link>
  )
};

export function InternalLink({ href, text } : { href: string, text: string }) {
  return (
    <Link href={href} className="flex group items-center" target="_blank">
      <span className="text-xs text-blue-700 font-medium hover:text-blue-800 hover:underline cursor-pointer">{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-3.5 h-3.5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </Link>
  )
};

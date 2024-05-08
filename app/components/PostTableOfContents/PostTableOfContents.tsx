'use client';

import cx from "clsx";


interface Props {
  headings: {
    slug: string,
    text: string,
    heading: number,
  }[],
};

const defaultProps = {
  headings: [],
};

const PostTableOfContents: React.FC<Props> = (props) => {
  const { headings } = { ...defaultProps, ...props};

  return (
    <div>
      <div className="mb-2.5 text-xs uppercase text-font-primary">
        Contents
      </div>

      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => {
          return (
            <li key={heading.slug}>
              <a href={`#${heading.slug}`}
                 className={cx(
                   "group relative text-font-secondary underline-offset-2 transition-all hover:underline font-medium",
                   {
                     "pl-3": heading.heading === 2,
                     "pl-6": heading.heading === 3,
                   },
                 )}>
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostTableOfContents;

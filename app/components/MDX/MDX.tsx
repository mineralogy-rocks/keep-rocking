import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';

import { slugify } from "@utils";
import Heading from '@/components/Heading';


function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function createHeading(level) {
  const element = ({children}) => {
    let href = slugify(children);
    return (
      <Heading level={level} href={href}>{children}</Heading>
    );
  };
  return element;
}

function Callout(props) {
  return (
    <div className="px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded p-1 text-sm flex items-center text-slate-900 dark:text-slate-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: Code,
  Callout,
  Image,
  Link
};

export default function CustomMDX(props) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }}/>
  );
}

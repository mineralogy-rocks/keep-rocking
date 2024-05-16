'use server';
import {cache} from "react";
import { headers } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

import {getViews, incrementViews as increment} from "@/actions";


const incrementViews = cache(increment);

interface Props {
  slug: string,
};

const defaultProps = {
  slug: "",
};

const PostMetrics = async function PostMetrics(props: Props) {
  noStore();
  const headersList = headers();
  const isPrefetch = headersList.get('Next-Url') === '/blog';
  const { slug } = { ...defaultProps, ...props};

  if (!isPrefetch) {
    await incrementViews(slug);
  }
  const views = await getViews(slug);

  return (<p className="text-xs md:text-sm text-font-secondary slashed-zero tabular-nums">{views?.count.toLocaleString()} views</p>);
}

export default PostMetrics;

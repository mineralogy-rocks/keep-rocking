import { Suspense, cache } from 'react';

import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { getBLogPost, getViews, incrementViews as increment } from '@/actions';
import { postDetailApiResponse } from '@/lib/types';
import CustomMDX from '@/components/MDX';


const incrementViews = cache(increment);

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const { slug } = params;
  const data = await getBLogPost(slug);
  if (!data) return;

  return {
    title: data.name,
    description: data.description,
  };
}

const Views = async ({ slug }) => {
  noStore();
  await incrementViews(slug);
  let views = await getViews(slug);
  return (<p className="text-sm text-slate-600 dark:text-slate-400 slashed-zero tabular-nums">{views?.count.toLocaleString()} views</p>);
}

export default async function Blog({ params }) {
  const { slug } = params;
  let post: postDetailApiResponse = await getBLogPost(slug);
  if (!post) notFound();

  return (
    <section className="max-w-xs sm:max-w-md md:max-w-3xl mx-auto mt-10 lg:mt-20">
      <script type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.name,
                  dateCreated: post.created_at,
                  datePublished: post.published_at,
                  dateModified: post.updated_at,
                  description: post.description,
                  url: `https://mineralogy.rocks/blog/${post.slug}`,
                  author: {
                    '@type': 'Person',
                    name: 'Liubomyr Gavryliv',
                  },
                }),
              }} />
      <h1 className="text-font-primary text-pretty font-semibold text-3xl">
        {post.name}
      </h1>

      <div className="flex justify-between items-center mt-3 text-sm w-full">
        <p className="text-sm text-slate-600 dark:text-slate-400 slashed-zero tabular-nums">
          {post.published_at}
        </p>
        <Suspense fallback={<p className="h-5"/>}>
          <Views slug={slug} />
        </Suspense>
      </div>

      <article className="mt-10 prose prose-slate prose-sm lg:prose-base dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}


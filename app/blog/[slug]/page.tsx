import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {getBLogPost, getPostList} from '@/actions';
import {postDetailApiResponse, postListApiResponse} from '@/lib/types';
import { getHeadings } from "@utils";

import PostMetrics from '@/components/PostMetrics';
import PostTableOfContents from "@/components/PostTableOfContents";
import LoadingDots from "@/components/LoadingDots";
import CustomMDX from '@/components/MDX';


export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const { slug } = params;
  const data = await getBLogPost(slug);
  if (!data) return;

  return {
    title: data.name,
    description: data.description,
  };
}


export const dynamicParams = true;


export async function generateStaticParams() {
  const posts: postListApiResponse = await getPostList();

  return posts.results.map(({ slug }) => ({
    slug
  }));
};


export default async function Blog({ params }) {
  const { slug } = params;
  let post: postDetailApiResponse = await getBLogPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.content);

  return (
    <section className="max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl p-4 sm:p-2 mx-auto mt-10 lg:mt-20">
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
      <h1 className="text-font-primary text-pretty font-bold text-lg md:text-3xl">
        {post.name}
      </h1>

      <div className="flex justify-between items-center mt-5 text-sm w-full">
        <p className="text-xs md:text-sm text-font-secondary slashed-zero tabular-nums">
          {post.published_at}
        </p>
        <Suspense fallback={<LoadingDots isSmall={true} />}>
          <PostMetrics slug={slug} />
        </Suspense>
      </div>

      <div className="mt-10 grid grid-cols-8 gap-4">
        <article className="col-span-8 lg:col-span-6 prose prose-slate prose-sm lg:prose-base dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>
        {!!headings && (
          <aside className="h-min col-span-2 hidden lg:block sticky top-20 right-0 p-3">
            <PostTableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </section>
  );
}


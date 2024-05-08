import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {getBLogPost, getPostList} from '@/actions';
import {postDetailApiResponse, postListApiResponse} from '@/lib/types';

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

export async function generateStaticParams() {
  const posts: postListApiResponse = await getPostList();

  return posts.results.map(({ slug }) => ({
    params: { slug }
  }));
};

export default async function Blog({ params }) {
  const { slug } = params;
  let post: postDetailApiResponse = await getBLogPost(slug);
  if (!post) notFound();

  const headings = post.content.match(/#{2,3} .+/g)?.map((heading) => {
    const matches = heading.match(/(#{2,3}) (.+)/);
    if (!matches) return;
    return {
      slug: matches[2].toLowerCase().replace(/ /g, '-'),
      text: matches[2],
      heading: matches[1].length,
    };
  });

  return (
    <section className="max-w-sm sm:max-w-md md:max-w-3xl p-2 mx-auto mt-10 lg:mt-20">
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

      {!!headings && <PostTableOfContents headings={headings} />}

      <article className="mt-10 prose prose-slate prose-sm lg:prose-base dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}


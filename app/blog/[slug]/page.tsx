import { Suspense } from 'react';

import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { getBLogPost } from '@/actions';
import { postDetailApiResponse } from '@/lib/types';
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


export default async function Blog({ params }) {
  const { slug } = params;
  let post: postDetailApiResponse = await getBLogPost(slug);

  if (!post) notFound();

  return (
    <section>
      <script
        type="application/ld+json"
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
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.name}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.published_at}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          {/*<Views slug={post.slug} />*/}
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert mx-10">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}


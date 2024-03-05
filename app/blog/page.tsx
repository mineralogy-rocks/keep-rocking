import { Suspense } from "react";
import { Metadata } from 'next';

import { getPostList } from '@/actions';


export const metadata: Metadata = {
  title: 'blog',
  description: 'The blog of mineralogy.rocks',
  keywords: 'mineralogy, mineral computing, mineral informatics',
}

export default async function BlogPage({ searchParams }) {
  const posts = await getPostList(new URLSearchParams(searchParams).toString());

  console.log(posts)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-10">
          {posts.results.map(({ slug, name, description, published_at: publishedAt, views, likes, tags, category }) => (
            <article className="relative group" key={slug}>
              <h1 className="text-2xl font-bold">{name}</h1>
              <span className="text-sm font-normal">{publishedAt}</span>
              <span className="text-sm font-normal">{views} views</span>
              <span className="text-sm font-normal">{likes} likes</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Suspense>
    </section>
  );
};

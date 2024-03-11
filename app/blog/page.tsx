import { Suspense } from "react";

import cx from 'clsx';
import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getPostList, getBlogCategories } from '@/actions';
import utilsStyles from "@/styles/utils.module.scss";
import { postListApiResponse } from "@/lib/types";
import BlogCategory from "@/components/BlogCategory";


export const metadata: Metadata = {
  title: 'blog',
  description: 'The blog of mineralogy.rocks',
  keywords: 'mineralogy, mineral computing, mineral informatics',
}


export default async function BlogPage({ searchParams }) {
  noStore();
  const posts: postListApiResponse = await getPostList(new URLSearchParams(searchParams).toString());
  const categories = await getBlogCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-6 gap-2 relative mt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-10 col-span-4">
          {posts && posts.results?.map(({ slug, name, description, published_at: publishedAt, views, likes, tags, category }) => (
            <article className="relative flex flex-col group p-2 space-y-2" key={slug}>
              <h1 className="text-xl font-bold text-font">{name}</h1>
              <div className="flex justify-between text-xs font-normal mt-2">
                <span className="">{publishedAt}</span>
                <span className="">{views} views</span>
                <span className="">{likes} likes</span>
              </div>
              <p className="text-font-secondary text-sm">{description}</p>
              <Link href={`/blog/${slug}`} className={cx(utilsStyles.link, 'mt-5')}>Read more</Link>
            </article>
          ))}
        </div>
      </Suspense>
      <aside className="col-span-2 p-1">
        <BlogCategory categories={categories} />
      </aside>
    </div>
  );
};

import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getPostList, getBlogCategories } from '@/actions';
import { postListApiResponse } from "@/lib/types";
import BlogCategory from "@/components/BlogCategory";


export const metadata: Metadata = {
  title: 'Blog',
  description: 'The blog of mineralogy.rocks',
  keywords: 'mineralogy, mineral computing, mineral informatics',
};


const BlogCard = ({ slug, name, description, publishedAt, views, tags }) => (
  <article className="relative flex flex-col p-2 rounded-sm">
    <Link href={`/blog/${slug}`} prefetch={true}>
      <h1 className="text-font-primary text-lg font-bold text-pretty">{name}</h1>
    </Link>

    <p className="font-medium text-sm mt-5 text-pretty">{description}</p>

    <div className="flex flex-col md:flex-row justify-between gap-1 mt-3">
      <div className="flex space-x-1 text-xs font-normal text-font-ternary">
        <span className="slashed-zero tabular-nums">{publishedAt}</span>
        <span>&#183;</span>
        <span className="slashed-zero tabular-nums">{views} views</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs font-medium text-font-ternary">#{tag.name}</span>
        ))}
      </div>
    </div>
  </article>
);

export default async function BlogPage({ searchParams }) {
  noStore();
  const categories = await getBlogCategories();
  const posts: postListApiResponse = await getPostList(new URLSearchParams(searchParams).toString());

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:grid md:grid-cols-6 gap-2 relative mt-20">
      <div className="order-2 md:order-1 space-y-5 md:col-start-1 md:col-end-5">
        {posts && posts.results?.map(({
                                        id,
                                        slug,
                                        name,
                                        description,
                                        published_at: publishedAt,
                                        views,
                                        tags,
                                        category
                                      }) => (
          <BlogCard key={id} {...{slug, name, description, publishedAt, views, tags } } />
        ))}
      </div>
      <aside className="order-1 col-span-2 p-1 md:col-start-5">
        <BlogCategory categories={categories}/>
      </aside>
    </div>
  );
};

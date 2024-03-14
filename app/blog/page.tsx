import { Suspense } from "react";
import cx from "clsx";

import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getPostList, getBlogCategories } from '@/actions';
import utilsStyles from "@/styles/utils.module.scss";
import { postListApiResponse } from "@/lib/types";
import BlogCategory from "@/components/BlogCategory";


export const metadata: Metadata = {
  title: 'Blog',
  description: 'The blog of mineralogy.rocks',
  keywords: 'mineralogy, mineral computing, mineral informatics',
}


export default async function BlogPage({ searchParams }) {
  noStore();
  const posts: postListApiResponse = await getPostList(new URLSearchParams(searchParams).toString());
  const categories = await getBlogCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:grid md:grid-cols-6 gap-2 relative mt-20">

      <div className="order-2 md:order-1 space-y-10 md:col-start-1 md:col-end-5">
        {posts && posts.results?.map(({
                                        slug,
                                        name,
                                        description,
                                        published_at: publishedAt,
                                        views,
                                        likes,
                                        tags,
                                        category
                                      }) => (
          <article className="relative flex flex-col p-2" key={slug}>

            <h1 className="text-xl font-bold text-font">{name}</h1>

            <div className="p-2 mt-3">
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="text-xs font-light text-font-secondary">#{tag.name}</span>
                ))}
              </div>

              <div className="flex justify-between text-xs font-normal text-font-secondary mt-3">
                <span className="">{publishedAt}</span>
              </div>

              <p className="text-font-secondary text-sm mt-5">{description}</p>
            </div>

            <div className="flex justify-between items-center mt-5">
              <Link href={`/blog/${slug}`} className={cx(utilsStyles.link, "group flex items-center font-semibold text-sm")}>
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                     stroke="currentColor" className="w-3 h-3 ml-1 group-hover:animate-[wiggleRight_1s_infinite]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
                </svg>
              </Link>

              <div className="text-xs font-normal space-x-2">
                <span className="">{views} views</span>
                <span className="">{likes} likes</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="order-1 col-span-2 p-1 md:col-start-5">
      <BlogCategory categories={categories}/>
      </aside>
    </div>
  );
};

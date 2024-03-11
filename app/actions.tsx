'use server';

import { clientFetcher } from "@/helpers/fetcher.helpers";

export async function getExplore(url: string) {
  return await clientFetcher('/mineral/' + url);
}

export async function getMineralDetail(slug: string) {
  return await clientFetcher('/mineral/' + slug);
}

export async function getPostList(query: string) {
  console.log(query)
  return await clientFetcher('/blog/post/' + (query ? '?' + query : ''));
}

export async function getBlogCategories() {
  return await clientFetcher('/blog/category');
}

'use server';

import filter from 'just-filter-object';

import { clientFetcher } from "@/helpers/fetcher.helpers";


export async function getExplore(params: Record<any, any>) {
  const cleanParams = filter(params, (key, value) => value !== '' && value !== null);
  let queryString = '?' + new URLSearchParams(cleanParams).toString();

  if ('q' in cleanParams) {
    return await clientFetcher('/mineral/' + queryString);
  }
  return null;
}

export async function getGroupingMembers(slug, params: Record<any, any>) {
  let queryString = '?' + new URLSearchParams(params).toString();
  return await clientFetcher('/mineral/' + slug + '/grouping-members/' + queryString);
}

export async function getRelations(slug: string, relation: string) {
  return await clientFetcher('/mineral/' + slug + '/' + relation);
}

export async function getMineralDetail(slug: string) {
  return await clientFetcher('/mineral/' + slug);
}

export async function getPostList(query?: string) {
  return await clientFetcher('/blog/post/' + (query ? '?' + query : ''));
}

export async function getBlogCategories() {
  return await clientFetcher('/blog/category');
}

export async function getBLogPost(slug: string) {
  return await clientFetcher('/blog/post/' + slug);
}

export async function incrementViews(slug: string) {
  return await clientFetcher('/blog/post/' + slug + '/increment-views/', { method: 'POST' });
}

export async function getViews(slug: string) {
  return await clientFetcher('/blog/post/' + slug + '/views/');
}

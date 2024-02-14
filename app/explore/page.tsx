import { Suspense } from "react";
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import { clientFetcher } from '@/helpers/fetcher.helpers';

import Search from './search';


async function getMinerals(params) {
  'use server';

  return await clientFetcher('/mineral/?' + new URLSearchParams(params).toString());
}

export default async function Explore({ searchParams }) {
  const initialQuery: any = filter(Object.assign({}, searchParams), (key, value) => value !== '' && value !== null);
  // const data = initialQuery ?  await getMinerals(initialQuery) : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search onSearch={getMinerals} />
    </Suspense>
  );
}

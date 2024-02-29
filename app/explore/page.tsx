import { Suspense } from "react";
import filter from 'just-filter-object';

import { getExplore } from "@/actions";
import { exploreApiRequest, exploreApiResponse } from "@/lib/types";

import Search from './search';


export default async function Explore({ searchParams }: { searchParams: exploreApiRequest }) {
  const cleanQuery = filter(searchParams, (key, value) => value !== '' && value !== null);
  let data: exploreApiResponse[] | null = null;
  if ('q' in cleanQuery) data = await getExplore('?' + new URLSearchParams(cleanQuery as Record<string, string>).toString());


  return (
    <Suspense fallback={<div></div>}>
      <Search data={data}/>
    </Suspense>
  );
}

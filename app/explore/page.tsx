import { Suspense } from "react";
import filter from 'just-filter-object';

import { getExplore } from "@/actions";
import {exploreApiRequest} from "@/lib/types";

import Search from './search';


export default async function Explore({ searchParams }) {
  const cleanQuery: exploreApiRequest = filter(Object.assign({}, searchParams), (key, value) => value !== '' && value !== null);
  let data = null;
  if ('q' in cleanQuery) data = await getExplore('?' + new URLSearchParams(cleanQuery).toString());


  return (
    <Suspense fallback={<div></div>}>
      <Search data={data}/>
    </Suspense>
  );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getExplore } from "@/actions";
import { exploreApiRequest } from "@/lib/types";

import Search from './search';


export default async function ExplorePage({ searchParams }: { searchParams: exploreApiRequest }) {
  const q = searchParams.q || '';

  const queryClient = new QueryClient();
  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ['explore', searchParams],
      queryFn: () => getExplore(searchParams),
    })
  }


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Search />
    </HydrationBoundary>
  );
}

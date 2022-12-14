import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWRImmutable from 'swr/immutable';
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import fetcher from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { abortableMiddleware } from '@/middleware/abortable-swr';

import SearchInput from '@/components/SearchInput';
import MineralCard from '@/components/MineralCard';
import { Paginator, SmallPaginator } from '@/components/Paginator';
import TableOfContents from '@/components/TableOfContents';


export default function Explore() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({ q: '', cursor: '' });
  const [inView, setInView] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchValue = useDebounce(queryParams, 500);
  const _queryParams = filter(debouncedSearchValue, (key, value) => value !== '' && value !== null);

  useEffect(() => {
    if(!router.isReady) return;
    if (router.query.q) {
      setQueryParams({ q: router.query.q.toString(), cursor: router.query.cursor?.toString() ?? '' });
    }
  }, [router.isReady]);

  const resetRouter = () => {
    router.replace({ query: {  } });
  };

  const handleSearch = (value: exploreApiRequest) => {
      value = filter(value, (key, val) => val !== '' && val !== undefined);

      if (Object.keys(value).length > 0) {
        setIsSearching(true);
        if (value.q) {
          setQueryParams({ ...queryParams , ...value, cursor: '' });
          router.replace({ query: { ...value } });
        } else {
          setQueryParams({ ...queryParams , ...value });
          router.replace({ query: { ...router.query, ...value } });
        }
      } else resetSearch();
  };

  const resetSearch = () => {
      setIsSearching(false);
      setQueryParams({ q: '', cursor: '' });
      resetRouter();
  };

  const handlePageChange = (url: string) => {
    let url_ = new URL(url);
    handleSearch({ cursor: url_.searchParams.get('cursor') })
  };

  const handleVisibleItems = (isVisible: boolean, item: number) => {
    if (inView.length === 0 && !isVisible) return;
    if (isVisible) setInView((inView) => [...inView, item]);
    else setInView((inView) => inView.filter(item_ => item_ !== item));
  };

  const { data, error } = useSWRImmutable(debouncedSearchValue.q ? `/mineral/?${new URLSearchParams(_queryParams)}` : null, fetcher, { use: [ abortableMiddleware ] });

  useEffect(() => {
    if (data) setIsSearching(false);
    return;
  }, [data])

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="max-w-full mx-auto px-4 sm:px-10 md:px-5">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...'
                       isLoading={(!error && !data && debouncedSearchValue.q && true) || isSearching}
                       searchValue={queryParams.q}
                       onChange={(value) => handleSearch({ q: value })}
                       onReset={resetSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-1 mt-10">
          <div className="col-span-1 lg:col-start-2 lg:col-span-8 xl:col-start-2 xl:col-span-7 2xl:col-start-3 2xl:col-span-6">
            {(!!error && !isSearching) && (
              <div className="flex mt-5 text-red-500 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <span>An error occurred. Please, contact the admin.</span>
              </div>)}

            {!!data && data.results.length === 0 && (
              <div className="flex mt-5 text-gray-500 justify-center items-center">
                No results found.
              </div>
            )}

            <div className="space-y-3">
              {data && data.results.map((item, index) => {
                return (
                  <MineralCard key={item.id} index={index} mineral={item} isVisible={(e) => handleVisibleItems(e, index)} />
                );
              })}
            </div>

            {data && <Paginator previous={data.previous} next={data.next} pageChange={handlePageChange} />}
          </div>

          <aside className="hidden xl:block xl:col-start-9 xl:col-span-2 self-start sticky top-20 right-0 bg-white/90 rounded-sm">
            {data?.results && (
              <>
                <TableOfContents items={data.results} activeItems={inView} selectorId="mineralCard" />
                <div className="mt-1">
                  <SmallPaginator previous={data.previous} next={data.next} pageChange={handlePageChange} />
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

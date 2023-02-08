import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWRImmutable from 'swr/immutable';
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import { fetcher } from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { useMindatApi } from '@/hooks/use-mindat-api';
import { abortableMiddleware } from '@/middleware/abortable-swr';

import SearchInput from '@/components/SearchInput';
import LoadingDots from '@/components/LoadingDots';
import Checkbox from '@/components/Checkbox';
import MineralCard from '@/components/MineralCard';
import { Paginator, SmallPaginator } from '@/components/Paginator';
import TableOfContents from '@/components/TableOfContents';

const initialSearchQueryParams = {
  q: '',
  cursor: '',
};

const initialQueryParams = {
  ...initialSearchQueryParams,
  ima_only: false
};

export default function Explore() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(initialQueryParams);
  const [inView, setInView] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQueryParams = useDebounce(queryParams, 800);
  const cleanQueryParams = filter(debouncedQueryParams, (key, value) => value !== '' && value !== null);

  useEffect(() => {
    if(!router.isReady) return;
    if (router.query.q || router.query.ima_only) {
      setQueryParams({
        q: router.query.q?.toString() ?? '',
        cursor: router.query.cursor?.toString() ?? '',
        ima_only: router.query.ima_only?.toString() === 'true' ?? false
      });
    }
  }, [router.isReady]);

  const handleSearch = (value: exploreApiRequest) => {
      let persistantQueryParams = filter(queryParams, (key, val) => !['q', 'cursor',].includes(key));
      value = filter(value, (key, val) => val !== '' && val !== undefined);
      if (Object.keys(value).length > 0) {
        if ('ima_only' in value) {
          if (queryParams.q) {
            setIsSearching(true);
            setQueryParams({ ...queryParams , ...value, cursor: '' });
            router.replace({ query: { ...value, q: queryParams.q } });
          } else {
            setQueryParams({ ...queryParams , ...value });
            router.replace({ query: { ...value } });
          }
          return;
        };

        setIsSearching(true);
        if (value.q) {
          setQueryParams({ ...queryParams , ...value, cursor: '' });
          router.replace({ query: { ...persistantQueryParams, ...value } });
        } else {
          setQueryParams({ ...queryParams , ...value });
          router.replace({ query: { ...router.query, ...value } });
        };
      } else resetSearch();
  };

  const resetSearch = () => {
      setIsSearching(false);
      setQueryParams({...queryParams, ...initialSearchQueryParams});
      router.replace({ query: {...filter(queryParams, (key, val) => !['q', 'cursor',].includes(key))} });
      mutate(null, false);
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

  const { data, error, mutate, isLoading } = useSWRImmutable(
    debouncedQueryParams.q ? `/mineral/?${new URLSearchParams(cleanQueryParams)}` : null,
    fetcher,
    { use: [ abortableMiddleware ], keepPreviousData: true }
  );

  let dataAvailable = data?.results.filter(item => item.mindat_id !== null).map(item => item.mindat_id).join(',') ?? null;

  const { data: mindatData, error: mindatError, isLoading: mindatIsLoading } = useMindatApi(
    dataAvailable ? `/mr-items/?id__in=${dataAvailable}` : null
  );

  useEffect(() => {
    setIsSearching(false);
    return;
  }, [data, error])

  return (
    <>
      <Head>
        <title>mineralogy.rocks - explore</title>
      </Head>

      <div className="relative max-w-full mx-auto px-4 sm:px-10 md:px-5">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...'
                       isLoading={isSearching || isLoading}
                       searchValue={queryParams.q}
                       onChange={(value) => handleSearch({ q: value })}
                       onReset={resetSearch} />
        </div>

        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-1 mt-2 flex justify-between items-center">
          <Checkbox label="Subset to IMA-Approved species?"
                    name="ima_only"
                    value="ima_only"
                    checked={queryParams.ima_only}
                    onChange={(e) => handleSearch({ ima_only: e.target.checked })} />
              {mindatIsLoading && (
                <div className="hidden md:flex mr-1">
                  <span className="ml-2 text-xs font-normal text-gray-700">Requesting data from mindat</span>
                  <LoadingDots className="relative ml-1 top-0.5" isSmall={true} />
                </div>
              )}
              {(!!mindatError && !mindatIsLoading) && (
                <div className="hidden md:flex text-xs text-red-500 justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <span>Couldn&apos;t connect to mindat API.</span>
                </div>
              )}
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
                  <MineralCard key={item.id}
                               index={index}
                               mineral={item}
                               mindatContext={mindatData?.results.filter(item_ => item_.id === item.mindat_id)[0] ?? null}
                               isVisible={(e) => handleVisibleItems(e, index)} />
                );
              })}
            </div>

            {data && <Paginator previous={data.previous} next={data.next} pageChange={handlePageChange} />}
          </div>

          <aside className="hidden xl:block xl:col-start-9 xl:col-span-2 self-start sticky top-20 right-0 rounded-sm">
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

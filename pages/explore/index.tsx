import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { motion } from 'framer-motion';
import useSWR from 'swr';
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import { fetcher } from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { abortableMiddleware } from '@/middleware/abortable-swr';

import SearchInput from '@/components/SearchInput';
import Checkbox from '@/components/Checkbox';
import MineralCard from '@/components/MineralCard';
import { Paginator, SmallPaginator } from '@/components/Paginator';
import TableOfContents from '@/components/TableOfContents';

const additionalParams = [
  'cursor',
];

const initialSearchQueryParams = {
  cursor: '',
};

const initialQueryParams = {
  ...initialSearchQueryParams,
  ima_only: false
};

export default function Explore() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [queryParams, setQueryParams] = useState({ ...initialQueryParams });
  const [searchTerm, setSearchTerm] = useState('');
  const [inView, setInView] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  // used to prevent the search from being triggered on the next useEffect with debouncedQueryParams
  const [isDeferred, setIsDeferred] = useState(false);
  // used to show the search results
  const [isActive, setIsActive] = useState(false);


  const debouncedQueryParams = useDebounce(queryParams, 200);
  const debouncedSearch = useDebounce(searchTerm, 600);
  const _persistantQueryParams = filter(queryParams, (key, val) => !additionalParams.includes(key) && val !== '' && val !== undefined);
  // remove cursor= and other stale filters from query params
  const _cleanQueryParams = filter(debouncedQueryParams, (key, val) => val !== '' && val !== undefined);
  const _routerParams: any = filter(Object.assign({}, router.query), (key, value) => value !== '' && value !== null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(!router.isReady) return;
    if (router.query.q || router.query.ima_only) {
      setQueryParams({
        cursor: router.query.cursor?.toString() ?? '',
        ima_only: router.query.ima_only?.toString() === 'true' ?? false
      });
      setSearchTerm(router.query.q?.toString() ?? '');
    };
  }, [router.isReady]);

  const handleSearchTerm = (value: string) => {
    if (value) {
      setIsSearching(true);
      setIsDeferred(true);
      setSearchTerm(value);
    } else resetSearch();
  };

  const handlePageChange = (url: string) => {
    let _url = new URL(url);
    handleSearch({ cursor: _url.searchParams.get('cursor') })
  };

  const handleVisibleItems = (isVisible: boolean, item: number) => {
    if (inView.length === 0 && !isVisible) return;
    if (isVisible) setInView((inView) => [...inView, item]);
    else setInView((inView) => inView.filter(item_ => item_ !== item));
  };

  const handleSearch = (value: exploreApiRequest) => {
    value = filter(value, (key, val) => val !== '' && val !== undefined);
    if (Object.keys(value).length > 0) {
      if ('ima_only' in value) {
        if (searchTerm) {
          setIsSearching(true);
          setQueryParams({ ...queryParams, ...value, cursor: '' });
        } else {
          setQueryParams({ ...queryParams , ...value });
        }
        return;
      };
      setIsSearching(true);
      setQueryParams({ ...queryParams , ...value });
    } else resetSearch();
  };

  const resetSearch = () => {
    setIsSearching(false);
    setIsDeferred(true);
    setIsActive(false);

    setSearchTerm('');
    setQueryParams({...queryParams, ...initialSearchQueryParams});
    mutate(undefined, false);
  };

  const { data, error, mutate, isLoading } = useSWR(
    debouncedSearch && 'q' in _routerParams ? '/mineral/?' + new URLSearchParams(_routerParams).toString() : null,
    (url, params) => fetcher(url, params),
    {
      use: [ abortableMiddleware ],
      keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (isMounted) {
      if (debouncedSearch) {
        if (!isDeferred && 'cursor' in _cleanQueryParams) {
          router.push({ query: { ..._cleanQueryParams, q: debouncedSearch } });
          setIsDeferred(false);
          return;
        }
        let _queryParams = isDeferred ? filter(debouncedQueryParams, (key, val) => !additionalParams.includes(key)) : _cleanQueryParams;
        router.push({ query: { ..._queryParams, q: debouncedSearch } });
      } else {
        router.push({ query: {..._persistantQueryParams} });
      }
      setIsDeferred(false);
    }
    return;
  }, [debouncedSearch]);

  useEffect(() => {
    if (isMounted && !isDeferred && Object.keys(_cleanQueryParams).length > 0) {
      let _query: any = { ..._cleanQueryParams };
      if (searchTerm) _query.q = searchTerm;
      router.push({ query: _query });
    }
    return;
  }, [debouncedQueryParams]);


  useEffect(() => {
    setIsSearching(false);
    setIsActive(true);
    return;
  }, [data, error,]);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - explore</title>
      </Head>

      <div className="relative max-w-full mx-auto px-0 sm:px-10 md:px-5">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...'
                       isLoading={isSearching || isLoading}
                       searchValue={searchTerm}
                       onChange={(value) => handleSearchTerm(value)}
                       onReset={resetSearch} />
        </div>
        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-1 mt-2 flex justify-between items-center">
          <Checkbox label="Subset to IMA-Approved species?"
                    name="ima_only"
                    value="ima_only"
                    checked={queryParams.ima_only}
                    onChange={(e) => handleSearch({ ima_only: e.target.checked })} />
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

            {!!data && data.results?.length === 0 && (
              <div className="flex mt-5 text-gray-500 justify-center items-center">
                No results found.
              </div>
            )}
            {isActive && data && data.results?.length > 0 && (
              <div className="space-y-6 sm:space-y-3">
                {data.results.map((item, index) => {
                  return (
                    <motion.div key={index}
                                initial={{
                                  opacity: 0.8,
                                  y: 20
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0
                                }}
                                transition={{
                                  type: 'spring',
                                  bounce: 0.2,
                                  duration: 1,
                                  delay: 0.1*index
                                }}>
                      <MineralCard key={item.slug}
                                   index={index}
                                   mineral={item}
                                   isVisible={(e) => handleVisibleItems(e, index)} />
                    </motion.div>
                  );
                })}
              </div>
            )}

            {isActive && data && <Paginator previous={data.previous} next={data.next} pageChange={handlePageChange} />}
          </div>

          <aside className="hidden xl:block xl:col-start-9 xl:col-span-2 self-start sticky top-20 right-0 p-3">
            {isActive && data?.results.length > 0 && (
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

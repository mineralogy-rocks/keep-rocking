'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import { initialSearchQuery, initialQuery } from '@/lib/interfaces';
import useDebounce from '@/hooks/use-debounce.hook';

import SearchInput from '@/components/SearchInput';
import Checkbox from '@/components/Checkbox';
import MineralCard from '@/components/MineralCard';
import { Paginator, SmallPaginator } from '@/components/Paginator';
import TableOfContents from '@/components/TableOfContents';
import { getExplore } from "@/actions";


const additionalParams = [
  'cursor',
];

const initialSearchQueryParams: initialSearchQuery = {
  cursor: '',
};

const initialQueryParams: initialQuery = {
  ...initialSearchQueryParams,
  ima_only: false
};

export default function Search() {

  noStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [queryParams, setQueryParams] = useState({ ...initialQueryParams });
  const [searchTerm, setSearchTerm] = useState('');
  const [inView, setInView] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  // used to prevent the search from being triggered on the next useEffect with debouncedQueryParams
  const [isDeferred, setIsDeferred] = useState(false);
  // used to show the search results
  const [isActive, setIsActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedQueryParams = useDebounce(queryParams, 200);
  const debouncedSearch = useDebounce(searchTerm, 600);
  const _persistantQueryParams: exploreApiRequest = filter(queryParams, (key, val) => !additionalParams.includes(key) && val !== '' && val !== undefined);
  // remove cursor= and other stale filters from query params
  const _cleanQueryParams: exploreApiRequest = filter(debouncedQueryParams, (key, val) => val !== '' && val !== undefined);

  const params = Object.fromEntries(searchParams);
  const { error, data } = useQuery({
    queryKey: ['explore', params],
    queryFn: () => getExplore(params),
    enabled: false,
  });

  useEffect(() => {
    setIsMounted(true);
    try {
      let _recentSearches = window.localStorage.getItem('recentSearches');
      if (_recentSearches) {
        setRecentSearches(JSON.parse(_recentSearches));
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (!router) return;
    if (searchParams.get('q') || searchParams.get('ima_only')) {
      setQueryParams({
        cursor: searchParams.get('cursor')?.toString() ?? '',
        ima_only: searchParams.get('ima_only')?.toString() === 'true' ?? false
      });
      setSearchTerm(searchParams.get('q')?.toString() ?? '');
    };
  }, [router]);

  const handleSearchTerm = (value: string) => {
    if (value) {
      setIsSearching(true);
      setIsDeferred(true);
      setSearchTerm(value);
    } else resetSearch();
  };

  const handlePageChange = (url: string) => {
    let _url = new URL(url);
    handleSearch({ cursor: _url.searchParams.get('cursor') || '' })
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
  };


  useEffect(() => {
    if (isMounted) {
      if (debouncedSearch) {
        if (!isDeferred && 'cursor' in _cleanQueryParams) {
          router.push(pathname + '?' + new URLSearchParams({ ..._cleanQueryParams, q: debouncedSearch } as Record<any, any>).toString());
          return;
        }
        let _queryParams: exploreApiRequest = isDeferred ? filter(debouncedQueryParams, (key, val) => !additionalParams.includes(key)) : _cleanQueryParams;
        router.push(pathname + '?' + new URLSearchParams({ ..._queryParams, q: debouncedSearch } as Record<any, any>).toString());
      } else {
        router.push(pathname + '?' + new URLSearchParams({ ..._persistantQueryParams } as Record<string, string>).toString());
      }
      setIsDeferred(false);
    }
    return;
  }, [debouncedSearch]);

  useEffect(() => {
    if (isMounted && !isDeferred && Object.keys(_cleanQueryParams).length > 0) {
      let _query: any = { ..._cleanQueryParams };
      if (searchTerm) {
        _query.q = searchTerm;
      }
      router.push(pathname + '?' + new URLSearchParams(_query).toString());
    }
    return;
  }, [debouncedQueryParams]);

  useEffect(() => {
    setIsSearching(false);
    setIsActive(true);
    if (data && data.results && data.results.length > 0) {
      try {
        let storedSearches = JSON.parse(window.localStorage.getItem('recentSearches') || '[]');
        console.log(storedSearches, searchTerm)
        if (storedSearches) {
          if (!storedSearches.includes(searchTerm)) {
            storedSearches.unshift(searchTerm);
            if (storedSearches.length > 10) {
              storedSearches.pop();
            }
          } else {
            // move the search term to the top of the list
            storedSearches = storedSearches.filter(item => item !== searchTerm);
            storedSearches.unshift(searchTerm);
          }
          window.localStorage.setItem('recentSearches', JSON.stringify(storedSearches));
          setRecentSearches(storedSearches);
        } else {
          window.localStorage.setItem('recentSearches', JSON.stringify([searchTerm]));
          setRecentSearches([searchTerm]);
        }
      } catch (_) {}
    }
    return;
  }, [data, error,]);


  return (
    <>
      <div className="relative max-w-full mx-auto px-0 sm:px-10 md:px-5">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...'
                       isLoading={isSearching}
                       searchValue={searchTerm}
                       onChange={(value) => handleSearchTerm(value)}
                       onReset={resetSearch}/>
        </div>
        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-1 mt-2 flex justify-between items-center">
          <Checkbox label="Subset to IMA-Approved species?"
                    name="ima_only"
                    value="ima_only"
                    checked={queryParams.ima_only}
                    onChange={(e) => handleSearch({ima_only: e.target.checked})}/>
        </div>

        <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-1 mt-2">
          <div className="flex flex-wrap items-center gap-0.5 md:gap-2">
            {recentSearches.map((item, index) => {
              return (
                <div key={index} className="flex items-center justify-center text-font-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/>
                  </svg>
                  <button key={index}
                          className="text-xxs md:text-xs font-medium ml-0.5"
                          onClick={() => handleSearchTerm(item)}>
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-1 mt-10">
          <div
            className="col-span-1 lg:col-start-2 lg:col-span-8 xl:col-start-2 xl:col-span-7 2xl:col-start-3 2xl:col-span-6">
            {(!!error && !isSearching) && (
              <div className="flex mt-5 text-red-500 justify-center items-center text-sm mx-2">
                <span>Hmmm...an error occurred. Please, be patient as we might be upgrading our services.</span>
              </div>)}

            {!!data && data.results?.length === 0 && (
              <div className="flex mt-5 text-font-secondary justify-center items-center text-sm mx-2">
                No results found. Please refine your query.
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
                                  delay: 0.1 * index
                                }}>
                      <MineralCard key={item.slug}
                                   index={index}
                                   mineral={item}
                                   isVisible={(e) => handleVisibleItems(e, index)}/>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {isActive && data && <Paginator previous={data.previous} next={data.next} pageChange={handlePageChange}/>}
          </div>

          <aside className="hidden xl:block xl:col-start-9 xl:col-span-2 self-start sticky top-20 right-0 p-3">
            {isActive && data?.results.length > 0 && (
              <>
                <TableOfContents items={data.results} activeItems={inView} selectorId="mineralCard"/>
                <div className="mt-1">
                  <SmallPaginator previous={data.previous} next={data.next} pageChange={handlePageChange}/>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

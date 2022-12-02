import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWRImmutable from 'swr/immutable';
import filter from 'just-filter-object';

import { exploreApiRequest } from '@/lib/types';
import fetcher from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';

import SearchInput from '@/components/SearchInput';
import MineralCard from '@/components/MineralCard';
import Paginator from '@/components/Paginator';


export default function Explore() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({ q: '', cursor: '' });

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
        if (value.q) {
          setQueryParams({ ...queryParams ,  ...value, cursor: '' });
          router.replace({ query: { ...value } });
        } else {
          setQueryParams({ ...queryParams , ...value });
          router.replace({ query: { ...router.query, ...value } });
        }
      } else resetSearch();
  };

  const resetSearch = () => {
      setQueryParams({ q: '', cursor: '' });
      resetRouter();
  };

  const handlePageChange = (url: string) => {
    let url_ = new URL(url);
    handleSearch({ cursor: url_.searchParams.get('cursor') })
  };

  const { data, error } = useSWRImmutable(debouncedSearchValue.q ? `/mineral/?${new URLSearchParams(_queryParams)}` : null, fetcher);

  console.log(data)

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>

      {/* <aside className="mt-20 ml-1 hidden xl:block col-span-2 sticky top-20 float-right bg-white/90 rounded-sm">
        <ul className="p-1 space-y-1">
          {data && data.results.map((item, index) => (
              <Fragment key={index}>
                <li key={index}>
                  <a href={`#${item.id}`} className="flex items-center group text-sm font-medium text-blue-700 hover:text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="invisible group-hover:visible h-4 w-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                    <span>{item.name}</span>
                  </a>
                </li>
              </Fragment>
              )
            )
          }
        </ul>
      </aside> */}

      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...'
                       isLoading={(!error && !data && debouncedSearchValue.q) && true}
                       searchValue={queryParams.q}
                       onChange={(value) => handleSearch({ q: value })}
                       onReset={resetSearch} />
        </div>
        {!!error && (
          <div className="flex mt-5 text-red-500 justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span>An error occurred. Please, contact the admin.</span>
          </div>)}

        <div className="mt-10 space-y-3">
          {data && data.results.map((item, index) => {
            return (
              <MineralCard key={index} mineral={item} />
            );
          })}
        </div>

        {data && <Paginator previous={data.previous} next={data.next} pageChange={handlePageChange} />}
      </div>
    </>
  );
}

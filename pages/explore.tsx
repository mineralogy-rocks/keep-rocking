import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import useSWRImmutable from 'swr/immutable';
import cx from 'clsx';

import fetcher from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import SearchInput from '@/components/SearchInput';
import MineralCard from '@/components/MineralCard';

import utilsStyles  from '@/styles/utils.module.scss';

export default function Explore() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  // const [searchParams, setSearchParams] = useState({ q: '', cursor: '' });

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if(!router.isReady) return;
    if (router.query.q) {
      setSearchValue(router.query.q.toString());
      // setSearchParams({ q: router.query.q.toString(), cursor: router.query.cursor?.toString() });
    }
  }, [router.isReady]);

  const resetRouter = () => {
    router.replace({ query: {  } });
  };

  const handleSearch = (value) => {
      setSearchValue(value);
      if (value) router.replace({ query: { q: value } });
      else resetRouter();
  };

  const resetSearch = () => {
      setSearchValue('');
      resetRouter();
  };

  const { data, error } = useSWRImmutable(debouncedSearchValue ? `/mineral/?q=${debouncedSearchValue}` : null, fetcher);

  console.log(data)

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-10 lg:mt-20">
          <SearchInput placeholder='Start typing...' searchValue={searchValue} onChange={handleSearch} onReset={resetSearch} />
        </div>
        {(!error && !data && debouncedSearchValue) && <div className="text-center">Loading...</div>}
        {!!error && <div className="mt-5 text-red-500 text-center">An error occurred. Please, contact the admin.</div>}
        <div className="mt-10 space-y-3">
          {data && data.results.map((item) => {
            return (
              <MineralCard key={item.id} mineral={item} />
            );
          })}
        </div>
        {/* {data && (
          <div className="flex justify-center mt-5">
            {data.previous && <Link className={cx(utilsStyles.link)} href={data.previous}>Previous page</Link>}
            {data.next && <Link className={cx(utilsStyles.link)} href={data.next}>Next page</Link>}
          </div>
        )} */}
      </div>
    </>
  );
}

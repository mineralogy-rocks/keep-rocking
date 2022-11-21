import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWRImmutable from 'swr/immutable';

import fetcher from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import SearchInput from '@/components/SearchInput';
import MineralCard from '@/components/MineralCard';


export default function Explore() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if(!router.isReady) return;
    if (router.query.q) {
      console.log(router.query.q)
      setSearchValue(router.query.q.toString());
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
              // <div key={item.id} className="bg-gray-50 rounded-sm p-2 border border-l-4 border-l-green-700/70 max-w-4xl mx-auto">
              //   <h1 className="text-2xl font-bold">{item.name}</h1>
              //   <p className="text-sm">{item.description}</p>
              // </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

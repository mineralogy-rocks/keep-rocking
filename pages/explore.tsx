import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWRImmutable from 'swr/immutable';

import fetcher from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import SearchInput from '@/components/SearchInput';


export default function Explore() {
  const router = useRouter();
  let initialSearch = (router.query.q || '').toString();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

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
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-20">
        <SearchInput placeholder='Start typing...' searchValue={searchValue} onChange={handleSearch} onReset={resetSearch} />
      </div>
      {(!error && !data && debouncedSearchValue) && <div className="text-center">Loading...</div>}
      {!!error && <div className="mt-5 text-red-500 text-center">An error occurred. Please, contact the admin.</div>}
      {data && data.results.map((item) => {
        return (
          <div key={item.id} className="mt-5">
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="text-sm">{item.description}</p>
          </div>
        );
      })}
    </>
  );
}

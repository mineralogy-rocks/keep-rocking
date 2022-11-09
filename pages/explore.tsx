import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useDebounce from '@/hooks/use-debounce.hook';
import SearchInput from '@/components/SearchInput';


export default function Explore() {
  const router = useRouter();
  const initialSearch = (router.query.q || '').toString();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);
  // const [results, setResults] = useState([]);
  // const [error, setError] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleSearch = (value) => {
      setSearchValue(value);
      // if (value === "") setError(null);
      router.replace({ query: { q: value } });
  };

  const resetSearch = () => {
      setSearchValue('');
      // setError(null);
      router.replace({ query: {  } });
  };

  const { data, error } = useSWR(`http://api.dev.mineralogy.rocks/mineral?q=${debouncedSearchValue}`, fetcher, {revalidateOnFocus: false});

  // const species = data ? [].concat(...data) : [];
  console.log(data)

  const searchNames = (search: string): Promise<any[]> => {
    const apiKey:string = process.env.API_KEY;

    return fetch(
      `http://api.dev.mineralogy.rocks/mineral?q=${search}`,
      {
        method: "GET",
        headers: {
          'Authorization': `Api-Key ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    )
      .then(r => r.json())
      .then((r) => {
        console.log(r)
        return r.results;
      })
      .catch((error) => {
        // setError(error);
        return [];
      });
  }

  // useEffect(() => {
  //   console.log(initialSearch)
  //   if (debouncedSearchValue) {
  //     setIsSearching(true);
  //     searchNames(debouncedSearchValue).then((results) => {
  //       setIsSearching(false);
  //       setResults(results);
  //     });
  //   } else {
  //     setResults([]);
  //   }
  // }, [debouncedSearchValue, initialSearch]);

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-20">
        <SearchInput placeholder='Start typing...' searchValue={initialSearch} onChange={handleSearch} onReset={resetSearch} />
      </div>
      {error && <div className="mt-5 text-red-500 text-center">An error occurred. Please, contact the admin.</div>}
      {/* {species.map((specie) => specie.name).join(', ')} */}
    </>
  );
}

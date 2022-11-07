import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useDebounce from '@/hooks/use-debounce.hook';
import SearchInput from '@/components/SearchInput';


export default function Explore() {
  const router = useRouter();
  const initialSearch = (router.query.q || '').toString();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleSearch = (value) => {
    console.log(value)
    router.push({ query: { q: value } });
    setSearchValue(value);
  };

  const searchNames = (search: string): Promise<any[]> => {
    const apiKey:string = process.env.API_KEY;

    return fetch(
      `api.dev.mineralogy.rocks/mineral?q=${search}`,
      {
        method: "GET",
        headers: {
          'Authorization': `Api-Key ${apiKey}`,
        }
      }
    )
      .then((r) => r.json())
      .then((r) => r.data.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      setIsSearching(true);
      searchNames(debouncedSearchValue).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchValue]);

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-20">
        <SearchInput placeholder='Start typing...' searchValue={searchValue} onChange={handleSearch} />
      </div>
    </>
  );
}

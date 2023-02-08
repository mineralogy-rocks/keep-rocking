import useSWRImmutable from 'swr/immutable';

import { mindatFetcher } from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { abortableMiddleware } from '@/middleware/abortable-swr';


export const useMindatApi = (queryParams: string, options = {}) => {
  const debouncedQueryParams = useDebounce(queryParams, 300);

  const { data, error, isLoading, isValidating } = useSWRImmutable(
    debouncedQueryParams ? debouncedQueryParams : null,
    mindatFetcher,
    { use: [ abortableMiddleware ], ...options }
  );

  return { data, error, isLoading, isValidating };
}

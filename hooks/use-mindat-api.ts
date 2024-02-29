import useSWRImmutable from 'swr/immutable';

import { mindatFetcher } from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { abortableMiddleware } from '@/middleware/abortable-swr';


export const useMindatApi = (queryParams: string | null, options = {}) => {
  if (!queryParams) return { data: null, error: null, isLoading: false, isValidating: false };

  const debouncedQueryParams = useDebounce(queryParams, 300);

  const { data, error, isLoading, isValidating } = useSWRImmutable<any>(
    debouncedQueryParams ? debouncedQueryParams : null,
    mindatFetcher,
    { use: [ abortableMiddleware ], ...options }
  );

  return { data, error, isLoading, isValidating };
}

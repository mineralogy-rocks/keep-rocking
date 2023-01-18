import useSWRImmutable from 'swr/immutable';

import { mindatFetcher } from '@/helpers/fetcher.helpers';
import useDebounce from '@/hooks/use-debounce.hook';
import { abortableMiddleware } from '@/middleware/abortable-swr';

export const useMindatApi = (mindatIds) => {
  const debouncedMindatIds = useDebounce(mindatIds.join(','), 300);

  const { data, error, isLoading, isValidating } = useSWRImmutable(
    debouncedMindatIds ? `/mr-items/?id__in=${debouncedMindatIds}` : null,
    mindatFetcher,
    { use: [ abortableMiddleware ] }
  );

  return { data, error, isLoading, isValidating };
}

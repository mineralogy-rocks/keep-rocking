import { useEffect, useMemo } from "react";
import { Middleware, unstable_serialize, BareFetcher } from "swr";

type Data = any;
type Error = any;
type PublicConfiguration<Data, Error, Fetcher extends BareFetcher<Data>> = {};

export const abortableMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config: PublicConfiguration<Data, Error, BareFetcher<Data>> = {}) => {
    const keyString = unstable_serialize(key);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const abortController = useMemo(() => new AbortController(), [keyString]);
    useEffect(() => () => abortController.abort(), [abortController]);

    const fetcherExtended: typeof fetcher = (url, params) =>
    fetcher(url, { ...params, signal: abortController.signal });

    return useSWRNext(key, fetcherExtended, config);
  };
};
